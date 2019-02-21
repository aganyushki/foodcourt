import React, {Component} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {styles} from "./Style";
import Paper from "@material-ui/core/Paper";

class CustomerAdminViewTable extends Component {
    render() {
        return (
            <Paper>
                <Table className={this.props.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell align="right">Balance</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.children}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

CustomerAdminViewTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerAdminViewTable);
