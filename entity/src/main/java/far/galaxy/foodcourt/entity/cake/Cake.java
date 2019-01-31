package far.galaxy.foodcourt.entity.cake;

import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
public class Cake {
    private long id;
    private String name;
    private long price;

    public Cake() {
        this.id = 0L;
        this.price = 0L;
    }

    public Cake(String name, Long price) {
        this();
        this.name = name;
        this.price = price;
    }

    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }
}
