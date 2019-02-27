package far.galaxy.foodcourt.oldentity.order;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface OldOrderRepository extends CrudRepository<OldOrder, Long>{

    @Query("FROM OldOrder WHERE bulkName = :bulkName AND price = :price")
    List<OldOrder> findAllByBulkNameAndPrice(@Param("bulkName") String cakeName, @Param("price") long price);

    @Query("FROM OldOrder WHERE bulkName = :bulkName GROUP BY price")
    List<OldOrder> findAllByBulkNameGroupByPrice(@Param("bulkName") String cakeName);

    List<OldOrder> findAllByUserName(String userName);
    List<OldOrder> findAllByBulkName(String bulkName);
};
