package far.galaxy.foodcourt.appcore.incoming;

import far.galaxy.foodcourt.entity.transaction.IncomingRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class IncomingServiceTest {
    @Mock
    private IncomingRepository incomingRepository;
    @InjectMocks
    private IncomingService incomingService;

    @Test
    public void getIncomingListTest() {
        final int pageIndex = 1;
        final int limit = 100;
        incomingService.getIncomingList(pageIndex, limit);
        verify(incomingRepository).findAll(PageRequest.of(pageIndex, limit, Sort.by("id").descending()));
    }
}
