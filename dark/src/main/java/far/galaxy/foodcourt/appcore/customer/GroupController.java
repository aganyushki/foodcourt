package far.galaxy.foodcourt.appcore.customer;

import far.galaxy.foodcourt.entity.group.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path = "/group")
public class GroupController {

    @Autowired
    GroupRepository groupRepository;

    @GetMapping()
    public ModelAndView customerGroupsPage() {
        Map model = new HashMap();
        model.put("groups", groupRepository.findAll());
        return new ModelAndView("customerGroupPage", model);
    }
}
