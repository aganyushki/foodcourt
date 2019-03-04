package far.galaxy.foodcourt.appcore.cake;

import far.galaxy.foodcourt.entity.cake.Cake;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/cakes")
public class CakeController {

    @Autowired
    CakeService cakeService;

    @GetMapping(
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Page<Cake> getAvailableCakeList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "100") int limit
    ) {
        return cakeService.getAvailableCakes(page, limit);
    }

    @GetMapping(
            value = "/{cakeId}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public Cake getCakeById(@PathVariable long cakeId) {
        return cakeService.getCakeById(cakeId);
    }

    @PutMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @ResponseBody
    public Cake newCake(@RequestBody Cake data) {
        return cakeService.storeNewCake(data.getName(), data.getPrice());
    }

    @PostMapping(
            value = "/{customerId}",
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @ResponseBody
    public Cake updateCake(
            @PathVariable long customerId,
            @RequestBody Cake data
    ) {
        return cakeService.updateCake(customerId, data.getName());
    }

    @DeleteMapping(
            value = "/{cakeId}"
    )
    public void removeCake(@PathVariable long cakeId) {
        cakeService.removeCake(cakeId);
    }
}
