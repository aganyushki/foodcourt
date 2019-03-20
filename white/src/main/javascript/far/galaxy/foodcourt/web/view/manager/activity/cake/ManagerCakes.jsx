import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import DataViewTable from "../../../component/DataViewTable";
import ManagerCakesEditor from "./ManagerCakesEditor";

@inject("cakeStore")
@observer
export default class ManagerCakes extends Component {
    static propTypes = {
        cakeStore: PropTypes.object.isRequired
    };

    render() {
        const {cakeStore} = this.props;
        return (
            <div>
                <DataViewTable model={cakeStore} />
                <ManagerCakesEditor/>
            </div>
        )
    }
}
