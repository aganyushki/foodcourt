import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";

import AdminCustomers from '../admin/AdminCustomers';
import AdminCakes from '../admin/AdminCakes';
import AdminOrders from '../admin/AdminOrders';
import {URL} from '../../URLS';

export default class AdminRootLayout extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to={URL.ADMIN_CUSTOMERS}>customers</Link> <br />
                    <Link to={URL.ADMIN_CAKES}>cakes</Link> <br />
                    <Link to={URL.ADMIN_ORDERS}>orders</Link>
                </div>

                <div>
                    <Switch>
                        <Route path={URL.ADMIN_CUSTOMERS} component={AdminCustomers} />
                        <Route path={URL.ADMIN_CAKES} component={AdminCakes} />
                        <Route path={URL.ADMIN_ORDERS} component={AdminOrders} />
                    </Switch>
                </div>
            </div>
        )
    }
}
