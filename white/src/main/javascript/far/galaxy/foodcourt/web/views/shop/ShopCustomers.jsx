import React, {Component} from "react";
import {getOrderStore} from "../../store/OrderStore";
import {getCustomerStore} from "../../store/CustomerStore";
import {observer} from "mobx-react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({ // todo, duplicated
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
class ShopCustomers extends Component {

    doSelect(customer) {
        getOrderStore().setCustomer(customer);
    }

    showProcessing() {
        return <i>pricessing</i>
    }

    showCustomers(customers) {
        return (
            <Grid container spacing={24}>{
                customers.map(customer =>
                    <Grid key={customer.getId()} item xs={2} onClick={this.doSelect.bind(this, customer)}>
                        <Paper className={this.props.classes.paper}>
                            <h3>{customer.getName()}</h3>
                        </Paper>
                    </Grid>
                )
            }</Grid>
        )
    }

    render() {
        const customers = getCustomerStore().customers;
        return (
            <div className={this.props.classes.wrapped}>
                {
                    customers === null
                        ? this.showProcessing()
                        : this.showCustomers(customers)
                }
            </div>
        )
    }
}

ShopCustomers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopCustomers);
