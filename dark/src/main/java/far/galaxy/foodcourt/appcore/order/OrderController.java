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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path ="/order")
public class OrderController {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CakeRepository cakeRepository;

    @Autowired
    OrderRepository orderRepository;

    @PostMapping()
    public ModelAndView storeOrder(
            @RequestParam("customerid") long customerId,
            @RequestParam("cakeid") long cakeId,
            @RequestParam(name = "count", defaultValue = "0") int count,
            @RequestParam(name = "approved", defaultValue = "false") boolean approvedFlag
    ) {
        Customer customer = customerRepository.findById(customerId).get(); // todo, how to rewrite it?
        Cake cake = cakeRepository.findById(cakeId).get();
        Map model = new HashMap<>();

        OrderItem order = new OrderItem(customer, cake, count);

        model.put("order", order);

        if (count < 1) {/* throw error */}

        if (count == 0) {
            model.put("countItems", new String[] {"1", "2", "3", "4", "5"});
            return new ModelAndView("chooseCount", model);
        }

        if (!approvedFlag) {
            new ModelAndView("orderConfirmation", model);
        }

        orderRepository.save(order);

        return new ModelAndView("order", model);
    }
}
