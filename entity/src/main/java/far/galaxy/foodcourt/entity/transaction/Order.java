package far.galaxy.foodcourt.entity.transaction;

import far.galaxy.foodcourt.entity.cake.Cake;
import far.galaxy.foodcourt.entity.customer.Customer;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Order {
    private long id;
    private Date time;

    private Customer customer;
    private Cake cake;

    private int count;

    public Order() {
        this.id = 0;
        this.time = new Date();
    }

    public Order(Customer customer, Cake cake, int count) {
        this();

        this.customer = customer;
        this.cake = cake;
        this.count = count;
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

    @OneToOne
    @NonNull
    public Cake getCake() {
        return cake;
    }

    public void setCake(Cake cake) {
        this.cake = cake;
    }

    @NonNull
    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
