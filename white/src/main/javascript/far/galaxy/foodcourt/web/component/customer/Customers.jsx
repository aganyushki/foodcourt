import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

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

function Customers(props) {
    const {classes} = props;

    const actionNodeText = "subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur";
    const customers = [
        {id: 1, name: "Andrey Ganyushkin"},
        {id: 2, name: "Abashkina Olga"},
        {id: 3, name: "Abizyaev Pavel"},
        {id: 4, name: "Abramova Ekaterina"},
        {id: 5, name: "Abramova Margarita"},
        {id: 6, name: "Adamova Galina"},
        {id: 7, name: "Agafonov Alexey"},
        {id: 8, name: "Ageeva Ekaterina"},
        {id: 9, name: "Akibov Ruslan"},
        {id: 10, name: "Aladinskiy Dmitry"},
        {id: 11, name: "Alexeyev Alexey"},
        {id: 12, name: "Antipin Konstantin"},
        {id: 13, name: "Apoltsev Sergey"},
        {id: 14, name: "Asadulin Alexander"},
        {id: 15, name: "Asadulina Tatyana"},
        {id: 16, name: "Atamanenko Konstantin"},
        {id: 17, name: "Babkin Ivan"},
        {id: 18, name: "Barabash Vladimir"},
        {id: 19, name: "Baranov Konstantin"},
        {id: 20, name: "Barchenko Svetlana"},
        {id: 21, name: "Bekman Andrey"},
        {id: 22, name: "Belogrudov Alexander"},
        {id: 23, name: "Belov Vladimir"},
        {id: 24, name: "Belyaeva Maria"},
        {id: 25, name: "Bereznyatskiy Artem"},
        {id: 26, name: "Berezyuk Nadezhda"},
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
                                    <h2>{customer.name}</h2>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>

        </div>
    );
}

Customers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Customers);
