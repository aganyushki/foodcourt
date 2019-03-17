import React, {Component} from "react";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import {ManagerIncomingStyles} from "./Style";
import DataViewTable from "../../../component/DataViewTable";

const rows = [];
for (let id = 0; id < 1000; id++) {
    rows.push({ id, product: `value ${id}`, owner: `${id}x` })
}

@observer
class ManagerIncoming extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };
    render() {
        const {classes} = this.props;

        const header = [
            {id: 'title', title: "Title"},
            {id: 'xyz', title: "XYZ"}
        ];
        const rows = [];
        for (let i = 0; i < 10; i++) {
            rows.push({
                id: i,
                fields: [
                    {id: 'title', value: `jadj lasj dkweq ${i}`},
                    {id: 'xyz', value: `2 3 ${i}`},
                ]
            });
        }

        return (
            <DataViewTable header={header} rows={rows} />
        )
    }
}

export default withStyles(ManagerIncomingStyles)(ManagerIncoming);
