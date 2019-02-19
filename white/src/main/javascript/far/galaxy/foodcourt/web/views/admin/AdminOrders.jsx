import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../store/OrderStore";
import OrderFullView from "../component/OrderFullView";

@observer
export default class AdminOrders extends Component {

    componentDidMount() {
        getOrderStore().getOrders();
    }

    render() {

        const orders = getOrderStore().orders;

        return (
            <div>

                {
                    orders === null
                        ? <i>processing</i>
                        : orders.map(order => <OrderFullView key={order.getId()} order={order} />)
                }

            </div>
        )
    }
}
