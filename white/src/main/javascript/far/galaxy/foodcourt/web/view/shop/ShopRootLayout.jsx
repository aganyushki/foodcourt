import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import ShopGroups from "./stage/group/ShopGroups";
import ShopCustomers from "./stage/customer/ShopCustomers";
import ShopCakes from "./stage/cake/ShopCakes";
import ShopRootOrderView from "./stage/order/ShopRootOrderView";
import {URL} from '../../Constants';
import ShopOrderStepper from "./ShopOrderStepper";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ShopOrderStepHelper from "./ShopOrderStepHelper";
import {observer} from "mobx-react";
import {ShopRootLayoutStyles} from "./Style";
import ShopviewWorkflowRouter from "./ShopviewWorkflowRouter";
import ShopOrderCancelAction from "./ShopOrderCancelAction";
import GlobalNotificationCtrl from "../component/GlobalNotificationCtrl";

@withRouter
@observer
class ShopRootLayout extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Route component={ShopviewWorkflowRouter} />

                <AppBar position="fixed" color="white">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                        >
                            <InfoIcon color="primary" />
                        </IconButton>
                        <ShopOrderStepHelper />
                        <div className={classes.grow} />
                        <ShopOrderStepper/>
                    </Toolbar>
                </AppBar>

                <div className={classes.content}>
                    <Switch>
                        <Route exact path={URL.SHOP_GROUPS} component={ShopGroups}/>
                        <Route path={URL.SHOP_CUSTOMERS} component={ShopCustomers}/>
                        <Route path={URL.SHOP_CAKES} component={ShopCakes}/>
                        <Route path={URL.SHOP_ORDER} component={ShopRootOrderView}/>
                    </Switch>
                </div>

                <ShopOrderCancelAction />
                <GlobalNotificationCtrl />
            </div>
        )
    }
}

export default withStyles(ShopRootLayoutStyles)(ShopRootLayout);
