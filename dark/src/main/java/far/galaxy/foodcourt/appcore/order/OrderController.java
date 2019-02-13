package far.galaxy.foodcourt.appcore.order;

import far.galaxy.foodcourt.entity.transaction.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path ="/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PutMapping()
    public OrderItem putNewOrder(
            @RequestParam(name = "customer", required = true) long customerId,
            @RequestParam(name = "cake", required = true) long cakeId,
            @RequestParam(name = "count", required = true) int count
    ) {
        return orderService.putNewOrder(customerId, cakeId, count);
    }
}
