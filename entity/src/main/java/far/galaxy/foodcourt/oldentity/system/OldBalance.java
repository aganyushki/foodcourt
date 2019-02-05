package far.galaxy.foodcourt.oldentity.system;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "balans")
public class OldBalance {
    private Long id;
    private String userName;
    private Long incoming_transaction;
    private Date time;

    public OldBalance() {
        this.id = 0L;
    }

    public OldBalance(String userName, Long incoming_transaction) {
        this();
        this.userName = userName;
        this.incoming_transaction = incoming_transaction;
        this.time = new Date();
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

    @Column(name = "time")
    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    @Column(name = "incoming_transaction")
    public Long getIncomingTransaction() {
        return incoming_transaction;
    }

    public void setIncomingTransaction(Long incoming_transaction) {
        this.incoming_transaction = incoming_transaction;
    }

    @Override
    public int hashCode() {
        return this.getId().hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return this.getId().equals(((OldBalance) obj).getId());
    }
}
