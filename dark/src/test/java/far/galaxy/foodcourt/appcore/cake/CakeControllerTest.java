package far.galaxy.foodcourt.appcore.cake;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import far.galaxy.foodcourt.appcore.cake.CakeController;
import far.galaxy.foodcourt.appcore.cake.CakeService;
import far.galaxy.foodcourt.entity.cake.Cake;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = CakeController.class, secure = false)
public class CakeControllerTest {

    // todo, exceptions is not handled in controller and not tested here

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CakeService cakeService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void checkGetAvailableCakeList() throws Exception {
        List<Cake> testList = new ArrayList<>();
        testList.add(new Cake("name", BigDecimal.valueOf(2)));

        Mockito.when(cakeService.getAvailableCakes()).thenReturn(testList);

        mockMvc.perform(
                get("/cakes")
                        .accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(testList)
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
