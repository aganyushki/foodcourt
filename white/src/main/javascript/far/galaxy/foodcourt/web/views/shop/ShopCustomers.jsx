import React, {Component} from "react";
import {getOrderStore} from "../../store/OrderStore";
import Customer from "../component/Customer";
import {getCustomerStore} from "../../store/CustomerStore";
import {observer} from "mobx-react";

@observer
export default class ShopCustomers extends Component {

    doSelect(customer) {
        getOrderStore().setCustomer(customer);
    }

    showProcessing() {
        return <i>pricessing</i>
    }

    showCustomers(customers) {
        return customers.map(customer =>
            <Customer key={customer.getId()} customer={customer} onClick={this.doSelect.bind(this, customer)}
        />)
    }

    render() {
        const customers = getCustomerStore().customers;
        return (
            <div>
                {
                    customers === null
                        ? this.showProcessing()
                        : this.showCustomers(customers)
                }
            </div>
        )
    }
}
