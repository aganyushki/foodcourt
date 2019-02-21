import {Component} from "react";
import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {styles} from "./Style";
import Button from "@material-ui/core/Button";

class CustomerAdminViewRow extends Component {
    render() {
        const {customer, doUpdate, doRemove, doRefill, classes} = this.props;

        return (
            <TableRow>
                <TableCell component="th" scope="row">{customer.getName()}</TableCell>
                <TableCell align="right">{customer.getBalance()}</TableCell>

                <TableCell align="right">
                    <div className="row-actions">
                        <Button variant="outlined" color="primary" size="small" onClick={doRefill}>
                            <AttachMoneyIcon fontSize="small" />
                            пополнить
                        </Button>

                        <IconButton className={classes.button} aria-label="Delete" onClick={doUpdate}>
                            <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton className={classes.button} aria-label="Delete" onClick={doRemove}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                </TableCell>
            </TableRow>
        )
    }
}


CustomerAdminViewRow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerAdminViewRow);
