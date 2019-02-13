package far.galaxy.foodcourt.appcore.customer;

import far.galaxy.foodcourt.entity.cake.Cake;
import far.galaxy.foodcourt.entity.cake.CakeRepository;
import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.group.CustomerGroup;
import far.galaxy.foodcourt.entity.group.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {

    @Autowired
    GroupRepository groupRepository;


    public List<CustomerGroup> getList() {
        return groupRepository.findAll();
    }

    public CustomerGroup getGroupById(long groupId) {
        return groupRepository.getOne(groupId);
    }

    public List<Customer> getCustomers(long groupId) {
        return groupRepository.getOne(groupId).getCustomers();
    }
}
