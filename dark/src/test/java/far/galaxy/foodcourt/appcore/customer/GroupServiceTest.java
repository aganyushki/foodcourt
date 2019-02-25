package far.galaxy.foodcourt.appcore.customer;

import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.group.CustomerGroup;
import far.galaxy.foodcourt.entity.group.GroupRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class GroupServiceTest {

    @Mock
    private GroupRepository groupRepository;

    @InjectMocks
    private GroupService groupService;

    @Test
    public void initializationTest() {
        Assertions.assertNotNull(groupService);
    }

    @Test
    public void checkGetList() {
        List<CustomerGroup> testList = new ArrayList<>();

        Mockito.when(groupRepository.findAll()).thenReturn(testList);

        Assertions.assertEquals(testList, groupService.getList());
    }

    @Test
    public void checkGetGroupByID() {
        long groupId = 77;

        groupService.getGroupById(groupId);

        Mockito.verify(groupRepository).getOne(groupId);
    }

    @Test
    public void checkGetCustomers() {
        long groupId = 7;
        List<Customer> testList = new ArrayList<>();
        CustomerGroup mockGroup = Mockito.mock(CustomerGroup.class);

        Mockito.when(groupRepository.getOne(groupId)).thenReturn(mockGroup);
        Mockito.when(mockGroup.getCustomers()).thenReturn(testList);

        Assertions.assertEquals(testList, groupService.getCustomers(groupId));
    }
}
