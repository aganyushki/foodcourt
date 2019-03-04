package far.galaxy.foodcourt.appcore.cake;

import com.fasterxml.jackson.databind.ObjectMapper;
import far.galaxy.foodcourt.appcore.FakePage;
import far.galaxy.foodcourt.entity.cake.Cake;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static far.galaxy.foodcourt.appcore.TestConstants.PAGINATION_DEFAULT_LIMIT;
import static far.galaxy.foodcourt.appcore.TestConstants.PAGINATION_DEFAULT_PAGE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = CakeController.class, secure = false)
public class CakeControllerTest {
    private Logger LOG = LoggerFactory.getLogger(CakeControllerTest.class);

    // todo, exceptions is not handled in controller and not tested here

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CakeService cakeService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void checkGetAvailableCakeList() throws Exception {
        FakePage fakePage = new FakePage();

        Mockito.when(cakeService.getAvailableCakes(PAGINATION_DEFAULT_PAGE, PAGINATION_DEFAULT_LIMIT)).thenReturn(fakePage);
        LOG.info(objectMapper.writeValueAsString(fakePage));
        mockMvc.perform(
                get("/cakes")
                        .accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(fakePage)
                ));
    }

    @Test
    public void checkGetAvailableCakeListWithPagination() throws Exception {
        FakePage fakePage = new FakePage();

        Mockito.when(cakeService.getAvailableCakes(3,77)).thenReturn(fakePage);
        LOG.info(objectMapper.writeValueAsString(fakePage));
        mockMvc.perform(
                get("/cakes?page=3&limit=77")
                        .accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(fakePage)
                ));
    }

    @Test
    public void checkGetCakeById() throws Exception {
        long id = 666;
        Cake cake = new Cake("name 666", BigDecimal.valueOf(13));

        Mockito.when(cakeService.getCakeById(id)).thenReturn(cake);

        mockMvc.perform(
                get("/cakes/" + id).accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(cake)
                ));
    }

    @Test
    public void checkNewCake() throws Exception {
        String name = "test-name";
        BigDecimal price = BigDecimal.valueOf(713);
        Cake testResultCake = new Cake(name, price);
        String jsonCake = objectMapper.writeValueAsString(testResultCake);

        Mockito.when(cakeService.storeNewCake(name, price)).thenReturn(testResultCake);

        mockMvc.perform(
                put("/cakes")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .content(jsonCake)

        )
                .andExpect(status().isOk())
                .andExpect(content().json(jsonCake));
    }

    @Test
    public void checkUpdateCake() throws Exception {
        long id = 717;
        String name = "test-name";
        BigDecimal price = BigDecimal.valueOf(713);
        Cake testResultCake = new Cake(name, price);
        String jsonCake = objectMapper.writeValueAsString(testResultCake);

        Mockito.when(cakeService.updateCake(id, name)).thenReturn(testResultCake);

        mockMvc.perform(
                post("/cakes/" + id)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .content(jsonCake)

        )
                .andExpect(status().isOk())
                .andExpect(content().json(jsonCake));
    }

    @Test
    public void checkRemoveCake() throws Exception {
        long id = 777;

        mockMvc.perform(
                delete("/cakes/" + id)
                        .accept(MediaType.APPLICATION_JSON_VALUE)

        )
                .andExpect(status().isOk());

        Mockito.verify(cakeService).removeCake(id);
    }
}
