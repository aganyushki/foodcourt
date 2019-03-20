import React, {Component} from "react";
import {Link} from "react-router-dom";

import {URL} from '../../Constants';
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CakeIcon from '@material-ui/icons/Cake';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketRounded from '@material-ui/icons/ShoppingBasketRounded';
import AttachMoney from '@material-ui/icons/AttachMoney';
import ListItemText from "@material-ui/core/ListItemText";
import {withRouter} from 'react-router-dom';
import Text from "../component/Text";

@withRouter
export default class ManagerRootLayoutMenu extends Component {
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
                    <ListItemText primary={<Text>MANAGER_MENU_TITLE_ORDERS</Text>} />
                </ListItem>
                <ListItem button component={Link} to={URL.ADMIN_INCOMING} selected={location.pathname === URL.ADMIN_INCOMING}>
                    <ListItemIcon><AttachMoney /></ListItemIcon>
                    <ListItemText primary={<Text>MANAGER_MENU_TITLE_INCOMING</Text>} />
                </ListItem>
                <ListItem button component={Link} to={URL.ADMIN_CAKES} selected={location.pathname === URL.ADMIN_CAKES}>
                    <ListItemIcon><CakeIcon /></ListItemIcon>
                    <ListItemText primary={<Text>MANAGER_MENU_TITLE_CAKES</Text>} />
                </ListItem>
                <ListItem button component={Link} to={URL.ADMIN_CUSTOMERS} selected={location.pathname === URL.ADMIN_CUSTOMERS}>
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary={<Text>MANAGER_MENU_TITLE_CUSTOMERS</Text>} />
                </ListItem>
            </List>
        )
    }
}
