import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CakeIcon from "@material-ui/icons/Cake";
import AttachMoney from "@material-ui/icons/AttachMoney";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {ShopOrderSummaryStyles} from "./Style";
import {CURRENCY_MARKER} from "../../../../Constants";

function buildSummaryItem(icon, message) {
    const {classes} = this;
    return (
        <Grid item
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid item className={classes.summaryItemIconPadding}>
                {icon}
            </Grid>
            <Grid item>{
                typeof(message) === "string"
                    ? <h2>{message}</h2>
                    : message
            }</Grid>
        </Grid>
    )
}

@inject("orderStore")
@observer
class ShopOrderSummary extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired
    };

    render() {
        const {orderStore, classes} = this.props;
        const order = orderStore.order;
        return (
            <Grid item container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
            >
                {
                    order.customer
                        ? buildSummaryItem.call({classes}, <AccountCircleIcon fontSize="large" />, order.customer.getName())
                        : null
                }
                {
                    order.cake
                        ? buildSummaryItem.call({classes}, <CakeIcon fontSize="large" />, order.cake.getName())
                        : null
                }
                {
                    order.cake
                        ? buildSummaryItem.call({classes},
                            <AttachMoney fontSize="large" />,
                            order.count > 0
                                ? <div className={classes.resultPrice}>
                                    {order.cake.getPrice()} {CURRENCY_MARKER} * {order.count}  =  {order.cake.getPrice() * order.count} {CURRENCY_MARKER}
                                </div>
                                : <div className={classes.resultPrice}>
                                    {order.cake.getPrice()} {CURRENCY_MARKER}  *  ?  =  ? {CURRENCY_MARKER}
                                </div>
                        ) : null
                }
            </Grid>
        )
    }
}

export default withStyles(ShopOrderSummaryStyles)(ShopOrderSummary);
