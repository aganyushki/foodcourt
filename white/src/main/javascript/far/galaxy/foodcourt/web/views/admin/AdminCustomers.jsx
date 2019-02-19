import React, {Component} from "react";
import {getCustomerStore} from "../../store/CustomerStore";
import CustomerFullView from "../component/CustomerFullView";
import {observer} from "mobx-react";

@observer
export default class AdminCustomers extends Component {

    componentDidMount() {
        getCustomerStore().getCustomers();
    }

    render() {

        const customers = getCustomerStore().customers;

        return (
            <div>

                {
                    customers === null
                        ? <i>processing</i>
                        : customers.map(customer => <CustomerFullView key={customer.getId()} customer={customer} />)
                }

            </div>
        )
    }
}
