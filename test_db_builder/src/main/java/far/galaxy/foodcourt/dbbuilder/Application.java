package far.galaxy.foodcourt.dbbuilder;

import far.galaxy.foodcourt.oldentity.PersistenceConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
        scanBasePackages = {
                "far.galaxy.foodcourt.dbbuilder"
        },
        scanBasePackageClasses = {
                PersistenceConfig.class
        }
)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
