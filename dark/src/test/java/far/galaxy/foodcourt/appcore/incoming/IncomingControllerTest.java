package far.galaxy.foodcourt.appcore.incoming;

import com.fasterxml.jackson.databind.ObjectMapper;
import far.galaxy.foodcourt.appcore.FakePage;
import far.galaxy.foodcourt.appcore.order.OrderController;
import far.galaxy.foodcourt.appcore.order.OrderRequest;
import far.galaxy.foodcourt.appcore.order.OrderService;
import far.galaxy.foodcourt.entity.transaction.OrderItem;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static far.galaxy.foodcourt.appcore.TestConstants.PAGINATION_DEFAULT_LIMIT;
import static far.galaxy.foodcourt.appcore.TestConstants.PAGINATION_DEFAULT_PAGE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = IncomingController.class, secure = false)
public class IncomingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IncomingService incomingService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void checkGetIncomingList() throws Exception {
        FakePage fakePage = new FakePage();

        Mockito.when(
                incomingService.getIncomingList(
                    PAGINATION_DEFAULT_PAGE,
                    PAGINATION_DEFAULT_LIMIT
                )
        ).thenReturn(fakePage);

        mockMvc.perform(
                get("/incoming")
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(fakePage)
                ));
    }

    @Test
    public void checkGetIncomingListWithPagination() throws Exception {
        FakePage fakePage = new FakePage();

        Mockito.when(
                incomingService.getIncomingList(
                        3,
                        77
                )
        ).thenReturn(fakePage);

        mockMvc.perform(
                get("/incoming?page=3&limit=77")
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(fakePage)
                ));
    }
}
