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

//    public void updateCake(Long cakeId, String name, Long price) {
//        if (name.length() == 0) {
//            throw new IllegalArgumentException("Incorrect arguments: name is empty");
//        }
//        if (price <= 0) {
//            throw new IllegalArgumentException("Incorrect arguments: price is 0 or less");
//        }
//
//        Cake cake = this.getCakeByIdOrNew(cakeId);
//
//        cake.setName(name);
//        cake.setPrice(price);
//
//        cakeRepository.save(cake);
//    }

//    public Cake getCakeByIdOrNew(Long cakeId) {
//        return cakeId > -1 ? cakeRepository.findById(cakeId).get() : new Cake();
//    }

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
}
