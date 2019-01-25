package far.galaxy.food_court.order;

import far.galaxy.food_court.NameValuePair;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.*;
import java.util.stream.Collectors;

public interface OrderRepository extends CrudRepository<Order, Long>{

    @Query(value = "SELECT * FROM sales1 s WHERE s.time>=:startDate and s.time<=:endDate", nativeQuery = true)
    public List<Order> findAllByDateRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    // so shitty
    default List<NameValuePair> pullReportByDateRange(Date startDate, Date endDate) {
        return this.buildNameValuePairs(this.findAllByDateRange(startDate, endDate));
    }

    default List<NameValuePair> buildNameValuePairs(Collection<Order> records) {
        Map<String, NameValuePair> accum = new HashMap<>();

        records.forEach(record -> {
            if (accum.containsKey(record.getUserName())) {
                accum.get(record.getUserName())
                        .applyValue(record.getTransactionSum());
            } else {
                accum.put(
                        record.getUserName(),
                        new NameValuePair(record.getUserName(), record.getTransactionSum())
                );
            }
        });

        return accum.values().stream()
                .sorted((e1, e2) -> e1.getName().compareTo(e2.getName()))
                .collect(Collectors.toList());
    }
};
