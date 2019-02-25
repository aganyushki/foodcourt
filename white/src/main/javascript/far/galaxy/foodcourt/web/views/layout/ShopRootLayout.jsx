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
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InfoIcon from "@material-ui/icons/Info";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import ShopOrderStepHelper from "../shop/ShopOrderStepHelper";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    content: {
        padding: 15,
        paddingTop: 75
    },
    button: {
        margin: theme.spacing.unit,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    closeFab: {
        margin: theme.spacing.unit,
    },
    closeActionFrame: {
        position: "fixed",
        bottom: 20,
        right: 20,
    }
});

class ShopRootLayout extends Component {
    closeOrder() {
        getOrderStore().cleanupOrder();
    }
    render() {
        return (
            <div>
                <AppBar position="fixed" color="white">
                    <Toolbar>
                        <IconButton
                            className={this.props.classes.menuButton}
                            color="inherit"
                        >
                            <InfoIcon color="primary" />
                        </IconButton>
                        <ShopOrderStepHelper />
                        <div className={this.props.classes.grow} />
                        <ShopOrderStepper/>
                        {/*<div className={this.props.classes.sectionDesktop}>*/}
                            {/*<IconButton*/}
                                {/*color="inherit"*/}
                            {/*>*/}
                                {/*<AccountCircleIcon />*/}
                            {/*</IconButton>*/}
                            {/*<h2>Andrey Ganyushkin</h2>*/}
                        {/*</div>*/}
                    </Toolbar>
                </AppBar>

                <div className={this.props.classes.content}>
                    <Switch>
                        <Route exact path={URL.SHOP_GROUPS} component={ShopGroups}/>
                        <Route path={URL.SHOP_CUSTOMERS} component={ShopCustomers}/>
                        <Route path={URL.SHOP_CAKES} component={ShopCakes}/>
                        <Route path={URL.SHOP_ORDER} component={ShopRootOrderView}/>
                    </Switch>
                </div>

                <div className={this.props.classes.closeActionFrame}>
                    <Fab variant="extended" color="primary" aria-label="close" className={this.props.classes.closeFab}
                         onClick={this.closeOrder.bind(this)}
                    >
                        <CloseIcon className={this.props.classes.extendedIcon} />
                        Close order
                    </Fab>
                </div>
            </div>
        )
    }
}

ShopRootLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopRootLayout);
