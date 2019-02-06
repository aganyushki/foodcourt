package far.galaxy.foodcourt.appcore.cake;

import far.galaxy.foodcourt.appcore.cake.CakeService;
import far.galaxy.foodcourt.entity.cake.CakeRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
//        Assertions.assertThrows(
//                IllegalArgumentException.class, () -> cakeService.updateCake(0L, "", 2L)
//        );
//        Assertions.assertThrows(
//                IllegalArgumentException.class, () -> cakeService.updateCake(1L, "Name", 0L)
//        );
//        Assertions.assertThrows(
//                IllegalArgumentException.class, () -> cakeService.updateCake(1L, "Name", -5L)
//        );
    }

    @Test
    public void updateCakeTest() {
//        Cake cake = new Cake(1L, "Example name", 77L);
//
//        Mockito.when(cakeRepository.save(Mockito.any())).thenReturn(null);
//        Mockito.when(cakeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(cake));
//
//        cakeService.updateCake(cake.getId(), cake.getName(), cake.getPrice());
//
//        Mockito.verify(cakeRepository).save(cake);
    }

    @Test
    public void putNewCakeTest() {
//        Cake cake = new Cake(-1L, "It is a name", 7L);
//
//        Mockito.when(cakeRepository.save(Mockito.any())).thenReturn(null);
//
//        cakeService.updateCake(cake.getId(), cake.getName(), cake.getPrice());
//
//        Mockito.verify(cakeRepository).save(cake);
    }

    @Test
    public void getNewCakeTest() {
//        Cake item = cakeService.getCakeByIdOrNew(-1L);
//
//        Assertions.assertEquals(-1L, item.getId().longValue());
//        Assertions.assertEquals(0L, item.getPrice().longValue());
//        Assertions.assertEquals("", item.getName());
    }

    @Test
    public void getCakeByIdTest() {
//        Cake testItem = new Cake(3L, "Example name", 100L);
//        Mockito.when(cakeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(testItem));
//
//        Assertions.assertEquals(
//                testItem,
//                cakeService.getCakeByIdOrNew(1L)
//        );
    }

    @Test
    public void getAvailableCakesTest() {
//        List<Cake> testList = new ArrayList<>();
//        testList.add(new Cake(1L, "name-1", 10L));
//        testList.add(new Cake(2L,"name-2", 20L));
//
//        Mockito.when(cakeRepository.getAvailableCakes()).thenReturn(testList);
//
//        Assertions.assertEquals(
//                testList,
//                cakeService.getAvailableCakes()
//        );
    }

    @Test
    public void getAvailableUnsortedCakesTest() {
//        List<Cake> testList = new ArrayList<>();
//        testList.add(new Cake(2L,"name-B", 20L));
//        testList.add(new Cake(3L,"name-A", 20L));
//        testList.add(new Cake(1L, "name-A", 10L));
//
//        Mockito.when(cakeRepository.getAvailableCakes()).thenReturn(testList);
//
//        List<Cake> resultList = testList.stream()
//                .sorted((a, b) -> a.getId().compareTo(b.getId()))
//                .collect(Collectors.toList());
//
//        Assertions.assertEquals(
//                resultList,
//                cakeService.getAvailableCakes()
//        );
    }
}
