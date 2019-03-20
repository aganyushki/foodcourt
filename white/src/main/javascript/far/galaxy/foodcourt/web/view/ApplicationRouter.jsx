import React, {Component} from "react";
import {Route, HashRouter as Router, Switch, Redirect, withRouter} from "react-router-dom";

import ShopRootLayout from './shop/ShopRootLayout';
import ManagerRootLayout from './manager/ManagerRootLayout';
import LoginRootLayout from './auth/LoginRootLayout';
import {URL} from '../Constants';
import DevTools from 'mobx-react-devtools';
import {STORE_SCOPE, StoreProvider} from "../store/StoreProvider";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";

@inject("systemStore")
@withRouter
@observer
class ManagerRootRouterComponent extends Component {
    static propTypes = {
        systemStore: PropTypes.object.isRequired,
    };

    render() {
        return this.props.systemStore.user
            ? <ManagerRootLayout />
            : <LoginRootLayout />
    }
}

export class ApplicationRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path={URL.ROOT}>
                            <Redirect to={URL.SHOP} />
                        </Route>
                        <Route path={URL.SHOP}>
                            <StoreProvider scope={STORE_SCOPE.SHOP}>
                                <ShopRootLayout />
                            </StoreProvider>
                        </Route>
                        <Route path={URL.ADMIN}>
                            <StoreProvider scope={STORE_SCOPE.MANAGER}>
                                <ManagerRootRouterComponent />
                            </StoreProvider>
                        </Route>
                    </Switch>
                    {
                        DEBUG ? <DevTools position="bottomLeft" /> : null
                    }
                </div>
            </Router>
        )
    }
}
