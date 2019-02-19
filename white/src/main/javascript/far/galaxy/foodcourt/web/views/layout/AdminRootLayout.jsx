import React from "react";
import {Link, Route, Switch} from "react-router-dom";

import AdminCustomers from '../admin/AdminCustomers';
import AdminCakes from '../admin/AdminCakes';
import AdminOrders from '../admin/AdminOrders';

export default function AdminRootLayout(props) {
    return (
        <div>
            <div>
                <Link to="/admin/customers">customers</Link> <br />
                <Link to="/admin/cakes">cakes</Link> <br />
                <Link to="/admin/orders">orders</Link>
            </div>

            <div>
                <Switch>
                    <Route path={"/admin/customers"} component={AdminCustomers} />
                    <Route path={"/admin/cakes"} component={AdminCakes} />
                    <Route path={"/admin/orders"} component={AdminOrders} />
                </Switch>
            </div>
        </div>
    )
}
