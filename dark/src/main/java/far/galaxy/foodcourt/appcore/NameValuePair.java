package far.galaxy.foodcourt.appcore;

public class NameValuePair {
    private String name;
    private Long value;

    public NameValuePair() {
    }

    public NameValuePair(String name, Long value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public void applyValue(Long value) {
        this.value += value;
    }
}
