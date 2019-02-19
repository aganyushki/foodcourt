import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import ShopGroups from "../shop/ShopGroups";
import ShopCustomers from "../shop/ShopCustomers";
import ShopCakes from "../shop/ShopCakes";
import ShopRootOrderView from "../shop/order/ShopRootOrderView";
import {URL} from '../../URLS';

export default function ShopRootLayout() {
    return (
        <div>
            <Link to="/">root</Link> <br />
            <Link to="/admin">admin</Link> <br />
            <Link to="/login">login</Link> <br />
            <Link to="/shop">shop</Link> <br />

            <div>
                <Switch>
                    <Route exact path={URL.ROOT} component={ShopGroups} />
                    <Route exact path={URL.SHOP} component={ShopGroups} />
                    <Route exact path={URL.SHOP_GROUPS} component={ShopGroups} />
                    <Route path={URL.SHOP_CUSTOMERS} component={ShopCustomers} />
                    <Route path={URL.SHOP_CAKES} component={ShopCakes} />
                    <Route path={URL.SHOP_ORDER} component={ShopRootOrderView} />
                </Switch>
            </div>
        </div>
    )
}
