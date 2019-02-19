import React from "react";
import {Route, HashRouter as Router, Switch} from "react-router-dom";

import ShopRootLayout from './layout/ShopRootLayout';
import AdminRootLayout from './layout/AdminRootLayout';
import LoginRootLayout from './layout/LoginRootLayout';
import MobXRouterIntegrationComponent from "./MobXRouterIntegrationComponent";

export function RootUIComponent() {
    return (
        <Router>
            <div>
                <Route path={"/shop"} component={MobXRouterIntegrationComponent} />
                <Switch>
                    <Route exact path={"/"} component={ShopRootLayout} />
                    <Route path={"/shop"} component={ShopRootLayout} />
                    <Route path={"/admin"} component={AdminRootLayout} />
                    <Route path={"/login"} component={LoginRootLayout} />
                </Switch>
            </div>
        </Router>
    )
}
