import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

function CustomerLayout(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={24}
            >
                <Grid item xs>
                    <Paper className={classes.paper}>Name</Paper>
                </Grid>

                <Grid item xs>
                    <Paper className={classes.paper}>Name X</Paper>
                </Grid>
            </Grid>
        </div>
    );
}

CustomerLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerLayout);
