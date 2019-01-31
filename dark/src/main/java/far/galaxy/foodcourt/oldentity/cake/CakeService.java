package far.galaxy.foodcourt.oldentity.cake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CakeService {

    @Autowired
    private CakeRepository repo;

    public void updateCake(Long cakeId, String name, Long price) {
        if (name.length() == 0) {
            throw new IllegalArgumentException("Incorrect arguments: name is empty");
        }
        if (price <= 0) {
            throw new IllegalArgumentException("Incorrect arguments: price is 0 or less");
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
        return repo.getAvailableCakes().stream()
                .sorted((a, b) -> a.getId().compareTo(b.getId()))
                .collect(Collectors.toList());
    }
}
