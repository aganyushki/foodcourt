import {Component} from "react";
import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {styles} from "./Style";

class CustomerAdminViewRow extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const {customer, doSelect} = this.props;

        return (
            <TableRow onClick={doSelect}>
                <TableCell component="th" scope="row">{customer.getName()}</TableCell>
                <TableCell component="th" scope="row">{customer.getEmail()}</TableCell>
                <TableCell align="right">{customer.getBalance()}</TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(CustomerAdminViewRow);
