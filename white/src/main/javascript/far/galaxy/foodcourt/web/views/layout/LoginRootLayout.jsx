import React, {Component} from "react";
import {getSystemStore} from "../../store/SystemStore";
import {observer} from "mobx-react";

@observer
export default class LoginRootLayout extends Component {

    constructor(props) {
        super(props);

        this.loginRef = React.createRef();
        this.pwdRef = React.createRef();
    }

    doLogin() {
        getSystemStore().doLogin(
            this.loginRef.current.value,
            this.pwdRef.current.value
        )
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" ref={this.loginRef} />
                </div>
                <div>
                    <input type="password" ref={this.pwdRef} />
                </div>
                <div>
                    <button onClick={this.doLogin.bind(this)}>do login</button>
                </div>
            </div>
        )
    }
}
