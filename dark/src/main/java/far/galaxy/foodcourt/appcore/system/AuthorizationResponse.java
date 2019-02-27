package far.galaxy.foodcourt.appcore.system;

import far.galaxy.foodcourt.entity.system.User;

public class AuthorizationResponse {
    private String status;
    private User user;

    public AuthorizationResponse() {
        this("FAIL", null);
    }

    public AuthorizationResponse(User user) {
        this("OK", user);
    }

    public AuthorizationResponse(String status, User user) {
        this.status = status;
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
