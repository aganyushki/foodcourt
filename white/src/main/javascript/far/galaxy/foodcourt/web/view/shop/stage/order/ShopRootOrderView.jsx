import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import ShopOrderSummary from "./ShopOrderSummary";
import ShopOrderAmount from "./ShopOrderAmount";
import ShopOrderApprove from "./ShopOrderApprove";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {ShopRootOrderViewStyles} from "./Style";
import ShopOrderSending from "./ShopOrderSending";
import ShopOrderSendingError from "./ShopOrderSendingError";

@inject("orderStore")
@observer
class ShopRootOrderView extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired
    };

    buildStage = (orderStore) => {
        if (orderStore.sendingOrderError) {
            return <ShopOrderSendingError />;
        } else if (orderStore.sendingOrder) {
            return <ShopOrderSending />;
        } else if (orderStore.order.count === 0) {
            return <ShopOrderAmount />;
        } else {
            return <ShopOrderApprove />;
        }
    };

    render() {
        const {classes, orderStore} = this.props;
        return (
            <div className={classes.wrapped}>

                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center"
                >
                    <Grid item container
                          direction="column"
                          justify="flex-start"
                          alignItems="flex-start"
                          xs={6}
                    >
                        <Paper className={classes.whiteFrame}>
                            <div className={classes.whiteFrameDiv}>
                                <ShopOrderSummary />
                                {
                                    this.buildStage(orderStore)
                                }
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default withStyles(ShopRootOrderViewStyles)(ShopRootOrderView);
