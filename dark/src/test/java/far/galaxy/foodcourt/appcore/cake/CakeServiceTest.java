package far.galaxy.foodcourt.appcore.cake;

import far.galaxy.foodcourt.appcore.cake.CakeService;
import far.galaxy.foodcourt.entity.cake.Cake;
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

import static org.mockito.Mockito.verify;
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
    public void checkSave() {
        String name = "cake test name";
        long price = 77;

        cakeService.storeNewCake(name, price);
    }

    @Test
    public void checkNullPointerInSaveMethod() {
        String name = null;
        long price = 77;

        Assertions.assertThrows(
                NullPointerException.class, () -> cakeService.storeNewCake(name, price)
        );
    }

    @Test
    public void checkInvalidPriceInSaveMethod() {
        String name = "test name";
        long priceTry1 = 0;
        long priceTry2 = -2;

        Assertions.assertThrows(
                IllegalArgumentException.class, () -> cakeService.storeNewCake(name, priceTry1)
        );
        Assertions.assertThrows(
                IllegalArgumentException.class, () -> cakeService.storeNewCake(name, priceTry2)
        );
    }

    @Test
    public void checkRepositoryCallInSaveMethod() {
        String name = "name";
        long price = 7;
        final long DEFAULT_ID = 0;
        final long DEFAULT_VERSION = 1;
        final boolean DEFAULT_AVAILABLE = true;

        cakeService.storeNewCake(name, price);

        ArgumentCaptor<Cake> argument = ArgumentCaptor.forClass(Cake.class);
        verify( cakeRepository ).save(argument.capture());

        Assertions.assertEquals(DEFAULT_ID, argument.getValue().getId());
        Assertions.assertEquals(DEFAULT_VERSION, argument.getValue().getVersion());
        Assertions.assertEquals(DEFAULT_AVAILABLE, argument.getValue().isAvailable());
        Assertions.assertEquals(new Cake(name, price).getName(), argument.getValue().getName());
        Assertions.assertEquals(new Cake(name, price).getPrice(), argument.getValue().getPrice());
    }

    @Test
    public void checkRemove() {
        long id = 7;

        cakeService.removeCake(id);
    }

    @Test
    public void checkRepositoryCallInRemoveMethod() {
        Long id = 3L;

        cakeService.removeCake(id);

        ArgumentCaptor<Long> argument = ArgumentCaptor.forClass(Long.class);
        verify( cakeRepository ).deleteById(argument.capture());

        Assertions.assertEquals(id, argument.getValue());
    }

    @Test
    public void checkGetterForAvailableCakes() {
        Cake cake1 = new Cake("name 1", 1); cake1.setId(1);
        Cake cake2 = new Cake("name 2", 2); cake2.setId(2);
        List<Cake> testList = new ArrayList<>();
        testList.add(cake2);
        testList.add(cake1);

        Mockito.when(cakeRepository.findAllByAvailableTrue()).thenReturn(testList);

        List<Cake> sortedTestList = testList.stream()
                .sorted((a, b) ->
                        a.getId() > b.getId() ? 1 : (
                                a.getId() < b.getId() ? -1 : 0
                        )
                )
                .collect(Collectors.toList());

        List<Cake> value = cakeService.getAvailableCakes();

        Assertions.assertNotEquals(testList, value);
        Assertions.assertEquals(
                sortedTestList,
                value
        );
    }

    @Test
    public void checkNullPointerExceptionForAvailableCakes() {
        Mockito.when(cakeRepository.findAllByAvailableTrue()).thenReturn(null);
        Assertions.assertThrows(
                NullPointerException.class, () -> cakeService.getAvailableCakes()
        );
    }

    @Test
    public void checkGetById() {
        long id = 7;
        cakeService.getCakeById(id);
        Mockito.verify(cakeRepository).getOne(id);
    }

    @Test
    public void checkUpdateName() {
        long id = 9;
        String name = "new name";
        Cake cake = new Cake("name", 44);
        cake.setId(id);

        Mockito.when(cakeRepository.getOne(id)).thenReturn(cake);

        cakeService.updateCake(id, name);

        ArgumentCaptor<Cake> argument = ArgumentCaptor.forClass(Cake.class);
        verify(cakeRepository).save(argument.capture());

        Cake value = argument.getValue();
        Assertions.assertEquals(id, value.getId());
        Assertions.assertEquals(name, value.getName());
    }

    @Test
    public void checkUpdateNullName() {
        long id = 9;
        String name = "name";
        Cake cake = new Cake(name, 44);
        cake.setId(id);

        Mockito.when(cakeRepository.getOne(id)).thenReturn(cake);

        cakeService.updateCake(id, null);

        ArgumentCaptor<Cake> argument = ArgumentCaptor.forClass(Cake.class);
        verify(cakeRepository).save(argument.capture());

        Cake value = argument.getValue();
        Assertions.assertEquals(id, value.getId());
        Assertions.assertEquals(name, value.getName());
    }
}
