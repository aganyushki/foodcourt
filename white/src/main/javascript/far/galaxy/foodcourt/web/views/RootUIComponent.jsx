import React, {Component} from "react";
import {Route, HashRouter as Router, Switch, Redirect} from "react-router-dom";

import ShopRootLayout from './layout/ShopRootLayout';
import AdminRootLayout from './layout/AdminRootLayout';
import LoginRootLayout from './layout/LoginRootLayout';
import MobXRouterIntegrationComponent from "./MobXRouterIntegrationComponent";
import {getSystemStore} from "../store/SystemStore";
import {observer} from "mobx-react";
import {URL} from '../URLS';

@observer
export class RootUIComponent extends Component {
    render() {
        const user = getSystemStore().user;
        return (
            <Router>
                <div>
                    <Route path={URL.SHOP} component={MobXRouterIntegrationComponent} />
                    <Switch>
                        <Route exact path={URL.ROOT}>
                            <Redirect to={URL.SHOP} />
                        </Route>
                        <Route path={URL.SHOP} component={ShopRootLayout} />
                        <Route path={URL.ADMIN}>{
                            user
                                ? <AdminRootLayout />
                                : <LoginRootLayout />
                        }</Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
