package far.galaxy.foodcourt.appcore.customer;

import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.customer.CustomerRepository;
import far.galaxy.foodcourt.entity.group.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@RequestMapping(path = "/customer")
public class CustomerController {

    Logger log = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    GroupRepository groupRepository;

    @GetMapping()
    public ModelAndView customerListPage(
            @RequestParam("gid") long groupId
    ) {
        Map model = new HashMap();
        model.put("customers", groupRepository.getOne(groupId).getCustomers());
        return new ModelAndView("customerListPage", model);
    }

//    @GetMapping("/customer/add")
//    public String addNewCustomer() {
//        return "customerAddNewPage";
//    }

//    @PostMapping("/customer")
//    public RedirectView saveNewCustomer(
//            @RequestParam("name") String name,
//            @RequestParam("email") String email,
//            Model model
//    ) {
//        if (name.length() > 0 && email.length() > 0) {
//            repo.save(new Customer(name, email));
//        }
//        return new RedirectView("/customer/add");
//    }
}
