package far.galaxy.foodcourt.entity.transaction;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderItem, Long> {

};
