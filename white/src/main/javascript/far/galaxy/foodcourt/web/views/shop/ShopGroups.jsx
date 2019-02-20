import React, {Component} from "react";
import {observer} from "mobx-react";
import {getCustomerStore} from "../../store/CustomerStore";
import {getOrderStore} from "../../store/OrderStore";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
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
class ShopGroups extends Component {

    doSelect(group) {
        getOrderStore().setGroup(group);
    }

    showProcessing() {
        return <i>pricessing</i>
    }

    showGroups(groups) {
        return (
            <Grid container spacing={24}>{
                groups.map(group =>
                    <Grid key={group.getId()} item xs={2} onClick={this.doSelect.bind(this, group)}>
                        <Paper className={this.props.classes.paper}>
                            <h1>{group.getTitle()}</h1>
                        </Paper>
                    </Grid>
                )
            }</Grid>
        )
    }

    render() {
        const groups = getCustomerStore().groups;
        return (
            <div className={this.props.classes.wrapped}>
                {
                    groups === null
                        ? this.showProcessing()
                        : this.showGroups(groups)
                }
            </div>
        )
    }
}

ShopGroups.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopGroups);
