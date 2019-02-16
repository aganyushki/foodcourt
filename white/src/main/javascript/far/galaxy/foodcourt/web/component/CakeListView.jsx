import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Delete from '@material-ui/icons/Delete';
import Undo from '@material-ui/icons/Undo';
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    margin: {
        margin: theme.spacing.unit,
    },
});

let id = 0;
function createData(name, price) {
    id += 1;
    return { id, name, price };
}

const rows = [
    createData('Cake 1', 13),
    createData('Cake 2', 6),
    createData('Cake 3', 10),
];

const handleChange = name => event => {
    console.log({ [name]: event.target.value });
};

function CakeListView(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Available</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                <InputBase className={classes.margin} defaultValue={row.name} onChange={handleChange('name')} />
                            </TableCell>
                            <TableCell>
                                <InputBase className={classes.margin} defaultValue={row.price} onChange={handleChange('name')} />
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={true}
                                    value="cake_available"
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton color="primary" className={classes.button} aria-label="remove cake">
                                    <Delete color="action" />
                                </IconButton>

                                <Button size="small" className={classes.margin} color="secondary">
                                    Save
                                </Button>

                                <IconButton color="primary" className={classes.button} aria-label="undo">
                                    <Undo color="action" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

CakeListView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CakeListView);
