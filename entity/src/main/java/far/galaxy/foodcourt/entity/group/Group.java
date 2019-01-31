package far.galaxy.foodcourt.entity.group;

import far.galaxy.foodcourt.entity.customer.Customer;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.List;

@Entity
public class Group {
    private long id;
    private String key;
    private String title;

    private List<Customer> customers;

    public Group() {
        this.id = 0;
    }

    public Group(String key, String title) {
        this();
        this.key = key;
        this.title = title;
    }

    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    @NonNull
    @Column(unique = true)
    public String getKey() {
        return key;
    }

    @NonNull
    public String getTitle() {
        return title;
    }

    @OneToMany
    public List<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }
}
