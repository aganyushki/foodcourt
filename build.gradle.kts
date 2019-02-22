group = "far.galaxy"
version = "1.0-SNAPSHOT"

plugins {
    java
    id("com.avast.gradle.docker-compose") version "0.8.14"
}

repositories {
    jcenter()
    mavenCentral()
}

dockerCompose {
    useComposeFiles = listOf("docker-compose.yml")
}

tasks.getByPath(":composeUp").dependsOn(
    tasks.getByPath(":dark:jar")
)

task("startDockerDevelopmentEnvironment") {
    dependsOn(
        tasks.getByPath(":composeUp")
    )
}

task("stopDockerDevelopmentEnvironment") {
    dependsOn(
        tasks.getByPath(":composeDown")
    )
}

task("xyz") {
    doLast {
        println(System.getenv().forEach { println(it) })
//        println(System.getProperties().forEach { println(it) })
    }
}