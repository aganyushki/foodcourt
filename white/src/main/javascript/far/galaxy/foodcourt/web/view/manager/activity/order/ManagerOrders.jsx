import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import DataViewTable from "../../../component/DataViewTable";

@inject("orderStore")
@observer
export default class ManagerOrders extends Component {
    static propTypes = {
        orderStore: PropTypes.object.isRequired
    };

    render() {
        const {orderStore} = this.props;
        return (
            <DataViewTable model={orderStore}/>
        )
    }
}
