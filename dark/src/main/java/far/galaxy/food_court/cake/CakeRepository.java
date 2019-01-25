package far.galaxy.food_court.cake;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CakeRepository extends CrudRepository<Cake, Long> {

    default List<Cake> getAvailableCakes() {
        return (List<Cake>) this.findAll();
    }
}
