package far.galaxy.foodcourt.dbbuilder.migration;

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
import far.galaxy.foodcourt.oldentity.cake.OldCakeRepository;
import far.galaxy.foodcourt.oldentity.customer.OldCustomerRepository;
import far.galaxy.foodcourt.oldentity.order.OldOrder;
import far.galaxy.foodcourt.oldentity.order.OldOrderRepository;
import far.galaxy.foodcourt.oldentity.system.OldBalanceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

//@Component
//@Transactional
public class MigrateDB {
    Logger log = LoggerFactory.getLogger(MigrateDB.class);

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

    @EventListener
    public void startUpEventListener(ContextRefreshedEvent e) {
        buildCustomerPool();
        buildCakePool();
        buildIncomingTXPool();
        buildOrderPool();
    }

    private void test() {
        oldCakeRepository.findAll()
                .forEach(oldCake -> {
                    log.info("CAKE: " + oldCake.getName());
                });
    }

    private void buildCustomerPool() {

        List<String> groups = Arrays.asList("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z");

        groups.stream()
                .map(it -> new CustomerGroup(it))
                .forEach(groupRepository::save);

        oldCustomerRepository.findAll()
                .forEach(it -> {
                    log.info(it.getName() + "; " + it.getEmail());
                    customerRepository.save(new Customer(it.getName(), it.getEmail()));
                });

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

    private void buildCakePool() {

        oldCakeRepository.findAll()
                .forEach(oldCake -> {

                    String cakeName = oldCake.getName();
                    BigDecimal price = BigDecimal.valueOf(oldCake.getPrice());

                    oldOrderRepository.findAllByBulkName(cakeName)
                            .stream()
                            .mapToLong(oldOrder -> oldOrder.getPrice())
                            .filter(prevPrice -> price.compareTo(BigDecimal.valueOf(prevPrice)) != 0)
                            .distinct()
                            .sorted()
                            .mapToObj(prevPrice -> {
                                Cake prevCake = new Cake(cakeName, prevPrice);
                                prevCake.setVersion(cakeRepository.findAllByName(cakeName).size() + 1);
                                return prevCake;
                            })
                            .forEach(cakeRepository::save);

                    Cake cake = new Cake(cakeName, price);
                    cake.setVersion(cakeRepository.findAllByName(cakeName).size() + 1);

                    cakeRepository.save(cake);
                });
    }

    private void buildIncomingTXPool() {
        customerRepository.findAll().stream()
                .map(customer -> {

                    oldBalanceRepository.findAllByUserName(customer.getName())
                            .forEach(oldBalance -> {
                                int amount = oldBalance.getIncomingTransaction().intValue();

                                customer.addBalance(BigDecimal.valueOf(amount));
                                Incoming incoming = new Incoming(customer, amount);
                                incoming.setTime(oldBalance.getTime());

                                log.info(customer.getName() + " / " + incoming.getAmount());

                                incomingRepository.save(incoming);
                            });

                    return customer;
                })
                .forEach(customerRepository::save);
    }

    private void buildOrderPool() {
        customerRepository.findAll().stream()
                .map(customer -> {

                    oldOrderRepository.findAllByUserName(customer.getName())
                            .forEach(oldOrder -> {

                                Cake cake = cakeRepository.findByNameAndPrice(oldOrder.getBulkName(), oldOrder.getPrice());

                                customer.addBalance(
                                        cake.getPrice()
                                            .multiply(BigDecimal.valueOf(oldOrder.getCount()))
                                            .multiply(BigDecimal.valueOf(-1))
                                );

                                OrderItem order = new OrderItem(
                                        customer,
                                        cake,
                                        oldOrder.getCount().intValue()
                                );
                                order.setTime(oldOrder.getTime());

                                orderRepository.save(order);
                            });

                    return customer;
                })
                .forEach(customerRepository::save);
    }
}
