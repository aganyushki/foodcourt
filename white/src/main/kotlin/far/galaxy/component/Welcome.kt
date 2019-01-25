package far.galaxy.component

import react.*
import react.dom.div
import react.dom.h3
import kotlin.browser.window

interface WelcomeProps: RProps {
    var name: String
}

interface WelcomeState: RState {
    var counter: Long
}

class Welcome: RComponent<WelcomeProps, WelcomeState>() {

    override fun WelcomeState.init() {
        counter = 0
    }

    override fun componentDidMount() {
        window.setInterval({
            setState {
                counter = counter + 1
            }
        }, 1000)
    }

    override fun RBuilder.render() {
        div {
            div {
                +"Hello, ${props.name}"
            }
            h3 {
                +"Counter ${state.counter}"
            }
        }
    }
}

fun RBuilder.welcome(name: String = "John") = child(Welcome::class) {
    attrs.name = name
}
