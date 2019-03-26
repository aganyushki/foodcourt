package far.galaxy.foodcourt.entity.cake;

import far.galaxy.foodcourt.entity.MainMySQLPersistenceConfig;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;

@DataJpaTest
@ContextConfiguration(classes = MainMySQLPersistenceConfig.class)
public class CakeJPATest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CakeRepository repository;

    @Test
    public void findByName() { // just an example
        Cake cake = new Cake("cake1", 7);
        entityManager.persist(cake);
        entityManager.flush();

        Cake resCake = repository.findByName(cake.getName());

        Assertions.assertEquals(cake.getName(), resCake.getName());
    }

    // todo, how to test findAllByAvailableTrue method with Pageable argument?
}
