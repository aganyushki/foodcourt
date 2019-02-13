package far.galaxy.foodcourt.entity.cake;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"name", "version"})
})
public class Cake {
    private long id;
    private String name;
    private long price;
    private int version;
    private boolean available;

    public Cake() {
        this.id = 0L;
        this.price = 0L;
        this.version = 1;
        this.available = true;
    }

    public Cake(String name, long price) {
        this();
        this.name = name;
        this.price = price;
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

    @NonNull
    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    @NonNull
    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}
