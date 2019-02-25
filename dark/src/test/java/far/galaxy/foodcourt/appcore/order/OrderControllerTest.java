package far.galaxy.foodcourt.appcore.order;

import com.fasterxml.jackson.databind.ObjectMapper;
import far.galaxy.foodcourt.entity.transaction.OrderItem;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = OrderController.class, secure = false)
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void checkGetOrderList() throws Exception {
        List<OrderItem> testList = Arrays.asList(
                new OrderItem()
        );
        testList.get(0).setId(7);
        testList.get(0).setTime(null);

        Mockito.when(orderService.getOrderList()).thenReturn(testList);

        mockMvc.perform(
                get("/orders")
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(testList)
                ));
    }

    @Test
    public void checkGetOrderById() throws Exception {
        long id = 777;
        OrderItem order = new OrderItem();
        order.setId(id);
        order.setTime(null);

        Mockito.when(orderService.getOrderById(id)).thenReturn(order);

        mockMvc.perform(
                get("/orders/" + id)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(order)
                ));
    }

    @Test
    public void checkPutNewOrder() throws Exception {
        long customerId = 1;
        long cakeId = 2;
        int count = 3;

        OrderRequest orderRequest = new OrderRequest(customerId, cakeId, count);

        OrderItem order = new OrderItem(null, null, count);
        order.setTime(null); /// todo, yes, so shitty ;)

        Mockito.when(orderService.putNewOrder(customerId, cakeId, count)).thenReturn(order);

        mockMvc.perform(
                put("/orders")
                    .accept(MediaType.APPLICATION_JSON_VALUE)
                    .contentType(MediaType.APPLICATION_JSON_VALUE)
                    .content(objectMapper.writeValueAsString(orderRequest))
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(order)
                ));

    }
}
