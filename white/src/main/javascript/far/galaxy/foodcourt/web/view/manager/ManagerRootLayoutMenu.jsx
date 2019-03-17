import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";

import {URL} from '../../Constants';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CakeIcon from '@material-ui/icons/Cake';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketRounded from '@material-ui/icons/ShoppingBasketRounded';
import AttachMoney from '@material-ui/icons/AttachMoney';
import ListItemText from "@material-ui/core/ListItemText";
import {withRouter} from 'react-router-dom';

class ManagerRootLayoutMenu extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const {location} = this.props;
        return (
            <List>
                <ListItem button component={Link} to={URL.ADMIN_ORDERS} selected={location.pathname === URL.ADMIN_ORDERS}>
                    <ListItemIcon><ShoppingBasketRounded /></ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItem>
                <ListItem button component={Link} to={URL.ADMIN_INCOMING} selected={location.pathname === URL.ADMIN_INCOMING}>
                    <ListItemIcon><AttachMoney /></ListItemIcon>
                    <ListItemText primary="Incoming" />
                </ListItem>
                <ListItem button component={Link} to={URL.ADMIN_CAKES} selected={location.pathname === URL.ADMIN_CAKES}>
                    <ListItemIcon><CakeIcon /></ListItemIcon>
                    <ListItemText primary="Cakes" />
                </ListItem>
                <ListItem button component={Link} to={URL.ADMIN_CUSTOMERS} selected={location.pathname === URL.ADMIN_CUSTOMERS}>
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Customers" />
                </ListItem>
            </List>
        )
    }
}

export default withRouter(ManagerRootLayoutMenu);
