package far.galaxy.foodcourt.entity.customer;

import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
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
}
