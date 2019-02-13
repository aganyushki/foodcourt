package far.galaxy.foodcourt.appcore.cake;

import far.galaxy.foodcourt.entity.cake.Cake;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/cakes")
public class CakeController {

    @Autowired
    CakeService cakeService;

    @GetMapping(
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<Cake> getAvailableCakeList() {
        return cakeService.getAvailableCakes();
    }

    @GetMapping(
            value = "/{cakeId}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public Cake getCakeById(@PathVariable long cakeId) {
        return cakeService.getCakeById(cakeId);
    }
}
