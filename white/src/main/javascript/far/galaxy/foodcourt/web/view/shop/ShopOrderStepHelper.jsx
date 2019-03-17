import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";

@inject("orderStore")
@observer
class ShopOrderStepHelper extends Component {
    static propTypes = {
        orderStore: PropTypes.object.isRequired
    };

    getMessage = () => {
        let msg = "";

        const order = this.props.orderStore.order;

        if (order.group === null) {
            msg = "Выберите первую букву вашей фамилии";
        } else if (order.customer === null) {
            msg = "Как вас зовут";
        } else if (order.cake === null) {
            msg = "Выберите изделие";
        } else if (order.count === 0) {
            msg = "Выберите количество";
        } else {
            msg = "Завершите выбор";
        }

        return msg;
    };
    render() {
        return (
            <Typography variant="h6" color="inherit">
                {this.getMessage()}
            </Typography>
        )
    }
}

export default ShopOrderStepHelper;
