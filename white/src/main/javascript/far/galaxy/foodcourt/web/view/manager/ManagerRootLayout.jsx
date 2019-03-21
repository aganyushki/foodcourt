import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";

import ManagerCakes from './activity/cake/ManagerCakes';
import ManagerOrders from './activity/order/ManagerOrders';
import {URL} from '../../Constants';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import ManagerRootLayoutMenu from "./ManagerRootLayoutMenu";
import {ManagerRootLayoutStyles} from "./Style";
import ManagerRootLayoutToolbar from "./ManagerRootLayoutToolbar";
import ManagerIncoming from "./activity/incoming/ManagerIncoming";
import ManagerCustomers from "./activity/customer/ManagerCustomers";
import GlobalNotificationCtrl from "../component/GlobalNotificationCtrl";

@withRouter
class ManagerRootLayout extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <ManagerRootLayoutToolbar />

                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <ManagerRootLayoutMenu />
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path={URL.ADMIN_CUSTOMERS} component={ManagerCustomers} />
                        <Route path={URL.ADMIN_CAKES} component={ManagerCakes} />
                        <Route path={URL.ADMIN_ORDERS} component={ManagerOrders} />
                        <Route path={URL.ADMIN_INCOMING} component={ManagerIncoming} />
                    </Switch>
                    <GlobalNotificationCtrl />
                </main>
            </div>
        )
    }
}

export default withStyles(ManagerRootLayoutStyles)(ManagerRootLayout);
