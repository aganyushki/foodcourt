package far.galaxy.foodcourt.oldentity.customer;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Arrays;
import java.util.List;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    @Query("FROM Customer WHERE user_name LIKE :groupId%")
    List<Customer> getActiveCustomersById(@Param("groupId") String groupId);

    default List<String> getCustomerGroups() {
        String[] groups = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z"};
        return Arrays.asList(groups);
    }
}
