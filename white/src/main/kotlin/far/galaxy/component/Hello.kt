package far.galaxy.component

import react.RBuilder
import react.dom.h1

fun RBuilder.hello(msg: String) {
    h1 {
        +"#> Message: ${msg}"
    }
}
