package far.galaxy.food_court.system;

import far.galaxy.food_court.order.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@Controller
public class RootController {

    Logger log = LoggerFactory.getLogger(RootController.class);

    @Autowired
    BalanceRepository balanceRepo;

    @Autowired
    OrderRepository orderRepository;

    @GetMapping("/")
    public RedirectView greetingPage() {
        return new RedirectView("/customer/groups");
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "adminPage";
    }

    @GetMapping("/admin/balance")
    public String adminUserListPage(
            @RequestParam(name = "customername", required = false) String userName,
            Model model
    ) {
        model.addAttribute("balanceList", balanceRepo.pullReport());
        model.addAttribute("userName", userName);
        return "adminBalancePage";
    }

    @PostMapping("/admin/balance")
    public RedirectView saveIncomingTransaction(
            @RequestParam(name = "customername") String userName,
            @RequestParam(name = "sum") Long sum,
            Model model
    ) {
        if (userName.length() > 0 && sum > 0) {
            balanceRepo.save(new Balance(userName, sum));
        }

        return new RedirectView("/admin/balance");
    }

    @GetMapping("/admin/totalcount")
    public String adminTotalCountPage(
            Model model
    ) {
        return "adminTotalCount";
    }

    @PostMapping("/admin/totalcount")
    public String computeTotalCountResults(
            @RequestParam(name = "startdate") String startDate,
            @RequestParam(name = "enddate") String endDate,
            Model model
    ) throws ParseException
    {
        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm");

        model.addAttribute("balanceList",
                orderRepository.pullReportByDateRange(
                        formatter.parse(startDate),
                        formatter.parse(endDate)
                )
        );
        return "adminTotalCountList";
    }
}
