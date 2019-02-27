package far.galaxy.foodcourt.migration;

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
import far.galaxy.foodcourt.oldentity.OldMySQLPersistenceConfig;
import far.galaxy.foodcourt.oldentity.cake.OldCake;
import far.galaxy.foodcourt.oldentity.cake.OldCakeRepository;
import far.galaxy.foodcourt.oldentity.customer.OldCustomer;
import far.galaxy.foodcourt.oldentity.customer.OldCustomerRepository;
import far.galaxy.foodcourt.oldentity.order.OldOrderRepository;
import far.galaxy.foodcourt.oldentity.system.OldBalanceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication(
        scanBasePackages = {
                "far.galaxy.foodcourt.migration"
        },
        scanBasePackageClasses = {
                MainMySQLPersistenceConfig.class,
                OldMySQLPersistenceConfig.class
        }
)
@Transactional
public class MigrateDBFromFirstImplementation {
    private Logger LOG = LoggerFactory.getLogger(MigrateDBFromFirstImplementation.class);

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CakeRepository cakeRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    IncomingRepository incomingRepository;

    @Autowired
    OldCustomerRepository oldCustomerRepository;

    @Autowired
    OldBalanceRepository oldBalanceRepository;

    @Autowired
    OldCakeRepository oldCakeRepository;

    @Autowired
    OldOrderRepository oldOrderRepository;

    public static void main(String[] args) {
        SpringApplication.run(MigrateDBFromFirstImplementation.class, args);
    }

    @EventListener
    public void startUpEventListener(ContextRefreshedEvent e) {
        LOG.info("BuildTestDB started...");

        buildCustomerPool();
        buildCakePool();
        buildIncomingTXPool();
        buildOrderPool();
    }

    private void buildCustomerPool() {
        LOG.info("MigrateDBFromFirstImplementation.buildCustomerPool");
        List<OldCustomer> oldCustomerList = (List<OldCustomer>) oldCustomerRepository.findAll();
        Constants.GROUPS.stream()
                .map(CustomerGroup::new)
                .peek(group -> {
                    group.setCustomers(pullCustomersForGroup(group, oldCustomerList));
                })
                .forEach(groupRepository::save);
    }

    private List<Customer> pullCustomersForGroup(CustomerGroup group, List<OldCustomer> oldCustomerList) {
        String groupTitle = group.getTitle().equals(Constants.STAFF_GROUP) ? "-" : group.getTitle();
        return customerRepository.saveAll(
                oldCustomerList.stream()
                        .filter(customer -> StringUtils.startsWithIgnoreCase(customer.getName(), groupTitle))
                        .map(oldCustomer -> new Customer(
                                oldCustomer.getName(),
                                oldCustomer.getEmail(),
                                calculateCustomerBalance(oldCustomer)
                        ))
                        .collect(Collectors.toList())
        );
    }

    private BigDecimal calculateCustomerBalance(OldCustomer oldCustomer) {
        long incomingSum = oldBalanceRepository.findAllByUserName(oldCustomer.getName())
                .stream()
                .mapToLong(incoming -> incoming.getIncomingTransaction())
                .sum();
        long orderSum = oldOrderRepository.findAllByUserName(oldCustomer.getName())
                .stream()
                .mapToLong(order -> order.getTransactionSum())
                .sum();
        return BigDecimal.valueOf(incomingSum - orderSum);
    }

    private void buildCakePool() {
        LOG.info("MigrateDBFromFirstImplementation.buildCakePool");
        List<OldCake> oldCakeList = (List<OldCake>) oldCakeRepository.findAll();
        cakeRepository.saveAll(
                oldCakeList.stream()
                        .map(oldCake -> new Cake(
                                oldCake.getName(),
                                oldCake.getPrice()
                        ))
                        .flatMap(this::buildCakeVersions)
                        .collect(Collectors.toList())
        );
    }

    private Stream<Cake> buildCakeVersions(Cake cake) {
        AtomicInteger index = new AtomicInteger();
        return oldOrderRepository.findAllByBulkNameGroupByPrice(cake.getName()).stream()
                .map(oldOrder -> new Cake(
                        cake.getName(),
                        oldOrder.getPrice()
                ))
                .peek(newCake -> {
                    newCake.setVersion(index.getAndIncrement());
                });
    }

    private void buildOrderPool() {
        LOG.info("MigrateDBFromFirstImplementation.buildOrderPool");
        List<Customer> customerList = customerRepository.findAll();
        List<Cake> cakeList = cakeRepository.findAll();
        orderRepository.saveAll(
                cakeList.stream()
                        .flatMap(cake -> buildOrdersForCake(cake, customerList))
                        .collect(Collectors.toList())
        );
    }

    private Stream<OrderItem> buildOrdersForCake(Cake cake, List<Customer> customerList) {
        return oldOrderRepository.findAllByBulkNameAndPrice(cake.getName(), cake.getPrice().longValue()).stream()
                .map(oldOrder -> {
                    OrderItem orderItem = new OrderItem(
                            customerList.stream().filter(customer ->
                                    customer.getName().equals(oldOrder.getUserName())
                            ).findFirst().get(),
                            cake,
                            oldOrder.getCount().intValue()
                    );
                    orderItem.setTime(oldOrder.getTime());
                    return orderItem;
                });
    }

    private void buildIncomingTXPool() {
        LOG.info("MigrateDBFromFirstImplementation.buildIncomingTXPool");
        incomingRepository.saveAll(
                customerRepository.findAll().stream()
                        .flatMap(customer -> oldBalanceRepository.findAllByUserName(customer.getName()).stream()
                                .map(oldBalance -> {
                                    Incoming incoming = new Incoming(customer, oldBalance.getIncomingTransaction().intValue());
                                    incoming.setTime(oldBalance.getTime());
                                    return incoming;
                                })
                        )
                        .collect(Collectors.toList())
        );
    }
}
