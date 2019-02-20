package far.galaxy.foodcourt.appcore.order;

import far.galaxy.foodcourt.entity.transaction.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path ="/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping(
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<OrderItem> getOrderList() {
        return orderService.getOrderList();
    }

    @GetMapping(
            value = "/{orderId}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OrderItem getOrderById(@PathVariable long orderId) {
        return orderService.getOrderById(orderId);
    }

    @PutMapping(
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OrderItem putNewOrder(
            @RequestBody OrderRequest data
    ) {
        return orderService.putNewOrder(data.getCustomer(), data.getCake(), data.getCount());
    }
}
