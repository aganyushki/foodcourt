package far.galaxy.foodcourt.appcore.order;

import far.galaxy.foodcourt.entity.cake.Cake;
import far.galaxy.foodcourt.entity.cake.CakeRepository;
import far.galaxy.foodcourt.entity.customer.Customer;
import far.galaxy.foodcourt.entity.customer.CustomerRepository;
import far.galaxy.foodcourt.entity.transaction.OrderItem;
import far.galaxy.foodcourt.entity.transaction.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path ="/orders")
public class OrderController {

    @PutMapping()
    public void putNewOrder(
            @RequestParam(name = "customer", required = true) long customerId,
            @RequestParam(name = "cake", required = true) long cakeId,
            @RequestParam(name = "count", required = true) int count
    ) {

    }
}
