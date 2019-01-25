package far.galaxy.food_court.system;

import far.galaxy.food_court.NameValuePair;
import org.springframework.data.repository.CrudRepository;

import java.util.*;
import java.util.stream.Collectors;

public interface BalanceRepository extends CrudRepository<Balance, Long> {

//    @Query(
//            value = "SELECT *, sum(incoming_transaction) sum_value FROM balans GROUP BY user_name;",
//            nativeQuery = true
//    )
//    List<BalanceWithSum> pullBalanceList();
//
// : Unknown column 'balance0_.sum_value' in 'field list'

    // so shitty
    default List<NameValuePair> buildBalanceList(Iterable<Balance> records) {
        Map<String, NameValuePair> accum = new HashMap<>();

        records.forEach(balance -> {
            if (accum.containsKey(balance.getUserName())) {
                accum.get(balance.getUserName())
                        .applyValue(balance.getIncomingTransaction());
            } else {
                accum.put(
                        balance.getUserName(),
                        new NameValuePair(balance.getUserName(), balance.getIncomingTransaction())
                );
            }
        });

        return accum.values().stream()
                .sorted((e1, e2) -> e1.getName().compareTo(e2.getName()))
                .collect(Collectors.toList());
    }

    default List<NameValuePair> pullReport() {
        return buildBalanceList(this.findAll());
    }
}
