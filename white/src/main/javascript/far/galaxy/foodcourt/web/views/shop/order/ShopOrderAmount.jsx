import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../../store/OrderStore";

@observer
export default class ShopOrderAmount extends Component {

    doSelect(count) {
        getOrderStore().setCount(count);
    }

    render() {
        const order = getOrderStore().order;
        const maxCount = order.cake && order.cake.getMaxCount();

        let btns = [];
        for (let count = 1; count <= maxCount; count++) {
            btns.push(<div key={count} onClick={this.doSelect.bind(this, count)}>count: {count}</div>)
        }
        return (
            <div>{
                btns
            }</div>
        )
    }
}