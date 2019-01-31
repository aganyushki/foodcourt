package far.galaxy.foodcourt.oldentity.system;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class RootControllerTest {

    private static final String ROOT_PAGE_REDIRECT_DESTINATION = "/customer/groups";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RootController controller;

    @Test
    void checkInitialization() {
        Assertions.assertNotNull(controller);
    }

    @Test
    @DisplayName("admin page test")
    void rootPage() throws Exception {
        MvcResult mvcResult = mockMvc
                .perform(get("/"))
                .andReturn();

        String headerValue = mvcResult
                .getResponse()
                .getHeader("Location");

        Assertions.assertEquals(headerValue, ROOT_PAGE_REDIRECT_DESTINATION);
    }

    @Test
    void rootRedirectDestinationPage() throws Exception {
        mockMvc
                .perform(get(ROOT_PAGE_REDIRECT_DESTINATION))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
