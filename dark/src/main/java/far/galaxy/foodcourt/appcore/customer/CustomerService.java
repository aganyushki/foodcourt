package far.galaxy.foodcourt.appcore.customer;

import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.customer.CustomerRepository;
import far.galaxy.foodcourt.entity.group.CustomerGroup;
import far.galaxy.foodcourt.entity.group.GroupRepository;
import far.galaxy.foodcourt.entity.transaction.Incoming;
import far.galaxy.foodcourt.entity.transaction.IncomingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private IncomingRepository incomingRepository;

    public Page<Customer> getList(int page, int size, String orderBy) {
        return customerRepository.findAll(PageRequest.of(page, size, Sort.by(orderBy).ascending()));
    }

    public Page<Customer> getList(int page, int size, String orderBy, String search) {
        return customerRepository.findAllByNameLike(
                PageRequest.of(page, size, Sort.by(orderBy).ascending()),
                '%'+search+'%' // todo, performance?
        );
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

        incomingRepository.save(new Incoming(customer, balance)); // todo, skip & log if tails and proceed execution

        return customerRepository.save(customer);
    }
}
