import React, {Component} from "react";
import {Provider} from "mobx-react";
import SystemStore from "./SystemStore";
import CustomerStore from "./CustomerStore";
import OrderStore from "./OrderStore";
import CakeStore from "./CakeStore";
import ShopviewWorkflow from "./ShopviewWorkflow";

export class StoreProvider extends Component {
    render() {
        const scope = {};
        scope.customerStore = new CustomerStore(scope);
        scope.systemStore = new SystemStore(scope);
        scope.orderStore = new OrderStore(scope);
        scope.cakeStore = new CakeStore(scope);
        scope.shopviewWorkflow = new ShopviewWorkflow(scope);
        return (
            <Provider {...scope} >
                {this.props.children}
            </Provider>
        )
    }
}
