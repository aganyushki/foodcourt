import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../../store/OrderStore";

@observer
export default class ShopOrderResult extends Component {
    render() {
        const order = getOrderStore().order;
        return (
            <div>
                <div>{order.customer.getName()}</div>
                <div>{order.cake.getName()}</div>
                <div>{order.cake.getPrice()}</div>
                {
                    order.count > 0
                        ? <div>count: {order.count}</div>
                        : null
                }
            </div>
        )
    }
}