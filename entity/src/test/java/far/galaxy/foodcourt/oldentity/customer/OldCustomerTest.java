package far.galaxy.foodcourt.oldentity.customer;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class OldCustomerTest {
    private static final Long DEF_ID = 0L;
    private static final String DEF_NAME = "";
    private static final String DEF_EMAIL = "";
    private static final Long TEST_ID = 10L;
    private static final String TEST_NAME = "Test Name";
    private static final String TEST_EMAIL = "test@email.dom";

    @Test
    void createEmpty() throws Exception {
        OldCustomer customer = new OldCustomer();

        Assertions.assertEquals(DEF_ID, customer.getId());
        Assertions.assertEquals(DEF_NAME, customer.getName());
        Assertions.assertEquals(DEF_EMAIL, customer.getEmail());
    }

    @Test
    void createWithNameAndEmail() throws Exception {
        OldCustomer customer = new OldCustomer(TEST_NAME, TEST_EMAIL);

        Assertions.assertEquals(DEF_ID, customer.getId());
        Assertions.assertEquals(TEST_NAME, customer.getName());
        Assertions.assertEquals(TEST_EMAIL, customer.getEmail());
    }

    @Test
    void checkEquals() {
        OldCustomer customer1 = new OldCustomer("name 1", "email1");
        OldCustomer customer2 = new OldCustomer("name 1", "email1");
        OldCustomer customer3 = new OldCustomer("name 1", "email1");

        customer1.setId(3L);
        customer2.setId(3L);
        customer3.setId(4L);

        Assertions.assertEquals(customer1, customer2);
        Assertions.assertNotEquals(customer1, customer3);
        Assertions.assertNotEquals(customer2, customer3);
    }

    @Test
    void checkHashcode() {
        final Long TEST_ID = 1L;

        OldCustomer customer = new OldCustomer("name 1", "email@test");
        customer.setId(TEST_ID);

        Assertions.assertEquals(Long.valueOf(TEST_ID).hashCode(), customer.hashCode());
    }
}
