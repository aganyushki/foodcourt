import org.jetbrains.kotlin.gradle.frontend.webpack.WebPackExtension
import org.jetbrains.kotlin.gradle.tasks.Kotlin2JsCompile

plugins {
    id("kotlin2js") version "1.3.11"
    id("org.jetbrains.kotlin.frontend") version "0.0.44"
//    id("kotlin2js") version "1.3.10"
//    id("org.jetbrains.kotlin.frontend") version "0.0.37"
}

repositories {
    jcenter()
    mavenCentral()
    maven {
        url = uri("https://dl.bintray.com/kotlin/kotlin-js-wrappers")
    }
}

dependencies {
    compile(kotlin("stdlib-js"))
    compile(kotlin("test-js"))

    compile("org.jetbrains:kotlin-react:16.6.0-pre.62-kotlin-1.3.0")
    compile("org.jetbrains:kotlin-react-dom:16.6.0-pre.62-kotlin-1.3.0")
    compile("org.jetbrains:kotlin-react-router-dom:4.3.1-pre.62-kotlin-1.3.0")
}

kotlinFrontend {

    println(sourceSets.asIterable())

    downloadNodeJsVersion = "latest"
    sourceMaps = true

    npm {
        dependency("uuid", "3.3.2")

        dependency("react", "16.6.3")
        dependency("react-dom", "16.6.3")
        dependency("react-router-dom", "4.3.1")
        dependency("html-webpack-plugin", "3.2.0")

        dependency("karma-chrome-launcher")
    }

    define("X", "\"x_entry\"")

    bundle("webpack", delegateClosureOf<WebPackExtension> {
        bundleName = "index"
//        publicPath = "/"
        sourceMapEnabled = false
        contentPath = file("$buildDir/bundle")
        mode = "development"

        host = "localhost"
        port = 8088
//        proxyUrl = "" | "http://...."
//        stats = "errors-only"
//        webpackConfigFile = project.projectDir.path + "/webpack.config.js"
    })

    karma {
        enableWebPack = true
        browsers = listOf("Chrome").toMutableList()
        frameworks = listOf("mocha").toMutableList()
        plugins = listOf("karma-chrome-launcher").toMutableList()
        sourceMaps = false
    }
}

tasks {
    "compileKotlin2Js"(Kotlin2JsCompile::class) {
        kotlinOptions {
            moduleKind = "commonjs"
            metaInfo = true
            sourceMap = false
//            sourceMapEmbedSources = "always"
//            outputFile = "build/classes/kotlin/main/index.js"
//            main = "noCall"
            main = "call"
        }
    }
    "compileTestKotlin2Js"(Kotlin2JsCompile::class) {
        kotlinOptions {
            moduleKind = "commonjs"
            metaInfo = true
            sourceMap = false
        }
    }
}
