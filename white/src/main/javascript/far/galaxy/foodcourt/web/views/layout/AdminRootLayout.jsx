import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";

import AdminCustomers from '../admin/AdminCustomers';
import AdminCakes from '../admin/AdminCakes';
import AdminOrders from '../admin/AdminOrders';
import {URL} from '../../URLS';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CakeIcon from '@material-ui/icons/Cake';
import PeopleIcon from '@material-ui/icons/People';
import TocIcon from '@material-ui/icons/Toc';
import Drawer from "@material-ui/core/Drawer";
import ListItemText from "@material-ui/core/ListItemText";
import {getSystemStore} from "../../store/SystemStore";

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
});

class AdminRootLayout extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            WILEY, Korolev
                        </Typography>
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
                    <List>
                        <ListItem button component={Link} to={URL.ADMIN_ORDERS}>
                            <ListItemIcon><TocIcon /></ListItemIcon>
                            <ListItemText primary="Orders" />
                        </ListItem>
                        <ListItem button component={Link} to={URL.ADMIN_CAKES}>
                            <ListItemIcon><CakeIcon /></ListItemIcon>
                            <ListItemText primary="Cakes" />
                        </ListItem>
                        <ListItem button component={Link} to={URL.ADMIN_CUSTOMERS}>
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            <ListItemText primary="Customers" />
                        </ListItem>
                    </List>
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <Switch>
                        <Route path={URL.ADMIN_CUSTOMERS} component={AdminCustomers} />
                        <Route path={URL.ADMIN_CAKES} component={AdminCakes} />
                        <Route path={URL.ADMIN_ORDERS} component={AdminOrders} />
                    </Switch>
                </main>
            </div>
        )
    }
}

AdminRootLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminRootLayout);
