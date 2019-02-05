package far.galaxy.foodcourt.oldentity.customer;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class OldCustomer {
    private Long id;
    private String name;
    private String email;

    public OldCustomer() {
        this.id = 0L;
        this.name = "";
        this.email = "";
    }

    public OldCustomer(String name, String email) {
        this();
        this.name = name;
        this.email = email;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "user_name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return this.id.equals(((OldCustomer) obj).getId());
    }
}
