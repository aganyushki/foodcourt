
plugins {
    java
    id("org.flywaydb.flyway") version "5.2.4"
}

repositories {
    jcenter()
    mavenCentral()
}

dependencies {
    compile(project(":db_builder"))
    compile("mysql:mysql-connector-java:5.1.46")
}

var MYSQL_HOST_PORT = if (System.getenv().containsKey("MYSQL_HOST_PORT")) System.getenv("MYSQL_HOST_PORT") else "localhost:3307"
var MYSQL_DB = if (System.getenv().containsKey("MYSQL_DB")) System.getenv("MYSQL_DB") else "food_court"
var MYSQL_USER = if (System.getenv().containsKey("MYSQL_USER")) System.getenv("MYSQL_USER") else "appuser1"
var MYSQL_PASSWORD = if (System.getenv().containsKey("MYSQL_PASSWORD")) System.getenv("MYSQL_PASSWORD") else "secretpwd1"

flyway {
    url = "jdbc:mysql://${MYSQL_HOST_PORT}/${MYSQL_DB}?autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=UTF-8"
    user = MYSQL_USER
    password = MYSQL_PASSWORD
    schemas = listOf("food_court").toTypedArray()
    sqlMigrationSuffixes = listOf(".sql").toTypedArray()
}

task<JavaExec>("buildFakeDatabase") {
    dependsOn(":storage:flywayMigrate")

    classpath = project(":db_builder").sourceSets.get("main").runtimeClasspath

    environment("MYSQL_HOST_PORT", MYSQL_HOST_PORT)
    environment("MYSQL_USER", MYSQL_USER)
    environment("MYSQL_PASSWORD", MYSQL_PASSWORD)
    environment("MYSQL_DB", MYSQL_DB)

    main = "far.galaxy.foodcourt.dbbuilder.dbbuilder.BuildTestDB"
}
