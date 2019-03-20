import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Text from "../component/Text";

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
            msg = <Text>HELPER_STAGE_1</Text>;
        } else if (order.customer === null) {
            msg = <Text>HELPER_STAGE_2</Text>;
        } else if (order.cake === null) {
            msg = <Text>HELPER_STAGE_3</Text>;
        } else if (order.count === 0) {
            msg = <Text>HELPER_STAGE_4</Text>;
        } else {
            msg = <Text>HELPER_STAGE_5</Text>;
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
