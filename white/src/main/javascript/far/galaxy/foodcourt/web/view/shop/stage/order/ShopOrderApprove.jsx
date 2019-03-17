import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ShopOrderApproveStyles} from "./Style";

@inject("orderStore")
@observer
class ShopOrderApprove extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired
    };

    render() {
        const {classes, orderStore} = this.props;
        return (
            <Grid item
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                  className={classes.wrapper}
            >
                <Button variant="outlined" color="primary" size="large" className={classes.button}
                        onClick={orderStore.putOrder}>
                    approve
                </Button>
                <Button variant="outlined" color="secondary" size="large" className={classes.button}
                        onClick={orderStore.cleanupOrder}>
                    reject
                </Button>
            </Grid>
        )
    }
}

export default withStyles(ShopOrderApproveStyles)(ShopOrderApprove);
