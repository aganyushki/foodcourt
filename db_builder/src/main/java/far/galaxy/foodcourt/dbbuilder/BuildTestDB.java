package far.galaxy.foodcourt.dbbuilder;

import com.github.javafaker.Faker;
import far.galaxy.foodcourt.entity.Constants;
import far.galaxy.foodcourt.entity.MainMySQLPersistenceConfig;
import far.galaxy.foodcourt.entity.cake.Cake;
import far.galaxy.foodcourt.entity.cake.CakeRepository;
import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.customer.CustomerRepository;
import far.galaxy.foodcourt.entity.group.CustomerGroup;
import far.galaxy.foodcourt.entity.group.GroupRepository;
import far.galaxy.foodcourt.entity.transaction.Incoming;
import far.galaxy.foodcourt.entity.transaction.IncomingRepository;
import far.galaxy.foodcourt.entity.transaction.OrderItem;
import far.galaxy.foodcourt.entity.transaction.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@SpringBootApplication(
        scanBasePackages = {
                "far.galaxy.foodcourt.dbbuilder"
        },
        scanBasePackageClasses = {
                MainMySQLPersistenceConfig.class
        }
)
@Transactional
public class BuildTestDB {
    private final Logger LOG = LoggerFactory.getLogger(BuildTestDB.class);

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CakeRepository cakeRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private IncomingRepository incomingRepository;

    private Faker faker = new Faker();

    @Value("${max.customer.per.group}")
    private int maxCustomerPerGroup = 30;
    @Value("${max.cakes}")
    private int cakePoolSize = 100;
    @Value("${max.cake.price}")
    private int maxCakePrice = 20;
    @Value("${max.incoming.tx.per.customer}")
    private int maxIncomingTxPerCustomer = 12;
    @Value("${max.incoming.tx.amount}")
    private int maxIncomingTxAmount = 1000;
    @Value("${max.order.tx.per.customer}")
    private int maxOrderTxPerCustomer = 1000;
    @Value("${max.order.tx.amount}")
    private int maxOrderTxAmount = 5;

    public static void main(String[] args) {
        SpringApplication.run(BuildTestDB.class, args);
    }

    @EventListener
    public void startUpEventListener(ContextRefreshedEvent e) {

        LOG.info("BuildTestDB started...");
        LOG.info("max.customer.per.group: " + maxCustomerPerGroup);
        LOG.info("max.cakes: " + cakePoolSize);
        LOG.info("max.cake.price: " + maxCakePrice);
        LOG.info("max.incoming.tx.per.customer: " + maxIncomingTxPerCustomer);
        LOG.info("max.incoming.tx.amount: " + maxIncomingTxAmount);
        LOG.info("max.order.tx.per.customer: " + maxOrderTxPerCustomer);
        LOG.info("max.order.tx.amount: " + maxOrderTxAmount);

        buildCustomerPool(maxCustomerPerGroup);
        buildCakePool(cakePoolSize, maxCakePrice);
        buildIncomingTXPool(maxIncomingTxPerCustomer, maxIncomingTxAmount);
        buildOrderPool(maxOrderTxPerCustomer, maxOrderTxAmount);
    }

    private void buildCustomerPool(final int MAX_CUSTOMER_PER_GROUP) {
        LOG.info("BuildTestDB.buildCustomerPool");
        Constants.GROUPS.stream()
                .map(CustomerGroup::new)
                .peek(group -> {
                    if (!group.getTitle().equalsIgnoreCase("F")) {
                        group.setCustomers(buildCustomersForGroup(group, MAX_CUSTOMER_PER_GROUP));
                    }
                })
                .forEach(groupRepository::save);
    }

    private List<Customer> buildCustomersForGroup(CustomerGroup group, final int MAX_CUSTOMERS) {
        return customerRepository.saveAll(
                IntStream.range(0, faker.number().numberBetween(0, MAX_CUSTOMERS))
                        .mapToObj(index -> new Customer(
                                group.getTitle() + "_" + faker.name().fullName() + "_" + index,
                                group.getTitle() + "_" + faker.internet().emailAddress() + "_" + index
                        ))
                        .collect(Collectors.toList())
        );
    }

    private void buildCakePool(final int MAX_CAKES, final int MAX_CAKE_PRICE) {
        LOG.info("BuildTestDB.buildCakePool");
        cakeRepository.saveAll(
                IntStream.range(0, MAX_CAKES)
                        .mapToObj(index -> new Cake(
                                faker.food().ingredient() + "_" + index,
                                faker.number().numberBetween(1, MAX_CAKE_PRICE))
                        )
                        .collect(Collectors.toList())
        );
    }

    private void buildIncomingTXPool(final int MAX_TX_PER_CUSTOMER, final int MAX_AMOUNT) {
        LOG.info("BuildTestDB.buildIncomingTXPool");
        customerRepository.findAll().stream()
                .peek(customer -> {
                    incomingRepository.saveAll(
                            buildIncomingTxPoolForCustomer(customer, MAX_TX_PER_CUSTOMER, MAX_AMOUNT)
                    )
                            .stream()
                            .forEach(incoming -> customer.addBalance(incoming.getAmount()));
                })
                .forEach(customerRepository::save);
    }

    private List<Incoming> buildIncomingTxPoolForCustomer(Customer customer,
                                                          final int MAX_TX_PER_CUSTOMER, final int MAX_AMOUNT)
    {
        return IntStream.range(0, faker.number().numberBetween(0, MAX_TX_PER_CUSTOMER))
                .mapToObj(it -> new Incoming(
                        customer,
                        faker.number().numberBetween(MAX_AMOUNT / 5, MAX_AMOUNT)
                ))
                .collect(Collectors.toList());
    }

    private void buildOrderPool(final int MAX_TX_PER_CUSTOMER, final int MAX_AMOUNT) {
        LOG.info("BuildTestDB.buildOrderPool");
        List<Cake> allCakes = cakeRepository.findAll();
        customerRepository.findAll().stream()
                .peek(customer -> {
                    orderRepository.saveAll(
                            buildOrderPoolForCustomer(customer, allCakes, MAX_TX_PER_CUSTOMER, MAX_AMOUNT)
                    )
                            .stream()
                            .forEach(order -> {
                                customer.addBalance(
                                        order.getCake().getPrice()
                                                .multiply(BigDecimal.valueOf(order.getCount()))
                                                .multiply(BigDecimal.valueOf(-1))
                                );
                            });
                })
                .forEach(customerRepository::save);
    }

    private List<OrderItem> buildOrderPoolForCustomer(Customer customer, List<Cake> allCakes,
                                                      final int MAX_TX_PER_CUSTOMER, final int MAX_AMOUNT)
    {
        int size = allCakes.size();
        return IntStream.range(0, faker.number().numberBetween(0, MAX_TX_PER_CUSTOMER))
                .mapToObj(it -> new OrderItem(
                        customer,
                        allCakes.get((int) faker.number().numberBetween(1, size)),
                        faker.number().numberBetween(MAX_AMOUNT / 5, MAX_AMOUNT)
                ))
                .collect(Collectors.toList());
    }
}
