package far.galaxy.foodcourt.oldentity.order;

import far.galaxy.foodcourt.oldentity.cake.Cake;
import far.galaxy.foodcourt.oldentity.cake.CakeRepository;
import far.galaxy.foodcourt.oldentity.customer.Customer;
import far.galaxy.foodcourt.oldentity.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

@Controller
public class OrderController {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CakeRepository cakeRepository;

    @Autowired
    OrderRepository orderRepository;

    @GetMapping("/order")
    public String executeOrder(
            @RequestParam("customerid") Long customeridId,
            @RequestParam("cakeid") Long cakeId,
            @RequestParam("count") Long count,
            Model model
    ) {
        Customer customer = customerRepository.findById(customeridId).get();
        Cake cake = cakeRepository.findById(cakeId).get();

        if (customer == null || cake == null || count < 1) {
            // throw error
        }

        Order order = new Order(
                customer.getName(),
                cake.getName(),
                count,
                cake.getPrice(),
                count * cake.getPrice(),
                new Date()
        );

        orderRepository.save(order);
        model.addAttribute("order", order);

        return "order";
    }

    @GetMapping("/order/confirmation")
    public String orderConfirmationPage(
            @RequestParam("customerid") Long customeridId,
            @RequestParam("cakeid") Long cakeId,
            @RequestParam(name = "count", defaultValue = "0") Long count,
            Model model
    ) {

        Customer customer = customerRepository.findById(customeridId).get();
        Cake cake = cakeRepository.findById(cakeId).get();

        if (customer == null || cake == null) {
            // throw error
        }

        model.addAttribute("customer", customer);
        model.addAttribute("cake", cake);

        if (count == 0) {
            model.addAttribute(
                    "listItems",
                    new String[] {"1", "2", "3", "4", "5"}
                );
            return "chooseCount";
        }

        model.addAttribute("count", count);

        return "orderConfirmation";
    }
}
