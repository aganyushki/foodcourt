package far.galaxy.foodcourt.appcore.order;

import far.galaxy.foodcourt.entity.cake.Cake;
import far.galaxy.foodcourt.entity.cake.CakeRepository;
import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.customer.CustomerRepository;
import far.galaxy.foodcourt.entity.transaction.OrderItem;
import far.galaxy.foodcourt.entity.transaction.OrderRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static java.util.Optional.ofNullable;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private CustomerRepository customerRepository;
    @Mock
    private CakeRepository cakeRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    public void initializationTest() {
        Assertions.assertNotNull(orderService);
    }

    @Test
    public void checkGetOrderList() {
        orderService.getOrderList();
        Mockito.verify(orderRepository).findAll();
    }

    @Test
    public void checkOrderById() {
        long id = 70;
        orderService.getOrderById(id);
        Mockito.verify(orderRepository).getOne(id);
    }

    @Test
    public void checkPutNewOrder() {
        long customerId = 7;
        long cakeId = 77;
        BigDecimal cakePrice = BigDecimal.valueOf(14);
        int count = 777;

        Customer mockCustomer = Mockito.mock(Customer.class);
        Customer mockSavedCustomer = Mockito.mock(Customer.class);
        Cake mockCake = Mockito.mock(Cake.class);

        Mockito.when(mockCake.getPrice()).thenReturn(cakePrice);
        Mockito.when(customerRepository.findById(customerId)).thenReturn(ofNullable(mockCustomer));
        Mockito.when(customerRepository.save(Mockito.any())).thenReturn(mockSavedCustomer);
        Mockito.when(cakeRepository.findById(cakeId)).thenReturn(ofNullable(mockCake));

        orderService.putNewOrder(customerId, cakeId, count);

        Mockito.verify(mockCustomer).minusBalance(cakePrice.multiply(BigDecimal.valueOf(count)));

        ArgumentCaptor<OrderItem> argument = ArgumentCaptor.forClass(OrderItem.class);
        Mockito.verify(orderRepository).save(argument.capture());

        OrderItem newOrder = argument.getValue();
        Assertions.assertEquals(mockSavedCustomer, newOrder.getCustomer());
        Assertions.assertEquals(mockCake, newOrder.getCake());
        Assertions.assertEquals(count, newOrder.getCount());
    }

    @Test
    public void checkPutNewOrderWithIncorrectCustomer() {
        long customerId = 7;
        long cakeId = 77;
        int count = 777;

        Customer mockCustomer = Mockito.mock(Customer.class);

        Mockito.when(customerRepository.findById(customerId)).thenReturn(ofNullable(null));

        Assertions.assertThrows(
                IllegalArgumentException.class,
                () -> orderService.putNewOrder(customerId, cakeId, count)
        );
    }

    @Test
    public void checkPutNewOrderWithIncorrectCake() {
        long customerId = 7;
        long cakeId = 77;
        int count = 777;

        Customer mockCustomer = Mockito.mock(Customer.class);

        Mockito.when(customerRepository.findById(customerId)).thenReturn(ofNullable(mockCustomer));
        Mockito.when(cakeRepository.findById(cakeId)).thenReturn(ofNullable(null));

        Assertions.assertThrows(
                IllegalArgumentException.class,
                () -> orderService.putNewOrder(customerId, cakeId, count)
        );
    }
}
