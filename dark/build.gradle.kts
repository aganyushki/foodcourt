
plugins {
    java

    id("org.springframework.boot") version "2.1.1.RELEASE"
}

repositories {
    jcenter()
    mavenCentral()
}

dependencies {
    compile(project(":entity"))
    
    compile("mysql:mysql-connector-java:5.1.46")

    compile("org.springframework.boot:spring-boot-starter-web:2.1.1.RELEASE")
    compile("org.springframework.boot:spring-boot-starter-data-jpa:2.1.1.RELEASE")
    compile("org.springframework.boot:spring-boot-starter-thymeleaf:2.1.1.RELEASE")

    testCompile("org.junit.jupiter:junit-jupiter-api:5.1.0")
    testCompile("org.junit.jupiter:junit-jupiter-params:5.1.0")
    testCompile("org.junit.jupiter:junit-jupiter-engine:5.1.0")

    testCompile("org.springframework.boot:spring-boot-starter-test:2.1.1.RELEASE")
    testCompile("org.seleniumhq.selenium:selenium-java:3.141.59")

    testCompile("org.mockito:mockito-core:2.+")
    testCompile("org.mockito:mockito-junit-jupiter:2.18.3")
}

tasks {
    "test"(Test::class) {
        useJUnitPlatform()
    }
}
