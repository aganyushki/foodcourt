import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {ShopCakesStyles} from "./Style";
import RootProcessingIndicator from "../../../component/RootProcessingIndicator";

@inject("orderStore", "cakeStore")
@observer
class ShopCakes extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        cakeStore: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired
    };

    doSelect = (cake) => {
        this.props.orderStore.setCake(cake);
    };

    showCakes = (cakes) => {
        const {classes} = this.props;
        return (
            <Grid
                container
                direction="row"
                alignItems="center"
                spacing={24}
            >{
                cakes.map(cake =>
                    <Grid key={cake.getId()} item xs={2} onClick={this.doSelect.bind(this, cake)}>
                        <Paper className={classes.paper}>
                            <h3>{cake.getName()}</h3>
                        </Paper>
                    </Grid>
                )
            }</Grid>
        )
    };

    render() {
        const {cakeStore, classes} = this.props;
        return (
            <div className={classes.wrapped}>
                {
                    cakeStore.cakes === null
                        ? <RootProcessingIndicator />
                        : this.showCakes(cakeStore.cakes)
                }
            </div>
        )
    }
}

export default withStyles(ShopCakesStyles)(ShopCakes);
