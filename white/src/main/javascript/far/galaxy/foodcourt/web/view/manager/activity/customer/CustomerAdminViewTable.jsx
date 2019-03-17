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
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const {classes, children} = this.props;
        return (
            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Customer Email</TableCell>
                            <TableCell align="right">Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default withStyles(styles)(CustomerAdminViewTable);
