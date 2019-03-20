package far.galaxy.foodcourt.appcore.cake;

import far.galaxy.foodcourt.entity.cake.Cake;
import far.galaxy.foodcourt.entity.cake.CakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class CakeService {

    @Autowired
    private CakeRepository cakeRepository;

    // todo, set available = false for old versions then new version wes created

    public Page<Cake> getAvailableCakes(int page, int limit) {
        return cakeRepository.findAllByAvailableTrue(PageRequest.of(page, limit, Sort.by("name")));
    }

    public Page<Cake> getAvailableCakes(int page, int limit, String search) {
        return cakeRepository.findAllByAvailableTrueAndNameLike(
                PageRequest.of(page, limit, Sort.by("name")),
                '%'+search+'%' // todo, performance?
        );
    }

    public Cake getCakeById(long cakeId) {
        return cakeRepository.getOne(cakeId);
    }

    public Cake storeNewCake(String name, BigDecimal price) {
        if (name == null) throw new NullPointerException("Cake can't have 'null' name");
        if (price.compareTo(BigDecimal.ONE) == -1) throw new IllegalArgumentException("Cake can't have price < 1");
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
