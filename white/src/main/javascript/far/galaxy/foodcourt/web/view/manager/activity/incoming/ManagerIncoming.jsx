import React, {Component} from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import DataViewTable from "../../../component/DataViewTable";

@inject("incomingStore")
@observer
export default class ManagerIncoming extends Component {
    static propTypes = {
        incomingStore: PropTypes.object.isRequired
    };

    render() {
        const {incomingStore} = this.props;
        return (
            <DataViewTable model={incomingStore} />
        )
    }
}
