import React, {Component} from "react";

export default class OrderFullView extends Component {
    render() {
        const {order} = this.props;

        return (
            <div>
                { `${order.getId()}; ${order.getCustomerId()}; ${order.getCakeId()}; ${order.getCount()}` }
            </div>
        )
    }
}
