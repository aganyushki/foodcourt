package far.galaxy.foodcourt.oldentity.system;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class OldBalanceTest {

    private static final Long DEF_ID = 0L;

    private static final String TEST_USER_NAME = "niceusername";
    private static final Long TEST_TX = 177L;

    @Test
    void createEmpty() throws Exception {
        OldBalance balance = new OldBalance();

        Assertions.assertEquals(DEF_ID, balance.getId());
    }

    @Test
    void createWithData() throws Exception {
        OldBalance balance = new OldBalance(
                TEST_USER_NAME,
                TEST_TX
        );

        Assertions.assertEquals(DEF_ID, balance.getId());
        Assertions.assertEquals(TEST_USER_NAME, balance.getUserName());
        Assertions.assertEquals(TEST_TX, balance.getIncomingTransaction());
    }

    @Test
    void checkEquals() {
        OldBalance balance1 = new OldBalance();
        OldBalance balance2 = new OldBalance();
        OldBalance balance3 = new OldBalance();

        balance1.setId(3L);
        balance2.setId(3L);
        balance3.setId(4L);

        Assertions.assertEquals(balance1, balance2);
        Assertions.assertNotEquals(balance1, balance3);
        Assertions.assertNotEquals(balance1, balance3);
    }

    @Test
    void checkHashcode() {
        final Long TEST_ID = 7777L;

        OldBalance balance = new OldBalance();
        balance.setId(TEST_ID);

        Assertions.assertEquals(Long.valueOf(TEST_ID).hashCode(), balance.hashCode());
    }
}
