import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";

import {URL} from '../../URLS';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CakeIcon from '@material-ui/icons/Cake';
import PeopleIcon from '@material-ui/icons/People';
import TocIcon from '@material-ui/icons/Toc';
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
});

class AdminRootLayoutManu extends Component {
    render() {
        const {classes} = this.props;
        return (
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
        )
    }
}

AdminRootLayoutManu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminRootLayoutManu);
