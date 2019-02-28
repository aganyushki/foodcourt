import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";

import AdminCustomers from '../admin/AdminCustomers';
import AdminCakes from '../admin/AdminCakes';
import AdminOrders from '../admin/AdminOrders';
import {URL} from '../../URLS';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import AdminCustomersMainToolbarView from "../admin/AdminCustomers/AdminCustomersMainToolbarView";
import AdminCustomersSearchToolbarView from "../admin/AdminCustomers/AdminCustomersSearchToolbarView";
import AdminRootLayoutManu from "./AdminRootLayoutManu";
import AdminCustomersEditorView from "../admin/AdminCustomers/AdminCustomersEditorView";
import {getCustomerStore} from "../../store/CustomerStore";
import {observer} from "mobx-react";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    grow: {
        flexGrow: 1,
    },
    editorContent: {
        padding: 50
    }
});

@observer
class AdminRootLayout extends Component {
    render() {
        const {classes} = this.props;
        const selectedCustomer = getCustomerStore().selectedCustomer;
        const editDrawerIsOpened = (selectedCustomer !== null);
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            WILEY, Korolev
                        </Typography>
                        <Switch>
                            <Route path={URL.ADMIN_CUSTOMERS} component={AdminCustomersSearchToolbarView} />
                        </Switch>
                        <div className={classes.grow} />
                        <Switch>
                            <Route path={URL.ADMIN_CUSTOMERS} component={AdminCustomersMainToolbarView} />
                        </Switch>
                        <Button color="inherit">logout</Button>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <AdminRootLayoutManu />
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <Switch>
                        <Route path={URL.ADMIN_CUSTOMERS} component={AdminCustomers} />
                        <Route path={URL.ADMIN_CAKES} component={AdminCakes} />
                        <Route path={URL.ADMIN_ORDERS} component={AdminOrders} />
                    </Switch>
                </main>

                <Drawer
                    className={classes.drawer}
                    open={editDrawerIsOpened}
                    anchor="right"
                >
                    <div className={classes.editorContent}>
                        <Switch>
                            <Route path={URL.ADMIN_CUSTOMERS} component={AdminCustomersEditorView} />
                        </Switch>
                    </div>
                </Drawer>
            </div>
        )
    }
}

AdminRootLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminRootLayout);
