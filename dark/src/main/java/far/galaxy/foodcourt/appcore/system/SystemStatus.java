package far.galaxy.foodcourt.appcore.system;

import java.util.Date;

public class SystemStatus {
    private String checkpoint = new Date().toString();

    public SystemStatus() {
    }

    public String getCheckpoint() {
        return checkpoint;
    }

    public void setCheckpoint(String checkpoint) {
        this.checkpoint = checkpoint;
    }
}
