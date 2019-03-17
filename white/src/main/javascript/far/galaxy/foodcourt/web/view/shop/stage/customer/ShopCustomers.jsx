import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {ShopCustomersStyles} from "./Style";
import RootProcessingIndicator from "../../../component/RootProcessingIndicator";

@inject("customerStore", "orderStore")
@observer
class ShopCustomers extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        customerStore: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired
    };

    doSelect = (customer) => {
        this.props.orderStore.setCustomer(customer);
    };

    showCustomers = (customers) => {
        const {classes} = this.props;
        return (
            <Grid container spacing={24}>{
                customers.map(customer =>
                    <Grid key={customer.getId()} item xs={2} onClick={this.doSelect.bind(this, customer)}>
                        <Paper className={classes.paper}>
                            <h3>{customer.getName()}</h3>
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
                    customerStore.customers === null
                        ? <RootProcessingIndicator />
                        : this.showCustomers(customerStore.customers)
                }
            </div>
        )
    }
}

export default withStyles(ShopCustomersStyles)(ShopCustomers);
