package far.galaxy.foodcourt.entity;

import java.util.Arrays;
import java.util.TreeSet;

public class Constants {
    public static final String STAFF_GROUP = "Персонал";
    public static final TreeSet<String> GROUPS = new TreeSet<>(
            Arrays.asList("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                    "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z", STAFF_GROUP)
    );
}
