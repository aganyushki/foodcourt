package far.galaxy.foodcourt.oldentity.cake;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OldCakeRepository extends CrudRepository<OldCake, Long> {

    default List<OldCake> getAvailableCakes() {
        return (List<OldCake>) this.findAll();
    }
}
