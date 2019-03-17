import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ShopOrderAmountStyles} from "./Style";

@inject("orderStore")
@observer
class ShopOrderAmount extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired
    };

    doSelect = (count) => {
        this.props.orderStore.setCount(count); // todo, refactoring, bind into onClick handler
    };
    render() {
        const {orderStore, classes} = this.props;
        const order = orderStore.order;
        const maxCount = order.cake ? order.cake.getMaxCount() : 0;

        let buttons = [];
        for (let count = 1; count <= maxCount; count++) {
            buttons.push(
                <Grid item key={count}>
                    <Button key={count} onClick={this.doSelect.bind(this, count)}
                        size="large" color="primary" className={classes.countSelectorCtrl}
                    >
                        {count}
                    </Button>
                </Grid>
            )
        }
        return (
            <Grid item
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className={classes.wrapper}
            >
                {buttons}
            </Grid>
        )
    }
}

export default withStyles(ShopOrderAmountStyles)(ShopOrderAmount);
