package far.galaxy.foodcourt.appcore.order;

import far.galaxy.foodcourt.entity.cake.Cake;
import far.galaxy.foodcourt.entity.cake.CakeRepository;
import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.customer.CustomerRepository;
import far.galaxy.foodcourt.entity.transaction.OrderItem;
import far.galaxy.foodcourt.entity.transaction.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CakeRepository cakeRepository;

    public Page<OrderItem> getOrderList(int page, int limit) {
        return orderRepository.findAll(PageRequest.of(page, limit, Sort.by("id").descending()));
    }

    public OrderItem getOrderById(long orderId) {
        return orderRepository.getOne(orderId);
    }

    @Transactional
    public OrderItem putNewOrder(long customerId, long cakeId, int count) { // todo, how to and where check count arg
        Customer customer = customerRepository.findById(customerId).orElseThrow(() ->
                new IllegalArgumentException("Undefined customer id")
        );
        Cake cake = cakeRepository.findById(cakeId).orElseThrow(() ->
                new IllegalArgumentException("Undefined cake id")
        );

        customer.minusBalance(
                cake.getPrice().multiply(BigDecimal.valueOf(count))
        ); // todo, concurrency?

        return orderRepository.save(new OrderItem(
                customerRepository.save(customer),
                cake,
                count
        ));
    }
}
