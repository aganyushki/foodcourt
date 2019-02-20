import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../../store/OrderStore";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

@observer
class ShopOrderApprove extends Component {

    approve() {
        getOrderStore().putOrder()
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" size="large" className={this.props.classes.button}
                        onClick={this.approve.bind(this)}>
                    approve
                </Button>
                <Button variant="outlined" color="secondary" size="large" className={this.props.classes.button}>
                    reject
                </Button>
            </div>
        )
    }
}

ShopOrderApprove.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopOrderApprove);
