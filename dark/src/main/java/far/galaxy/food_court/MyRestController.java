package far.galaxy.food_court;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@RestController
public class MyRestController {

//    @Autowired
//    private CustomerRepository repo;
//
//    @GetMapping("/message")
//    static Data hello(
//            @RequestParam(value = "name", defaultValue = "Unknown") String name,
//            @RequestParam(value = "message", defaultValue = "") String message
//    ) {
//        return repo.save(new Data(name, message));
//    }
//
//    @GetMapping("/values")
//    static List<Data> values() {
//        return (List<Data>) repo.findAll();
//    }
//
//    @GetMapping("/item")
//    static List<Data> datas(
//            @RequestParam(value = "id", defaultValue = "1") Long id
//    ) {
//        return repo.getData(id);
//    }
}
