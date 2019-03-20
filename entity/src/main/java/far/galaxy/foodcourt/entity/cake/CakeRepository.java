package far.galaxy.foodcourt.entity.cake;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CakeRepository extends JpaRepository<Cake, Long> {
    Cake findByName(String name);
    List<Cake> findAllByName(String name);
    Cake findByNameAndPrice(String name, long price);
    List<Cake> findAllByAvailableTrue();
    Page<Cake> findAllByAvailableTrue(Pageable pageable);
    Page<Cake> findAllByAvailableTrueAndNameLike(Pageable pageable, String name);
}
