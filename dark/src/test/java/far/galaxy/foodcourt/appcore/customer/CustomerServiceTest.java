package far.galaxy.foodcourt.appcore.customer;

import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.customer.CustomerRepository;
import far.galaxy.foodcourt.entity.transaction.Incoming;
import far.galaxy.foodcourt.entity.transaction.IncomingRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;

@ExtendWith(MockitoExtension.class)
public class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private IncomingRepository incomingRepository;

    @InjectMocks
    private CustomerService customerService;

    @Test
    public void initializationTest() {
        Assertions.assertNotNull(customerService);
    }

    @Test
    public void checkGetCustomerById() {
        long id = 123;

        customerService.getCustomerById(id);

        Mockito.verify(customerRepository).getOne(id);
    }

    @Test
    public void checkNewCustomerStoreMethod() {
        String name = "name";
        String email = "email";
        final long DEFAULT_ID = 0;

        customerService.storeNewCustomer(name, email);

        ArgumentCaptor<Customer> argument = ArgumentCaptor.forClass(Customer.class);
        Mockito.verify(customerRepository).save(argument.capture());

        Customer value = argument.getValue();

        Assertions.assertEquals(DEFAULT_ID, value.getId());
        Assertions.assertEquals(name, value.getName());
        Assertions.assertEquals(email, value.getEmail());
    }

    @Test
    public void checkCustomerUpdateMethod() {
        long id = 2;
        String name = "name";
        String email = "email";

        Customer customerMock = Mockito.mock(Customer.class);
        Mockito.when(customerRepository.getOne(id)).thenReturn(customerMock);

        customerService.updateCustomer(id, name, email);

        Mockito.verify(customerRepository).save(customerMock);
        Mockito.verify(customerMock).setName(name);
        Mockito.verify(customerMock).setEmail(email);
    }

    @Test
    public void checkCustomerUpdateMethodWithUndefinedCustomer() {
        long id = 2;
        String name = "name";
        String email = "email";

        Mockito.when(customerRepository.getOne(id)).thenReturn(null);

        Assertions.assertThrows(
                NullPointerException.class,
                () -> customerService.updateCustomer(id, name, email)
        );
    }

    @Test
    public void checkCustomerUpdateMethodWithNullName() {
        long id = 3;
        String name = null;
        String email = "email";

        Customer customerMock = Mockito.mock(Customer.class);
        Mockito.when(customerRepository.getOne(id)).thenReturn(customerMock);

        customerService.updateCustomer(id, name, email);

        Mockito.verify(customerRepository).save(customerMock);
        Mockito.verify(customerMock, never()).setName(Mockito.any());
        Mockito.verify(customerMock).setEmail(email);
    }

    @Test
    public void checkCustomerUpdateMethodWithNullEmail() {
        long id = 4;
        String name = "name";
        String email = null;

        Customer customerMock = Mockito.mock(Customer.class);
        Mockito.when(customerRepository.getOne(id)).thenReturn(customerMock);

        customerService.updateCustomer(id, name, email);

        Mockito.verify(customerRepository).save(customerMock);
        Mockito.verify(customerMock).setName(name);
        Mockito.verify(customerMock, never()).setEmail(Mockito.any());
    }

    @Test
    public void checkCustomerRemoveMethod() {
        long id = 9;
        customerService.removeCustomer(id);
        Mockito.verify(customerRepository).deleteById(id);
    }

    @Test
    public void checkUpdateCustomerBalance() {
        long id = 9;
        BigDecimal amount = BigDecimal.valueOf(77);
        Customer mockCustomer = Mockito.mock(Customer.class);
        Mockito.when(customerRepository.getOne(id)).thenReturn(mockCustomer);
        customerService.updateCustomerBalance(id, amount);
        Mockito.verify(mockCustomer).addBalance(amount);
        Mockito.verify(incomingRepository).save(Mockito.isA(Incoming.class));
    }

    @Test
    public void checkUpdateCustomerBalanceWithIncorrectValue() {
        long id = 1;
        Assertions.assertThrows(
                IllegalArgumentException.class,
                () -> customerService.updateCustomerBalance(id, BigDecimal.valueOf(-5))
        );
    }

    @Test
    public void checkUpdateCustomerBalanceWithNullPointerException() {
        Assertions.assertThrows(
                NullPointerException.class,
                () -> customerService.updateCustomerBalance(1, BigDecimal.valueOf(0))
        );
    }

    @Test
    public void checkUpdateCustomerBalanceWithZeroValue() {
        long id = 9;
        BigDecimal amount = BigDecimal.valueOf(0);

        Customer mockCustomer = Mockito.mock(Customer.class);
        Mockito.when(customerRepository.getOne(id)).thenReturn(mockCustomer);
        customerService.updateCustomerBalance(id, amount);
        Mockito.verify(mockCustomer).addBalance(amount);
    }
}
