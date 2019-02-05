package far.galaxy.foodcourt.entity.group;

import far.galaxy.foodcourt.entity.customer.Customer;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.List;

@Entity
public class CustomerGroup {
    private long id;
    private String title;

    private List<Customer> customers;

    public CustomerGroup() {
        this.id = 0;
    }

    public CustomerGroup(String title) {
        this();
        this.title = title;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @NonNull
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @OneToMany
    public List<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }


}
