package far.galaxy.foodcourt.appcore.customer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import far.galaxy.foodcourt.appcore.FakePage;
import far.galaxy.foodcourt.entity.customer.Customer;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.util.NestedServletException;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static far.galaxy.foodcourt.appcore.TestConstants.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = CustomerController.class, secure = false)
public class CustomerControllerTest {
    private Logger LOG = LoggerFactory.getLogger(CustomerControllerTest.class);

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerService customerService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void checkGetCustomers() throws Exception {
        FakePage fakePage = new FakePage();

        Mockito.when(
                customerService.getList(
                    PAGINATION_DEFAULT_PAGE,
                    PAGINATION_DEFAULT_LIMIT,
                    PAGINATION_DEFAULT_CUSTOMER_ORDER
                )
        ).thenReturn(fakePage);

        mockMvc.perform(
                get("/api/customers")
                        .accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(fakePage)
                ));
    }

    @Test
    public void checkGetCustomersWithPagination() throws Exception {
        FakePage fakePage = new FakePage();

        Mockito.when(customerService.getList(3,50, "balance")).thenReturn(fakePage);

        mockMvc.perform(
                get("/api/customers?page=3&limit=50&orderBy=balance")
                        .accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(fakePage)
                ));
    }

    @Test
    public void checkGetCustomersWithIncorrectPagination() throws Exception {
        Assertions.assertThrows(
                NestedServletException.class,
                () -> mockMvc.perform(
                        get("/api/customers?page=3&limit=50&orderBy=test")
                                .accept(MediaType.APPLICATION_JSON_VALUE)
                )
        );
    }

    @Test
    public void checkGetCustomerById() throws Exception {
        long id = 123;
        Customer customer = new Customer("name 1", "email1");

        Mockito.when(customerService.getCustomerById(id)).thenReturn(customer);

        mockMvc.perform(
                get("/api/customers/" + id)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(customer)
                ));
    }

    @Test
    public void checkNewCustomer() throws Exception {
        String name = "name 1";
        String email = "email1";
        Customer customer = new Customer(name, email);
        String customerJson = objectMapper.writeValueAsString(customer);

        Mockito.when(customerService.storeNewCustomer(name, email)).thenReturn(customer);

        mockMvc.perform(
                put("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .content(customerJson)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(customerJson));
    }

    @Test
    public void checkUpdateCustomer() throws Exception {
        long id = 3;
        String name = "name 1";
        String email = "email1";
        Customer customer = new Customer(name, email);
        String customerJson = objectMapper.writeValueAsString(customer);

        Mockito.when(customerService.updateCustomer(id, name, email)).thenReturn(customer);

        mockMvc.perform(
                post("/api/customers/" + id)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .content(customerJson)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(customerJson));
    }

    @Test
    public void checkRemoveCustomer() throws Exception {
        long id = 717; // todo, refactoring, generate test data with faker library

        mockMvc.perform(
                delete("/api/customers/" + id)
                    .accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk());

        Mockito.verify(customerService).removeCustomer(id);
    }

    @Test
    public void checkUpdateCustomerBalance() throws Exception {
        long id = 234;
        Customer customer = new Customer();
        BigDecimal balance = BigDecimal.valueOf(787);
        customer.setBalance(balance);
        String customerJson = objectMapper.writeValueAsString(customer);

        Mockito.when(customerService.updateCustomerBalance(id, balance)).thenReturn(customer);

        mockMvc.perform(
                post("/api/customers/" + id + "/balance")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .content(customerJson)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(customerJson));
    }
}
