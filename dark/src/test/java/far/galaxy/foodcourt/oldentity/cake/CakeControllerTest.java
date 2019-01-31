package far.galaxy.foodcourt.oldentity.cake;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CakeControllerTest {

    private final static String CAKE_EDIT_ACTION_PAGE_URL = "/cake";
    private final static String CAKE_EDIT_VIEW_PAGE_URL = "/cake/edit";
    private final static String CAKE_LIST_PAGE_URL = "/cake/list";

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private CakeService cakeService;

    @InjectMocks
    private CakeController controller;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void initializationTest() {
        Assertions.assertNotNull(controller);
    }

    @Test
    void updateCakeActionTest() throws Exception {
        final Long TEST_ID = 10L;
        final String TEST_NAME = "Test cake name";
        final Long TEST_PRICE = 777L;

        mockMvc
                .perform(
                        post(CAKE_EDIT_ACTION_PAGE_URL)
                            .param("id", String.valueOf(TEST_ID))
                            .param("name", TEST_NAME)
                            .param("price", String.valueOf(TEST_PRICE))
                )
                .andExpect(redirectedUrl(CAKE_EDIT_VIEW_PAGE_URL));

        Mockito.verify(cakeService).updateCake(TEST_ID, TEST_NAME, TEST_PRICE);
    }

    @Test
    void updateCakeActionWithDefValuesTest() throws Exception {
        final Long DEF_ID = -1L;
        final String DEF_NAME = "";
        final Long DEF_PRICE = 0L;

        mockMvc
                .perform(
                        post(CAKE_EDIT_ACTION_PAGE_URL)
                )
                .andExpect(redirectedUrl(CAKE_EDIT_VIEW_PAGE_URL));

        Mockito.verify(cakeService).updateCake(DEF_ID, DEF_NAME, DEF_PRICE);
    }

    @Test
    void cakeListEditPageTest() throws Exception {
        final Long TEST_ID = 10L;
        final String TEST_NAME = "Test cake name";
        final Long TEST_PRICE = 777L;

        Cake testCake = new Cake(TEST_ID, TEST_NAME, TEST_PRICE);
        List<Cake> testList = new ArrayList<>();
        testList.add(testCake);

        Mockito.when(cakeService.getCakeByIdOrNew(Mockito.anyLong())).thenReturn(testCake);
        Mockito.when(cakeService.getAvailableCakes()).thenReturn(testList);

        mockMvc
                .perform(
                        get(CAKE_EDIT_VIEW_PAGE_URL)
                                .param("id", String.valueOf(TEST_ID))
                )
                .andExpect(status().isOk())
                .andExpect(view().name("cakeListEditPage"))
                .andExpect(model().attribute("cake", testCake))
                .andExpect(model().attribute("entities", testList));

        Mockito.verify(cakeService).getCakeByIdOrNew(TEST_ID);
    }

    @Test
    void cakeListEditPageWithDefValueTest() throws Exception {
        final Long TEST_ID = -1L;
        final String TEST_NAME = "Test cake name";
        final Long TEST_PRICE = 777L;

        Cake testCake = new Cake(TEST_ID, TEST_NAME, TEST_PRICE);
        List<Cake> testList = new ArrayList<>();
        testList.add(testCake);

        Mockito.when(cakeService.getCakeByIdOrNew(Mockito.anyLong())).thenReturn(testCake);
        Mockito.when(cakeService.getAvailableCakes()).thenReturn(testList);

        mockMvc
                .perform(
                        get(CAKE_EDIT_VIEW_PAGE_URL)
                )
                .andExpect(status().isOk())
                .andExpect(view().name("cakeListEditPage"))
                .andExpect(model().attribute("cake", testCake))
                .andExpect(model().attribute("entities", testList));

        Mockito.verify(cakeService).getCakeByIdOrNew(TEST_ID);
    }

    @Test
    void cakeChoosePageTest() throws Exception {
        final String TEST_UID = "test_uid";

        final Long TEST_ID = -1L;
        final String TEST_NAME = "Test cake name";
        final Long TEST_PRICE = 777L;

        Cake testCake = new Cake(TEST_ID, TEST_NAME, TEST_PRICE);
        List<Cake> testList = new ArrayList<>();
        testList.add(testCake);

        Mockito.when(cakeService.getAvailableCakes()).thenReturn(testList);

        mockMvc
                .perform(
                        get(CAKE_LIST_PAGE_URL)
                                .param("uid", TEST_UID)
                )
                .andExpect(status().isOk())
                .andExpect(view().name("cakeListPage"))
                .andExpect(model().attribute("uid", TEST_UID))
                .andExpect(model().attribute("entities", testList));

        Mockito.verify(cakeService).getAvailableCakes();
    }

    @Test
    void cakeChoosePageWithoutArgsTest() throws Exception {
        mockMvc
                .perform(
                        get(CAKE_LIST_PAGE_URL)
                )
                .andExpect(status().isBadRequest());
    }
}
