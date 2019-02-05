package far.galaxy.foodcourt.oldentity.cake;

import javax.persistence.*;

@Entity
@Table(name = "bulk")
public class OldCake {
    private Long id;
    private String name;
    private Long price;

    public OldCake() {
        this.id = -1L;
        this.name = "";
        this.price = 0L;
    }

    public OldCake(String name, Long price) {
        this();
        this.name = name;
        this.price = price;
    }

    public OldCake(Long id, String name, Long price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Bulk_id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "Bulk_Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "Bulk_Price")
    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return this.getId().equals(((OldCake) obj).getId());
    }
}
