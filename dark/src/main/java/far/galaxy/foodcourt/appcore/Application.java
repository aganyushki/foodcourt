package far.galaxy.foodcourt.appcore;

import far.galaxy.foodcourt.entity.MainMySQLPersistenceConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
        scanBasePackages = {
                "far.galaxy.foodcourt.appcore"
        },
        scanBasePackageClasses = {
                MainMySQLPersistenceConfig.class
        }
)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
