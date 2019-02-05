package far.galaxy.foodcourt.oldentity.order;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Date;

public class OldOrderTest {

    private static final Long DEF_ID = 0L;

    private static final String TEST_USER_NAME = "user1";
    private static final String TEST_BULK_NAME = "bname122";
    private static final Long TEST_COUNT = 3L;
    private static final Long TEST_PRICE = 77L;
    private static final Long TEST_TX_SUM = 77L;
    private static final Date TEST_DATE = new Date();

    @Test
    void createEmpty() throws Exception {
        OldOrder customer = new OldOrder();

        Assertions.assertEquals(DEF_ID, customer.getId());
    }

    @Test
    void createWithData() throws Exception {
        OldOrder order = new OldOrder(
                TEST_USER_NAME,
                TEST_BULK_NAME,
                TEST_COUNT,
                TEST_PRICE,
                TEST_TX_SUM,
                TEST_DATE
        );

        Assertions.assertEquals(DEF_ID, order.getId());
        Assertions.assertEquals(TEST_USER_NAME, order.getUserName());
        Assertions.assertEquals(TEST_BULK_NAME, order.getBulkName());
        Assertions.assertEquals(TEST_COUNT, order.getCount());
        Assertions.assertEquals(TEST_PRICE, order.getPrice());
        Assertions.assertEquals(TEST_TX_SUM, order.getTransactionSum());
        Assertions.assertEquals(TEST_DATE, order.getTime());
    }

    @Test
    void checkEquals() {
        OldOrder order1 = new OldOrder();
        OldOrder order2 = new OldOrder();
        OldOrder order3 = new OldOrder();

        order1.setId(3L);
        order2.setId(3L);
        order3.setId(4L);

        Assertions.assertEquals(order1, order2);
        Assertions.assertNotEquals(order1, order3);
        Assertions.assertNotEquals(order2, order3);
    }

    @Test
    void checkHashcode() {
        final Long TEST_ID = 7777L;

        OldOrder order = new OldOrder();
        order.setId(TEST_ID);

        Assertions.assertEquals(Long.valueOf(TEST_ID).hashCode(), order.hashCode());
    }
}
