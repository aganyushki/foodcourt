package far.galaxy.foodcourt.appcore.incoming;

import far.galaxy.foodcourt.entity.transaction.Incoming;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path ="/api/incoming")
public class IncomingController {

    @Autowired
    private IncomingService incomingService;

    @GetMapping(
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Page<Incoming> getIncomingList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "100") int limit
    ) {
        return incomingService.getIncomingList(page, limit);
    }
}
