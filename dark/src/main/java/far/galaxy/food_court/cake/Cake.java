package far.galaxy.food_court.cake;

import javax.persistence.*;

@Entity
@Table(name = "bulk")
public class Cake {
    private Long id;
    private String name;
    private Long price;

    public Cake() {
        this.id = -1L;
        this.name = "";
        this.price = 0L;
    }

    public Cake(String name, Long price) {
        this.name = name;
        this.price = price;
    }

    public Cake(Long id, String name, Long price) {
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
}
