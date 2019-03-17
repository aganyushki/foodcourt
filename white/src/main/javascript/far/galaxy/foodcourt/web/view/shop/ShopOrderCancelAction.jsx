import React, {Component} from 'react';
import {Typography, withStyles} from "@material-ui/core";
import {ShopOrderCancelActionStyles} from "./ShopOrderCancelActionStyle";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";

@inject("orderStore")
@observer
class ShopOrderCancelAction extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired
    };

    render() {
        const {classes, orderStore} = this.props;
        return orderStore.order.group !== null
            ? (
                <div className={classes.closeActionPlaceholder}>
                    <div className={classes.closeActionFrame}>
                        <Paper
                            className={classes.paperFrame}
                            onClick={orderStore.cleanupOrder}
                        >
                            <Typography variant="h6" className={classes.text}>close order</Typography>
                        </Paper>
                    </div>
                </div>
            ) : null
    }
}

export default withStyles(ShopOrderCancelActionStyles)(ShopOrderCancelAction);
