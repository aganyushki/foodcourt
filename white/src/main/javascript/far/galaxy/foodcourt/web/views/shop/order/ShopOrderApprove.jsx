import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../../store/OrderStore";

@observer
export default class ShopOrderApprove extends Component {

    approve() {
        getOrderStore().putOrder()
    }

    reject() {
        getOrderStore().cleanupOrder()
    }

    render() {
        return (
            <div>
                <button onClick={this.approve.bind(this)}>OK?</button>
                <button onClick={this.reject.bind(this)}>no</button>
            </div>
        )
    }
}
