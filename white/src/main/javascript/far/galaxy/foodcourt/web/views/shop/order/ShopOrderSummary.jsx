import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../../store/OrderStore";

@observer
export default class ShopOrderSummary extends Component {
    render() {
        const order = getOrderStore().order;
        return (
            <div>
                {
                    order.customer
                        ? <div>{order.customer.getName()}</div>
                        : null
                }
                {
                    order.cake
                        ? <div>{order.cake.getName()}</div>
                        : null
                }
                {
                    order.cake
                        ? <div>{order.cake.getPrice()}</div>
                        : null
                }
                {
                    order.count > 0
                        ? <div>count: {order.count}</div>
                        : null
                }
            </div>
        )
    }
}
