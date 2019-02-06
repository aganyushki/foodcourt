package far.galaxy.foodcourt.dbbuilder;

import far.galaxy.foodcourt.entity.MainMySQLPersistenceConfig;
import far.galaxy.foodcourt.oldentity.OldMySQLPersistenceConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
        scanBasePackages = {
                "far.galaxy.foodcourt.dbbuilder"
        },
        scanBasePackageClasses = {
                MainMySQLPersistenceConfig.class,
                OldMySQLPersistenceConfig.class
        }
)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
