package far.galaxy.foodcourt.oldentity.system;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OldBalanceRepository extends CrudRepository<OldBalance, Long> {

    List<OldBalance> findAllByUserName(String userName);
}
