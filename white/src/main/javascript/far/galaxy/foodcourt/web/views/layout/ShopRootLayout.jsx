import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import ShopGroups from "../shop/ShopGroups";
import ShopCustomers from "../shop/ShopCustomers";
import ShopCakes from "../shop/ShopCakes";
import ShopRootOrderView from "../shop/order/ShopRootOrderView";
import {URL} from '../../URLS';
import ShopOrderStepper from "../shop/ShopOrderStepper";
import {getOrderStore} from "../../store/OrderStore";

export default class ShopRootLayout extends Component {
    closeOrder() {
        getOrderStore().cleanupOrder();
    }
    render() {
        return (
            <div>
                <ShopOrderStepper/>

                <Switch>
                    <Route exact path={URL.SHOP} component={ShopGroups}/>
                    <Route exact path={URL.SHOP_GROUPS} component={ShopGroups}/>
                    <Route path={URL.SHOP_CUSTOMERS} component={ShopCustomers}/>
                    <Route path={URL.SHOP_CAKES} component={ShopCakes}/>
                    <Route path={URL.SHOP_ORDER} component={ShopRootOrderView}/>
                </Switch>

                <button onClick={this.closeOrder.bind(this)}>back to home</button>
            </div>
        )
    }
}
