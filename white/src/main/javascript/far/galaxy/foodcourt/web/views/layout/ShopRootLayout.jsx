import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import ShopGroups from "../shop/ShopGroups";
import ShopCustomers from "../shop/ShopCustomers";
import ShopCakes from "../shop/ShopCakes";
import ShopRootOrderView from "../shop/order/ShopRootOrderView";
import {URL} from '../../URLS';
import ShopOrderStepper from "../shop/ShopOrderStepper";
import {getOrderStore} from "../../store/OrderStore";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    content: {
        padding: 10,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class ShopRootLayout extends Component {
    closeOrder() {
        getOrderStore().cleanupOrder();
    }
    render() {
        return (
            <div>
                <AppBar position="static" color="default">
                    <ShopOrderStepper/>
                </AppBar>

                <div className={this.props.classes.content}>

                    <Switch>
                        <Route exact path={URL.SHOP_GROUPS} component={ShopGroups}/>
                        <Route path={URL.SHOP_CUSTOMERS} component={ShopCustomers}/>
                        <Route path={URL.SHOP_CAKES} component={ShopCakes}/>
                        <Route path={URL.SHOP_ORDER} component={ShopRootOrderView}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

ShopRootLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopRootLayout);
