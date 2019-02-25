import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../../store/OrderStore";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    wrapper: {
        paddingTop: 100,
    },
    margin: {
        margin: theme.spacing.unit,
    }
});

@observer
class ShopOrderAmount extends Component {

    doSelect(count) {
        getOrderStore().setCount(count);
    }

    render() {
        const order = getOrderStore().order;
        const maxCount = order.cake && order.cake.getMaxCount();

        let buttons = [];
        for (let count = 1; count <= maxCount; count++) {
            buttons.push(
                <Grid item key={count}>
                    <Button key={count} onClick={this.doSelect.bind(this, count)}
                        variant="outlined" size="large" color="primary" className={this.props.classes.margin}
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
                  className={this.props.classes.wrapper}
            >
                {buttons}
            </Grid>
        )
    }
}

ShopOrderAmount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopOrderAmount);
