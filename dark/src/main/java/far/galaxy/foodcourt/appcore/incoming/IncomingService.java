package far.galaxy.foodcourt.appcore.incoming;

import far.galaxy.foodcourt.entity.transaction.Incoming;
import far.galaxy.foodcourt.entity.transaction.IncomingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class IncomingService {

    @Autowired
    private IncomingRepository incomingRepository;

    public Page<Incoming> getIncomingList(int page, int limit) {
        return incomingRepository.findAll(PageRequest.of(page, limit, Sort.by("id").descending()));
    }
}
