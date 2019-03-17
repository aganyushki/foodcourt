import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {ShopGroupsStyles} from "./Style";
import RootProcessingIndicator from "../../../component/RootProcessingIndicator";

@inject("customerStore", "orderStore")
@observer
class ShopGroups extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        customerStore: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired
    };

    doSelect = (group) => {
        this.props.orderStore.setGroup(group);
    };

    showGroups = (groups) => {
        const {classes} = this.props;
        return (
            <Grid container spacing={24}>{
                groups.map(group =>
                    <Grid key={group.getId()} item xs={2} onClick={this.doSelect.bind(this, group)}>
                        <Paper className={classes.paper}>
                            <h1>{group.getTitle()}</h1>
                        </Paper>
                    </Grid>
                )
            }</Grid>
        )
    };

    render() {
        const {customerStore, classes} = this.props;
        return (
            <div className={classes.wrapped}>
                {
                    customerStore.groups === null
                        ? <RootProcessingIndicator />
                        : this.showGroups(customerStore.groups)
                }
            </div>
        )
    }
}

export default withStyles(ShopGroupsStyles)(ShopGroups);
