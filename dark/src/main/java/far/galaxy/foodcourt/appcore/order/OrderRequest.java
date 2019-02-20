package far.galaxy.foodcourt.appcore.order;

public class OrderRequest {
    private long customer;
    private long cake;
    private int count;

    public OrderRequest() {
    }

    public OrderRequest(long customer, long cake, int count) {
        this.customer = customer;
        this.cake = cake;
        this.count = count;
    }

    public long getCustomer() {
        return customer;
    }

    public void setCustomer(long customer) {
        this.customer = customer;
    }

    public long getCake() {
        return cake;
    }

    public void setCake(long cake) {
        this.cake = cake;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
