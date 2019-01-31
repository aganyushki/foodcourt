package far.galaxy.foodcourt.entity.transaction;

import far.galaxy.foodcourt.entity.customer.Customer;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Incoming {
    private long id;
    private Date time;

    private Customer customer;

    private long amount;

    public Incoming() {
        this.id = 0;
        this.time = new Date();
    }

    public Incoming(Customer customer, long amount) {
        this();

        this.customer = customer;
        this.amount = amount;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public Date getTime() {
        return time;
    }

    @OneToOne
    @NonNull
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }
}
