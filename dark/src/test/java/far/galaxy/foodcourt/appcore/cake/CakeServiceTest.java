package far.galaxy.foodcourt.appcore.cake;

import far.galaxy.foodcourt.appcore.FakePage;
import far.galaxy.foodcourt.appcore.cake.CakeService;
import far.galaxy.foodcourt.entity.cake.Cake;
import far.galaxy.foodcourt.entity.cake.CakeRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
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
        BigDecimal price = BigDecimal.valueOf(77);

        cakeService.storeNewCake(name, price);
    }

    @Test
    public void checkNullPointerInSaveMethod() {
        String name = null;
        BigDecimal price = BigDecimal.valueOf(77);

        Assertions.assertThrows(
                NullPointerException.class, () -> cakeService.storeNewCake(name, price)
        );
    }

    @Test
    public void checkInvalidPriceInSaveMethod() {
        String name = "test name";
        BigDecimal priceTry1 = BigDecimal.valueOf(0);
        BigDecimal priceTry2 = BigDecimal.valueOf(-2);

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
        BigDecimal price = BigDecimal.valueOf(7);
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
        FakePage fakePage = new FakePage();
        Mockito.when(cakeRepository.findAllByAvailableTrue(Mockito.any())).thenReturn(fakePage);

        Page<Cake> availableCakes = cakeService.getAvailableCakes(1, 2);

        Assertions.assertEquals(fakePage, availableCakes);
    }

    @Test
    public void checkGetterForAvailableCakesWithSearch() {
        FakePage fakePage = new FakePage();
        Mockito.when(
                cakeRepository.findAllByAvailableTrueAndNameLike(Mockito.any(), Mockito.anyString())
        ).thenReturn(fakePage);

        Page<Cake> availableCakes = cakeService.getAvailableCakes(1, 2, "test");

        Assertions.assertEquals(fakePage, availableCakes);
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
        Cake cake = new Cake("name", BigDecimal.valueOf(44));
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
        Cake cake = new Cake(name, BigDecimal.valueOf(44));
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
