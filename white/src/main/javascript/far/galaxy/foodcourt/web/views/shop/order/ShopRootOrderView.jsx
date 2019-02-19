import React, {Component} from "react";
import {getOrderStore} from "../../../store/OrderStore";
import {observer} from "mobx-react";
import ShopOrderResult from "./ShopOrderResult";
import ShopOrderAmount from "./ShopOrderAmount";
import ShopOrderApprove from "./ShopOrderApprove";

@observer
export default class ShopRootOrderView extends Component {
    render() {
        const order = getOrderStore().order;

        return (
            <div>
                <ShopOrderResult />

                {
                    order.count === 0
                        ? <ShopOrderAmount />
                        : <ShopOrderApprove />
                }
            </div>
        )
    }
}
