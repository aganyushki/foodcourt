package far.galaxy.foodcourt.oldentity.cake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path = "/cake")
public class CakeController {

    @Autowired
    CakeService cakeService;

    @PostMapping()
    public RedirectView updateCake(
            @RequestParam( name = "id", defaultValue = "-1") Long cakeId,
            @RequestParam( name = "name", defaultValue = "") String name,
            @RequestParam( name = "price", defaultValue = "0") Long price
    ) {
        cakeService.updateCake(cakeId, name, price);

        return new RedirectView("/cake/edit");
    }

    @GetMapping("/edit")
    public ModelAndView cakeListEdit(
            @RequestParam( name = "id", defaultValue = "-1") Long cakeId
    ) {
        Map model = new HashMap();
        model.put("cake", cakeService.getCakeByIdOrNew(cakeId));
        model.put("entities", cakeService.getAvailableCakes());

        return new ModelAndView("cakeListEditPage", model);
    }

    @GetMapping("/list")
    public ModelAndView cakeChoosePage(
            @RequestParam("uid") String uid
    ) {
        Map model = new HashMap();
        model.put("entities", cakeService.getAvailableCakes());
        model.put("uid", uid);

        return new ModelAndView("cakeListPage", model);
    }
}
