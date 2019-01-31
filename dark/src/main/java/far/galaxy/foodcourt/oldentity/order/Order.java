package far.galaxy.foodcourt.oldentity.order;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "sales1")
public class Order {
    private Long id;
    private String userName;
    private String bulkName;
    private Long count;
    private Long price;
    private Long transactionSum;
    private Date time;

    public Order() {
    }

    public Order(String userName, String bulkName, Long count, Long price, Long transactionSum, Date time) {
        this.userName = userName;
        this.bulkName = bulkName;
        this.count = count;
        this.price = price;
        this.transactionSum = transactionSum;
        this.time = time;
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
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Column(name = "bulk_name")
    public String getBulkName() {
        return bulkName;
    }

    public void setBulkName(String bulkName) {
        this.bulkName = bulkName;
    }

    @Column(name = "count")
    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    @Column(name = "price")
    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    @Column(name = "transaction_sum")
    public Long getTransactionSum() {
        return transactionSum;
    }

    public void setTransactionSum(Long transactionSum) {
        this.transactionSum = transactionSum;
    }

    @Column(name = "time")
    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
