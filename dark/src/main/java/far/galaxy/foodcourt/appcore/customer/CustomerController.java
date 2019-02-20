package far.galaxy.foodcourt.appcore.customer;

import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.customer.CustomerRepository;
import far.galaxy.foodcourt.entity.group.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/customers")
public class CustomerController {
    Logger log = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    private CustomerService customerService;

    @GetMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public List<Customer> getCustomers() {
        return customerService.getList();
    }

    @GetMapping(
            value = "/{customerId}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Customer getOrderById(@PathVariable long customerId) {
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
