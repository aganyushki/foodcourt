import React, {Component} from 'react';
import {Typography, withStyles} from "@material-ui/core";
import {ShopOrderCancelActionStyles} from "./ShopOrderCancelActionStyle";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Text from "../component/Text";

@inject("orderStore")
@observer
class ShopOrderCancelAction extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired,
    };

    render() {
        const {classes, orderStore} = this.props;

        const closeActionAvailable = orderStore.order.customer !== null && orderStore.order.count === 0;
        const goBackActionAvailable = orderStore.order.group !== null;

        return (closeActionAvailable || goBackActionAvailable)
            ? (
                <div className={classes.closeActionPlaceholder}>
                    {
                        closeActionAvailable ? (
                            <div className={classes.closeActionFrame}>
                                <Paper
                                    className={classes.paperFrame}
                                    onClick={orderStore.cleanupOrder}
                                >
                                    <Typography variant="h6" className={classes.text}>
                                        <Text>REJECT_ORDER</Text>
                                    </Typography>
                                </Paper>
                            </div>
                        ) : null
                    }
                    {
                        goBackActionAvailable ? (
                            <div className={classes.goBackActionFrame}>
                                <Paper
                                    className={classes.paperFrame}
                                    onClick={orderStore.goBack}
                                >
                                    <Typography variant="h6" className={classes.text}>
                                        <Text>GO_BACK</Text>
                                    </Typography>
                                </Paper>
                            </div>
                        ) : null
                    }
                </div>
            ) : null
    }
}

export default withStyles(ShopOrderCancelActionStyles)(ShopOrderCancelAction);
