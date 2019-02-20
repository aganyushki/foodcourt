package far.galaxy.foodcourt.entity.system;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
public class UserRole implements GrantedAuthority {

    private Long id;
    private String name;

    public UserRole() {
    }

    public UserRole(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    @Transient
    public String getAuthority() {
        return name;
    }
}
