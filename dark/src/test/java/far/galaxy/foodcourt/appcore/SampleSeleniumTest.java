package far.galaxy.foodcourt.appcore;

import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Disabled
public class SampleSeleniumTest {

    private ChromeDriver driver;

    @BeforeEach
    public void before() {
        System.setProperty("webdriver.chrome.driver",
                this.getClass().getClassLoader().getResource("chromedriver.exe").getPath());
        driver = new ChromeDriver();
    }

    @AfterEach
    public void after() {
        driver.quit();
    }

    @Test
    public void testProd() throws InterruptedException {
        driver.get("https://www.google.com/");

        WebElement input = driver.findElement(By.cssSelector("div.tiny-search input"));
        input.sendKeys("math");

        WebElement btn = driver.findElement(By.cssSelector("div.tiny-search div.tiny-search-btn"));
        btn.click();

        Thread.sleep(5000);

        assertEquals(25, driver.findElements(By.cssSelector("div.list-data div.entry")).size());
    }

    @Test
    public void testDev() throws InterruptedException {
        driver.get("https://www.google.com/");

        WebElement input = driver.findElement(By.cssSelector("div.tiny-search input"));
        input.sendKeys("math");

        WebElement btn = driver.findElement(By.cssSelector("div.tiny-search div.tiny-search-btn"));
        btn.click();

        Thread.sleep(4000);

        assertEquals(1, driver.findElements(By.cssSelector("div.list-data div.entry")).size());
    }
}
