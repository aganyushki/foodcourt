package far.galaxy.foodcourt.dbbuilder;

import far.galaxy.foodcourt.oldentity.customer.CustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class StartUp {
    Logger log = LoggerFactory.getLogger(StartUp.class);

    @Autowired
    CustomerRepository repo;

    @EventListener
    public void startUpEventListener(ContextRefreshedEvent e) {

        repo.findAll().forEach(it -> {
            log.info(it.toString());
        });

    }
}
