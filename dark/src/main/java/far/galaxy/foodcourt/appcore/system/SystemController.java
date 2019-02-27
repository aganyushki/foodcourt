package far.galaxy.foodcourt.appcore.system;

import far.galaxy.foodcourt.entity.system.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path ="/system")
public class SystemController {

    @GetMapping(
            value = "/check/admin",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public AuthorizationResponse checkIsAdmin(@AuthenticationPrincipal SecurityUserPrincipal userPrincipal) {
        return new AuthorizationResponse(userPrincipal.getUser());
    }

    @PostMapping(
            value = "/auth/ok",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public AuthorizationResponse getOkAuthResponse(@AuthenticationPrincipal SecurityUserPrincipal userPrincipal) {
        return new AuthorizationResponse(userPrincipal.getUser());
    }

    @PostMapping(
            value = "/auth/fail",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public AuthorizationResponse getFailAuthResponse(@AuthenticationPrincipal SecurityUserPrincipal userPrincipal) {
        return new AuthorizationResponse();
    }
}
