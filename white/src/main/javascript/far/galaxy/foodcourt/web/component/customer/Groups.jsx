import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import "./Groups.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        cursor: 'pointer',
    },
    groupBodyWrapper: {
        padding: 75,
    },
    actionNode: {
        paddingBottom: 30,
    }
});

function Groups(props) {
    const {classes} = props;

    const actionNodeText = "subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur";
    const customers = [
        {id: 1, name: "A"},
        {id: 2, name: "B"},
        {id: 3, name: "C"},
        {id: 4, name: "D"},
        {id: 5, name: "E"},
        {id: 6, name: "F"},
        {id: 7, name: "G"},
        {id: 8, name: "H"},
        {id: 9, name: "I"},
        {id: 10, name: "J"},
        {id: 11, name: "K"},
        {id: 12, name: "L"},
        {id: 13, name: "M"},
        {id: 14, name: "N"},
        {id: 15, name: "O"},
        {id: 16, name: "P"},
        {id: 17, name: "Q"},
        {id: 18, name: "R"},
        {id: 19, name: "S"},
        {id: 20, name: "T"},
        {id: 21, name: "U"},
        {id: 22, name: "V"},
        {id: 23, name: "W"},
        {id: 24, name: "Y"},
        {id: 25, name: "Z"},
        {id: 26, name: "Персонал"},
    ];
    return (
        <div className={classes.root}>

            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        FoodCount, Korolev
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.groupBodyWrapper}>
                <Typography className={classes.actionNode} variant="subtitle2" gutterBottom>{actionNodeText}</Typography>

                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={40}
                >
                    {
                        customers.map(customer => (
                            <Grid item xs={2} key={customer.id}>
                                <Paper className={classes.paper} onClick={console.log}>
                                    <h1>{customer.name}</h1>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>

        </div>
    );
}

Groups.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Groups);
