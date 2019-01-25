package far.galaxy.food_court.cake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CakeService {

    @Autowired
    private CakeRepository repo;

    public void updateCake(Long cakeId, String name, Long price) {
        if (cakeId < 0 || name.length() == 0 || price <= 0) {
            throw new IllegalArgumentException("Incorrect arguments");
        }

        Cake cake = this.getCakeByIdOrNew(cakeId);

        cake.setName(name);
        cake.setPrice(price);

        repo.save(cake);
    }

    public Cake getCakeByIdOrNew(Long cakeId) {
        return cakeId > -1 ? repo.findById(cakeId).get() : new Cake();
    }

    public List<Cake> getAvailableCakes() {
        return repo.getAvailableCakes();
    }
}
