package far.galaxy.food_court.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class CustomerController {

    @Autowired
    CustomerRepository repo;

    @GetMapping("/customer/list")
    public String customerListPage(
            @RequestParam("gid") String groupId,
            Model model
    ) {
        model.addAttribute("customers", repo.getActiveCustomersById(groupId));
        return "customerListPage";
    }

    @GetMapping("/customer/groups")
    public String customerGroupsPage(
            Model model
    ) {
        model.addAttribute("groups", repo.getCustomerGroups());
        return "customerGroupPage";
    }

    @GetMapping("/customer/add")
    public String addNewCustomer() {
        return "customerAddNewPage";
    }

    @PostMapping("/customer")
    public RedirectView saveNewCustomer(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            Model model
    ) {
        if (name.length() > 0 && email.length() > 0) {
            repo.save(new Customer(name, email));
        }
        return new RedirectView("/customer/add");
    }
}
