import React, {Component} from "react";
import {getOrderStore} from "../../store/OrderStore";
import {observer} from "mobx-react";
import {getCakeStore} from "../../store/CakeStore";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    wrapped: {
        padding: 50,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        cursor: 'pointer'
    },
});

@observer
class ShopCakes extends Component {

    doSelect(cake) {
        getOrderStore().setCake(cake);
    }

    showProcessing() {
        return <i>pricessing</i>
    }

    showCakes(cakes) {
        return (
            <Grid
                container
                direction="row"
                alignItems="center"
                spacing={24}
            >{
                cakes.map(cake =>
                    <Grid key={cake.getId()} item xs={2} onClick={this.doSelect.bind(this, cake)}>
                        <Paper className={this.props.classes.paper}>
                            <h3>{cake.getName()}</h3>
                        </Paper>
                    </Grid>
                )
            }</Grid>
        )
    }

    render() {
        const cakes = getCakeStore().cakes;
        return (
            <div className={this.props.classes.wrapped}>
                {
                    cakes === null
                        ? this.showProcessing()
                        : this.showCakes(cakes)
                }
            </div>
        )
    }
}

ShopCakes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopCakes);
