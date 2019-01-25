package far.galaxy.food_court.cake;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CakeControllerTest {

    private final static String CAKE_EDIT_PAGE_URL = "/cake/edit";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CakeController controller;

    @Test
    void initializationTest() {
        Assertions.assertNotNull(controller);
    }

    @Test
    void rootRedirectDestinationPage() throws Exception {
        mockMvc
                .perform(get(CAKE_EDIT_PAGE_URL))
                .andExpect(status().isOk());
    }
}
