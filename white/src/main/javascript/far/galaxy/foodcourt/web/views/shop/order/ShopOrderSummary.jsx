import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../../store/OrderStore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CakeIcon from "@material-ui/icons/Cake";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    summaryItemIconPadding: {
        padding: 22.
    },
});

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

@observer
class ShopOrderSummary extends Component {
    render() {
        const order = getOrderStore().order;
        return (
            <Grid item container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
            >
                {
                    order.customer
                        ? buildSummaryItem.call(this.props, <AccountCircleIcon/>, order.customer.getName())
                        : null
                }
                {
                    order.cake
                        ? buildSummaryItem.call(this.props,
                            <CakeIcon/>,
                            <span>
                                <h2>{order.cake.getName()}</h2>
                                <h4>price: {order.cake.getPrice()} ₽</h4>
                                {
                                    order.count > 0
                                        ? <h4>count: {order.count}</h4>
                                        : null
                                }
                            </span>
                        )
                        : null
                }
            </Grid>
        )
    }
}

ShopOrderSummary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopOrderSummary);
