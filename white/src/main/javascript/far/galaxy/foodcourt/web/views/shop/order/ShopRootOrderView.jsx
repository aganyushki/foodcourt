import React, {Component} from "react";
import {getOrderStore} from "../../../store/OrderStore";
import {observer} from "mobx-react";
import ShopOrderSummary from "./ShopOrderSummary";
import ShopOrderAmount from "./ShopOrderAmount";
import ShopOrderApprove from "./ShopOrderApprove";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    wrapped: {
        paddingTop: 75,
    },
    whiteFrame: {
        width: '100%'
    },
    whiteFrameDiv: {
        padding: 50
    },
});


@observer
class ShopRootOrderView extends Component {
    render() {
        const order = getOrderStore().order;
        const {classes} = this.props;
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
                                    order.count === 0
                                        ? <ShopOrderAmount />
                                        : <ShopOrderApprove />
                                }
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

ShopRootOrderView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopRootOrderView);
