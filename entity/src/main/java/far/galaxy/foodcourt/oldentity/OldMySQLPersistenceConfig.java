package far.galaxy.foodcourt.oldentity;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@PropertySources({
        @PropertySource("classpath:old-application-database.properties")
})
@EnableJpaRepositories(
        entityManagerFactoryRef = "oldEntityManagerFactory",
        transactionManagerRef = "oldTransactionManager",
        basePackages = {"far.galaxy.foodcourt.oldentity"}
)
@EntityScan(basePackages = {"far.galaxy.foodcourt.oldentity"})
public class OldMySQLPersistenceConfig {

    @Value("${hbm2ddl}")
    private String hbm2ddl;

    @Bean(name = "oldataSource")
    @ConfigurationProperties(prefix = "spring.oldatasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "oldEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("oldataSource") DataSource dataSource
    ) {
        LocalContainerEntityManagerFactoryBean bean = builder
                .dataSource(dataSource)
                .packages("far.galaxy.foodcourt.oldentity")
                .build();

        Properties hibernateProperties = new Properties();
        hibernateProperties.setProperty("hibernate.hbm2ddl.auto", hbm2ddl);
        hibernateProperties.setProperty("hibernate.show_sql", "false");
        hibernateProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");

        bean.setJpaProperties(hibernateProperties);

        return bean;
    }

    @Bean(name = "oldTransactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("oldEntityManagerFactory") EntityManagerFactory entityManagerFactory
    ) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
