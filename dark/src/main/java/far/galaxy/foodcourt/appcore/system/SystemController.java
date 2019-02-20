package far.galaxy.foodcourt.appcore.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path ="/system")
public class SystemController {

    @GetMapping(
            value = "/check/admin",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public SystemStatus checkIsAdmin() {
        return new SystemStatus();
    }
}
