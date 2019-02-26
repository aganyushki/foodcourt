package far.galaxy.foodcourt.appcore.customer;

import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.customer.CustomerRepository;
import far.galaxy.foodcourt.entity.group.CustomerGroup;
import far.galaxy.foodcourt.entity.group.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getList() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(long customerId) {
        return customerRepository.getOne(customerId);
    }

    public Customer storeNewCustomer(String name, String email) {
        return customerRepository.save(new Customer(name, email));
    }

    public Customer updateCustomer(long id, String name, String email) {
        Customer customer = customerRepository.getOne(id);
        if (name != null) {
            customer.setName(name);
        }
        if (email != null) {
            customer.setEmail(email);
        }
        return customerRepository.save(customer);
    }

    public void removeCustomer(long id) {
        customerRepository.deleteById(id);
    }

    public Customer updateCustomerBalance(long id, BigDecimal balance) { // todo, migrate balance type, long is not good decision
        if (balance.compareTo(BigDecimal.ZERO) == -1) throw new IllegalArgumentException("???"); // todo, fix error description

        Customer customer = customerRepository.getOne(id);
        customer.addBalance(balance);
        return customerRepository.save(customer);
    }
}
