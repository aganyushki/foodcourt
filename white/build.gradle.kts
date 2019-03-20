
plugins {
    id("com.moowork.node") version "1.2.0"
}

repositories {
    jcenter()
    mavenCentral()
}

dependencies {

}

node {
}

task("build") {
    dependsOn("npmInstall", "npm_run-script_build");
}

tasks.register<Delete>("clean") {
    delete(buildDir)
//    delete("node_modules")
}
