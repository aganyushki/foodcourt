package far.galaxy.foodcourt.dbbuilder.dbbuilder;

import com.github.javafaker.Faker;
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
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Arrays;
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
    Logger log = LoggerFactory.getLogger(BuildTestDB.class);

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

    private Faker faker = new Faker();

    private int customerPoolSize = 10;
    private int cakePoolSize = 10;
    private int maxCakePrice = 20;
    private int maxIncomingTxPerCustomer = 3;
    private int maxIncomingTxAmount = 500;
    private int maxOrderTxPerCustomer = 50;
    private int maxOrderTxAmount = 5;

    @EventListener
    public void startUpEventListener(ContextRefreshedEvent e) {
        buildCustomerPool(customerPoolSize);
        buildCakePool(cakePoolSize, maxCakePrice);
        buildIncomingTXPool(maxIncomingTxPerCustomer, maxIncomingTxAmount);
        buildOrderPool(maxOrderTxPerCustomer, maxOrderTxAmount);
    }

    private void buildCustomerPool(int N) {

        List<String> groups = Arrays.asList("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z");

        groups.stream()
                .map(it -> new CustomerGroup(it))
                .forEach(groupRepository::save);

        IntStream.range(0, N)
                .mapToObj(it -> new Customer(faker.name().fullName(), faker.internet().emailAddress()))
                .forEach(customerRepository::save);

        groupRepository.findAll().stream()
                .map(group -> {

                    group.setCustomers(
                        customerRepository.findAll().stream()
                                .filter(customer ->
                                        customer.getName().toLowerCase().startsWith(group.getTitle().toLowerCase())
                                )
                                .collect(Collectors.toList())
                    );

                    return group;
                })
                .forEach(groupRepository::save);
    }

    private void buildCakePool(int N, int maxCakePrice) {
        IntStream.range(0, N)
                .mapToObj(it -> new Cake(faker.food().ingredient(), faker.number().numberBetween(1, maxCakePrice)))
                .forEach(cakeRepository::save);
    }

    private void buildIncomingTXPool(int maxTxPerCustomer, int maxAmount) {
        customerRepository.findAll().stream()
                .map(customer -> {
                    int txCount = faker.number().numberBetween(0, maxTxPerCustomer);

                    IntStream.range(0, txCount)
                            .mapToObj(it -> {
                                int amount = faker.number().numberBetween(maxAmount / 5, maxAmount);
                                customer.addBalance(BigDecimal.valueOf(amount));
                                return new Incoming(customer, amount);
                            })
                            .forEach(incomingRepository::save);

                    return customer;
                })
                .forEach(customerRepository::save);
    }

    private void buildOrderPool(int maxTxPerCustomer, int maxAmount) {
        customerRepository.findAll().stream()
                .map(customer -> {
                    int txCount = faker.number().numberBetween(0, maxTxPerCustomer);

                    IntStream.range(0, txCount)
                            .mapToObj(it -> {
                                int amount = faker.number().numberBetween(maxAmount / 5, maxAmount);
                                Cake cake = cakeRepository.getOne(
                                        (long) faker.number().numberBetween(1, cakeRepository.findAll().size())
                                );
                                customer.addBalance(
                                        cake.getPrice()
                                                .multiply(BigDecimal.valueOf(amount))
                                                .multiply(BigDecimal.valueOf(-1))
                                );
                                return new OrderItem(
                                        customer,
                                        cake,
                                        amount
                                );
                            })
                            .forEach(orderRepository::save);

                    return customer;
                })
                .forEach(customerRepository::save);
    }

    public static void main(String[] args) {
        SpringApplication.run(BuildTestDB.class, args);
    }
}
