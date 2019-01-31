package far.galaxy.foodcourt.oldentity.cake;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

public class CakeTest {
    private static final Long DEF_ID = -1L;
    private static final String DEF_NAME = "";
    private static final Long DEF_PRICE = 0L;
    private static final Long TEST_ID = 10L;
    private static final String TEST_NAME = "Test Name";
    private static final Long TEST_PRICE = 7L;

    @Test
    void createEmpty() throws Exception {
        Cake cake = new Cake();

        Assertions.assertEquals(DEF_ID, cake.getId());
        Assertions.assertEquals(DEF_NAME, cake.getName());
        Assertions.assertEquals(DEF_PRICE, cake.getPrice());
    }

    @Test
    void createWithNameAndPrice() throws Exception {
        Cake cake = new Cake(TEST_NAME, TEST_PRICE);

        Assertions.assertEquals(DEF_ID, cake.getId());
        Assertions.assertEquals(TEST_NAME, cake.getName());
        Assertions.assertEquals(TEST_PRICE, cake.getPrice());
    }

    @Test
    void createWithIdAndNameAndPrice() throws Exception {
        Cake cake = new Cake(TEST_ID, TEST_NAME, TEST_PRICE);

        Assertions.assertEquals(TEST_ID, cake.getId());
        Assertions.assertEquals(TEST_NAME, cake.getName());
        Assertions.assertEquals(TEST_PRICE, cake.getPrice());
    }

    @Test
    void checkEquals() {
        Cake cake1 = new Cake(1L,"name 1", 10L);
        Cake cake2 = new Cake(1L,"name 2", 11L);
        Cake cake3 = new Cake(2L,"name 3", 12L);

        Assertions.assertEquals(cake1, cake2);
        Assertions.assertNotEquals(cake1, cake3);
        Assertions.assertNotEquals(cake2, cake3);
    }

    @Test
    void checkHashcode() {
        final Long TEST_ID = 1L;

        Cake cake = new Cake(TEST_ID,"name 1", 10L);

        Assertions.assertEquals(TEST_ID, cake.getId());
        Assertions.assertEquals(Long.valueOf(TEST_ID).hashCode(), cake.hashCode());
    }
}
