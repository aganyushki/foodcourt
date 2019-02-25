package far.galaxy.foodcourt.appcore.customer;

import com.fasterxml.jackson.databind.ObjectMapper;
import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.group.CustomerGroup;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = GroupController.class, secure = false)
public class GroupControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GroupService groupService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void checkGetGroupList() throws Exception {
        List<CustomerGroup> groupList = Arrays.asList(
                new CustomerGroup("group 1"),
                new CustomerGroup("group 2")
        );

        Mockito.when(groupService.getList()).thenReturn(groupList);

        mockMvc.perform(
                get("/groups")
                        .accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(groupList)
                ));
    }

    @Test
    public void checkGetGroup() throws Exception {
        long id = 9;
        CustomerGroup group = new CustomerGroup("group 3");

        Mockito.when(groupService.getGroupById(id)).thenReturn(group);

        mockMvc.perform(
                get("/groups/" + id)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(group)
                ));
    }

    @Test
    public void checkGetGroupCustomers() throws Exception {
        long id = 44;
        List<Customer> testList = Arrays.asList(
                new Customer("Name 1", "email 1")
        );

        Mockito.when(groupService.getCustomers(id)).thenReturn(testList);

        mockMvc.perform(
                get("/groups/" + id + "/customers")
                    .accept(MediaType.APPLICATION_JSON_VALUE)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        objectMapper.writeValueAsString(testList)
                ));
    }
}
