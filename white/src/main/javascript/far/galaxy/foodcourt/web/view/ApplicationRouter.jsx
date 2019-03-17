import React, {Component} from "react";
import {Route, HashRouter as Router, Switch, Redirect} from "react-router-dom";

import ShopRootLayout from './shop/ShopRootLayout';
import ManagerRootLayout from './manager/ManagerRootLayout';
import LoginRootLayout from './auth/LoginRootLayout';
import {inject, observer} from "mobx-react";
import {URL} from '../Constants';
import DevTools from 'mobx-react-devtools';
import PropTypes from 'prop-types';

const DEBUG = true;

@inject("systemStore")
@observer
export class ApplicationRouter extends Component {
    static propTypes = {
        systemStore: PropTypes.object.isRequired
    };

    render() {
        const {systemStore} = this.props;
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path={URL.ROOT}>
                            <Redirect to={URL.SHOP} />
                        </Route>
                        <Route path={URL.SHOP} component={ShopRootLayout} />
                        <Route path={URL.ADMIN}>{
                            systemStore.user
                                ? <ManagerRootLayout />
                                : <LoginRootLayout />
                        }</Route>
                    </Switch>

                    {
                        DEBUG ? <DevTools position="bottomLeft" /> : null
                    }
                </div>
            </Router>
        )
    }
}
