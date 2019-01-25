package far.galaxy

import far.galaxy.component.hello
import far.galaxy.component.welcome
import far.galaxy.testFunction
import kotlin.browser.window
import react.*
import react.dom.*
import react.router.dom.browserRouter
import react.router.dom.route
import react.router.dom.switch
import react.router.dom.navLink
import kotlin.browser.document

@JsModule("uuid/v4")
external fun uuid(): String

external val X: String

fun test_v1() {
    val message = "Hello from Kotlin"

    println("UUID -> ${uuid()}")

    println("X -> ${X}")

    val a = 6
    val b = 1
    println("testFunction(${a}, ${b}) -> ${testFunction(a, b)}")

    println(message)
//    window.alert(message)

    window.setTimeout({ println("callback -> ${message}") }, 1000)

    js("var x = 1; console.log('x = ' + x);")
}

fun test_v2() {
    render(document.getElementById("root")) {
        browserRouter {
            switch {
                route("/", exact = true) {
                    div {
                        div {
                            hello("bla bla bla")
                            welcome("R2D2")
                        }
                        navLink(to="/messages") {+"Messages"}
                    }
                }
                route("/messages") {
                    div {
                        navLink(to="/") {+"home"}
                    }
                }
            }
        }
    }
}

fun main(args: Array<String>) {
//    test_v1()
    test_v2()
}
