package far.galaxy.foodcourt.appcore.customer;

import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.group.CustomerGroup;
import far.galaxy.foodcourt.entity.group.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/groups")
public class GroupController {

    @Autowired
    GroupRepository groupRepository; // todo, move to service

    @GetMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public List<CustomerGroup> getGroupList() {
        return groupRepository.findAll();
    }

    @GetMapping(
            value = "/{groupId}",
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public CustomerGroup getGroup(@PathVariable Long groupId) {
        return groupRepository.getOne(groupId);
    }

    @GetMapping(
            value = "/{groupId}/customers",
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public List<Customer> getGroupCustomers(@PathVariable Long groupId) {
        return groupRepository.getOne(groupId).getCustomers();
    }
}
