import React, {Component} from "react";
import {observer} from "mobx-react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ShopOrderSendingStyles} from "./Style";
import LinearProgress from "@material-ui/core/LinearProgress";

@observer
class ShopOrderSending extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid item
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                  className={classes.wrapper}
            >

                <div className={classes.processingWrapper}>
                    <LinearProgress />
                </div>

            </Grid>
        )
    }
}

export default withStyles(ShopOrderSendingStyles)(ShopOrderSending);
