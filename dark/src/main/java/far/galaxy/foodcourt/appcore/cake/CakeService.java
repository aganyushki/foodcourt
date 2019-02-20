package far.galaxy.foodcourt.appcore.cake;

import far.galaxy.foodcourt.entity.cake.Cake;
import far.galaxy.foodcourt.entity.cake.CakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CakeService {

    @Autowired
    private CakeRepository cakeRepository;

    // todo, set available = false for old versions then new version wes created

    public List<Cake> getAvailableCakes() {
        return cakeRepository.findAllByAvailableTrue()
                .stream()
                .sorted((a, b) ->
                        a.getId() > b.getId() ? 1 : (
                                a.getId() < b.getId() ? -1 : 0
                        )
                )
                .collect(Collectors.toList());
    }

    public Cake getCakeById(long cakeId) {
        return cakeRepository.getOne(cakeId);
    }

    public Cake storeNewCake(String name, long price) {
        return cakeRepository.save(new Cake(name, price));
    }

    public Cake updateCake(long id, String name) {
        Cake cake = cakeRepository.getOne(id);
        if (name != null) {
            cake.setName(name);
        }
        // todo, price update MUST handled with new item creation, new version
//        if (price > 0) { // todo, may be object will be better
//            cake.setPrice(price);
//        }
        return cakeRepository.save(cake);
    }

    public void removeCake(long id) {
        cakeRepository.deleteById(id);
    }
}
