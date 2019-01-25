package far.galaxy.food_court.cake;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@ExtendWith(MockitoExtension.class)
public class CakeServiceTest {

    @Mock
    private CakeRepository cakeRepository;

    @InjectMocks
    private CakeService cakeService;

    @Test
    public void initializationTest() {
        Assertions.assertNotNull(cakeService);
    }

    @Test
    public void UpdateCakeWithExceptionTest() {
        Assertions.assertThrows(
                IllegalArgumentException.class, () -> cakeService.updateCake(-1L, "Name", 2L)
        );
        Assertions.assertThrows(
                IllegalArgumentException.class, () -> cakeService.updateCake(0L, "", 2L)
        );
        Assertions.assertThrows(
                IllegalArgumentException.class, () -> cakeService.updateCake(1L, "Name", 0L)
        );
    }

//    @Test
//    public void updateCakeTest() {
//        Cake origItem = new Cake(1L, "Example name", 77L);
//        final String NEW_NAME = "Example name";
//        final Long NEW_PRICE = 7L;
//
//        Cake resultItem = ?
//
//        Assertions.assertEquals(1L, Optional.ofNullable(resultItem.getId()));
//        Assertions.assertEquals(NEW_NAME, resultItem.getName());
//        Assertions.assertEquals(NEW_PRICE, resultItem.getPrice());
//    }

    @Test
    public void getNewCakeTest() {
        Cake item = cakeService.getCakeByIdOrNew(-1L);

        Assertions.assertEquals(-1L, item.getId().longValue());
        Assertions.assertEquals(0L, item.getPrice().longValue());
        Assertions.assertEquals("", item.getName());
    }

    @Test
    public void getCakeByIdTest() {
        Cake testItem = new Cake(3L, "Example name", 100L);
        Mockito.when(cakeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(testItem));

        Assertions.assertEquals(
                testItem,
                cakeService.getCakeByIdOrNew(1L)
        );
    }

    @Test
    public void getAvailableCakesTest() {
        List<Cake> testList = new ArrayList<>();
        testList.add(new Cake("name-1", 10L));
        testList.add(new Cake("name-2", 20L));

        Mockito.when(cakeRepository.getAvailableCakes()).thenReturn(testList);

        Assertions.assertEquals(
                testList,
                cakeService.getAvailableCakes()
        );
    }
}
