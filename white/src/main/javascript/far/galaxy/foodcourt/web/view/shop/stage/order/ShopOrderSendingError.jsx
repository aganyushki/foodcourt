import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ShopOrderSendingErrorStyles} from "./Style";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Text from "../../../component/Text";

@inject("orderStore")
@observer
class ShopOrderSendingError extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired,
    };

    render() {
        const {classes, orderStore} = this.props;
        return (
            <Grid item
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                  className={classes.wrapper}
            >
                <div className={classes.errorBlock}>
                    <Typography color="error" variant="h6">{orderStore.sendingOrderError}</Typography>
                </div>
                <Button variant="outlined" color="primary" size="large" className={classes.button}
                        onClick={orderStore.cleanupOrder}>
                    <Text>GO_HOME</Text>
                </Button>
            </Grid>
        )
    }
}

export default withStyles(ShopOrderSendingErrorStyles)(ShopOrderSendingError);
