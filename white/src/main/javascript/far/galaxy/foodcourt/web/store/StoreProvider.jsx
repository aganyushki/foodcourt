import React, {Component} from "react";
import {Provider} from "mobx-react";
import PropTypes from "prop-types";
import SystemStore from "./SystemStore";
import ShopviewWorkflow from "./ShopviewWorkflow";
import CustomerStoreManager from "./CustomerStoreManager";
import OrderStoreManager from "./OrderStoreManager";
import CakeStoreManager from "./CakeStoreManager";
import IncomingStoreManager from "./IncomingStoreManager";
import CustomerStoreShop from "./CustomerStoreShop";
import OrderStoreShop from "./OrderStoreShop";
import CakeStoreShop from "./CakeStoreShop";

export const STORE_SCOPE = {
    SHOP: 'shop',
    MANAGER: 'manager',
};

export class StoreProvider extends Component {
    static propTypes = {
        scope: PropTypes.oneOf([STORE_SCOPE.SHOP, STORE_SCOPE.MANAGER]),
        children: PropTypes.any
    };

    scopeType = null;
    scope = null;

    // todo, need to investigate and rewrite this algorithm. router & provider to support both shop and admin ui's.

    buildScope(props) {
        const scope = {};
        scope.systemStore = new SystemStore(scope);

        if (props.scope === STORE_SCOPE.SHOP) {
            scope.customerStore = new CustomerStoreShop(scope);
            scope.orderStore = new OrderStoreShop(scope);
            scope.cakeStore = new CakeStoreShop(scope);
            scope.shopviewWorkflow = new ShopviewWorkflow(scope);
        } else if (props.scope === STORE_SCOPE.MANAGER) {
            scope.customerStore = new CustomerStoreManager(scope);
            scope.orderStore = new OrderStoreManager(scope);
            scope.cakeStore = new CakeStoreManager(scope);
            scope.incomingStore = new IncomingStoreManager(scope);
        }
        return scope;
    }

    render() {
        if (this.scope === null || this.scopeType !== this.props.scope) {
            this.scopeType = this.props.scope;
            this.scope = this.buildScope(this.props);
        }
        return (
            <Provider {...this.scope}>
                {this.props.children}
            </Provider>
        )
    }
}
