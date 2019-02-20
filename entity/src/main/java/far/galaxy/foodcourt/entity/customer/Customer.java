package far.galaxy.foodcourt.entity.customer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Customer {
    private long id;
    private String name;
    private String email;
    private long balance;

    public Customer() {
        this.id = 0;
        this.balance = 0;
    }

    public Customer(String name, String email) {
        this();
        this.name = name;
        this.email = email;
    }

    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @NonNull
    @Column(unique = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NonNull
    @Column(unique = true)
    @JsonIgnore
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getBalance() {
        return balance;
    }

    public void setBalance(long balance) {
        this.balance = balance;
    }

    public void addBalance(long amount) {
        this.balance += amount;
    }

    public void minusBalance(long amount) {
        this.balance -= amount;
    }
}
