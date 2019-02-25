import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../store/OrderStore";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";

const styles = theme => ({
    wrapper: {
        width: '50%'
    }
});

@observer
class ShopOrderStepHelper extends Component {

    getMessage() {
        const order = getOrderStore().order;
        const {group, customer, cake, count} = order;

        let msg = "";

        if (group === null) {
            msg = "Выберите первую букву вашей фамилии";
        } else if (customer === null) {
            msg = "Как вас зовут";
        } else if (cake === null) {
            msg = "Выберите изделие";
        } else if (count === 0) {
            msg = "Выберите количество";
        } else {
            msg = "Завершите выбор";
        }

        return msg;
    }

    render() {
        return (
            <Typography variant="h6" color="inherit">
                {this.getMessage()}
            </Typography>
        )
    }
}

ShopOrderStepHelper.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopOrderStepHelper);
