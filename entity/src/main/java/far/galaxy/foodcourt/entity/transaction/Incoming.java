package far.galaxy.foodcourt.entity.transaction;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import far.galaxy.foodcourt.entity.customer.Customer;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Incoming {
    private long id;
    private Date time;

    private Customer customer;

    private BigDecimal amount;

    public Incoming() {
        this.id = 0;
        this.time = new Date();
    }

    public Incoming(Customer customer, BigDecimal amount) {
        this();

        this.customer = customer;
        this.amount = amount;
    }

    public Incoming(Customer customer, int amount) {
        this(customer, BigDecimal.valueOf(amount));
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    @OneToOne
    @NonNull
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
