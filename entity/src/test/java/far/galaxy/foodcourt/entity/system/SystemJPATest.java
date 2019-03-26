package far.galaxy.foodcourt.entity.system;

import far.galaxy.foodcourt.entity.MainMySQLPersistenceConfig;
import far.galaxy.foodcourt.entity.cake.Cake;
import far.galaxy.foodcourt.entity.cake.CakeRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;

@DataJpaTest
@ContextConfiguration(classes = MainMySQLPersistenceConfig.class)
public class SystemJPATest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository repository;

    @Test
    public void findByUsername() {
        final String NAME = "example user name";
        User user = new User();
        user.setUsername(NAME);

        entityManager.persist(user);
        entityManager.flush();

        User resUser = repository.findByUsername(NAME);

        Assertions.assertEquals(NAME, resUser.getUsername());
    }
}
