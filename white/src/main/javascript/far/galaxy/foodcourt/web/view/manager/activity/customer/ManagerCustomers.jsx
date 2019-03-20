import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import DataViewTable from "../../../component/DataViewTable";
import ManagerCustomersEditor from "./ManagerCustomersEditor";

@inject("customerStore")
@observer
export default class ManagerCustomers extends Component {
    // todo, maybe need more detailed type with MobxPropTypes.observableObject.isRequired
    static propTypes = {
        customerStore: PropTypes.object.isRequired
    };

    render() {
        const {customerStore} = this.props;
        return (
            <div>
                <DataViewTable model={customerStore} />
                <ManagerCustomersEditor />
            </div>
        )
    }
}

