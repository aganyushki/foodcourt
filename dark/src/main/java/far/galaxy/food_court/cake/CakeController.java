package far.galaxy.food_court.cake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class CakeController {

    @Autowired
    CakeService cakeService;

    @GetMapping("/cake/list")
    public String cakeChoosePage(
            @RequestParam("uid") String uid,
            Model model
    ) {
        model.addAttribute("entities", cakeService.getAvailableCakes());
        model.addAttribute("uid", uid);
        return "cakeListPage";
    }

    @PostMapping("/cake")
    public RedirectView updateCake(
            @RequestParam( name = "id", defaultValue = "-1") Long cakeId,
            @RequestParam( name = "name", defaultValue = "") String name,
            @RequestParam( name = "price", defaultValue = "0") Long price,
            Model model
    ) {
        cakeService.updateCake(cakeId, name, price);
        return new RedirectView("/cake/edit");
    }

    @GetMapping("/cake/edit")
    public String cakeListEdit(
            @RequestParam( name = "id", defaultValue = "-1") Long cakeId,
            Model model
    ) {
        model.addAttribute("cake", cakeService.getCakeByIdOrNew(cakeId));
        model.addAttribute("entities", cakeService.getAvailableCakes());

        return "cakeListEditPage";
    }
}
