package far.galaxy.foodcourt.appcore.customer;

import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.customer.CustomerRepository;
import far.galaxy.foodcourt.entity.group.GroupRepository;
import net.bytebuddy.implementation.bind.annotation.Default;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/customers")
public class CustomerController {
    private Logger LOG = LoggerFactory.getLogger(CustomerController.class);
    private List<String> ORDER_BY = Arrays.asList("name", "balance");

    @Autowired
    private CustomerService customerService;

    @GetMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public Page<Customer> getCustomers(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "100") int limit,
            @RequestParam(value = "orderBy", defaultValue = "name") String orderBy,
            @RequestParam(value = "search", required = false) String search
    ) {
        if (orderBy != null && !ORDER_BY.contains(orderBy)) {
            throw new IllegalArgumentException("Incorrect orderBy field value: " + orderBy);
        }
        return search == null
            ? customerService.getList(page, limit, orderBy)
            : customerService.getList(page, limit, orderBy, search);
    }

    @GetMapping(
            value = "/{customerId}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Customer getCustomerById(@PathVariable long customerId) {
        return customerService.getCustomerById(customerId);
    }

    @PutMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @ResponseBody
    public Customer newCustomer(@RequestBody Customer data) {
        return customerService.storeNewCustomer(data.getName(), data.getEmail());
    }

    @PostMapping(
            value = "/{customerId}",
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @ResponseBody
    public Customer updateCustomer(
            @PathVariable long customerId,
            @RequestBody Customer data
    ) {
        return customerService.updateCustomer(customerId, data.getName(), data.getEmail());
    }

    @DeleteMapping(
            value = "/{customerId}"
    )
    public void removeCustomer(@PathVariable long customerId) {
        customerService.removeCustomer(customerId);
    }

    @PostMapping(
            value = "/{customerId}/balance",
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @ResponseBody
    public Customer updateCustomerBalance(
            @PathVariable long customerId,
            @RequestBody Customer data
    ) {
        return customerService.updateCustomerBalance(customerId, data.getBalance());
    }
}
