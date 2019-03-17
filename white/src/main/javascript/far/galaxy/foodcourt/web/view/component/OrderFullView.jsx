import React, {Component} from "react";

export default class OrderFullView extends Component {
    render() {
        const {order} = this.props;

        return (
            <div>
                { `${order.getId()}; ${order.getCustomer().getName()}; ${order.getCake().getName()}; ${order.getCount()}` }
            </div>
        )
    }
}
