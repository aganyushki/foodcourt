import React, {Component} from "react";
import {getCustomerStore} from "../../store/CustomerStore";
import CustomerFullView from "../component/CustomerFullView";
import {observer} from "mobx-react";
import EditItemDialog from "../component/EditItemDialog";
import ConfirmDialog from "../component/ConfirmDialog";
import Customer from "../../entity/Customer";
import RefillDialog from "../component/RefillDialog";

const NEW_CUSTOMER_MODEL = [
    {key: "name", title: "name"},
    {key: "email", title: "email"},
];

const UPDATE_CUSTOMER_MODEL = [
    {key: "id", hidden: true},
    {key: "name", title: "name"},
    {key: "email", title: "email", disabled: true},
];

class Row extends Component {
    render() {
        const {customer, doUpdate, doRemove, doRefill} = this.props;

        return (
            <div style={{padding: 10}}>
                <CustomerFullView customer={customer} />
                <button onClick={doUpdate}>update</button>
                <button onClick={doRemove}>remove</button>
                <button onClick={doRefill}>refill</button>
            </div>
        )
    }
}

@observer
export default class AdminCustomers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogAddNew: false,
            dialogAddNewModel: undefined,
            dialogRemove: false,
            dialogRemoveValue: undefined,
            dialogUpdate: false,
            dialogUpdateModel: undefined,
            dialogUpdateValue: undefined,
            filterValue: "",
            dialogRefill: false,
            dialogRefillCustomer: undefined
        }
    }

    componentDidMount() {
        this.reloadData();
    }

    reloadData() {
        getCustomerStore().getCustomers();
    }

    showAddNew() {
        this.setState({
            dialogAddNew: true,
            dialogAddNewModel: NEW_CUSTOMER_MODEL
        })
    }
    closeAddNew() {
        this.setState({dialogAddNew: false})
    }
    doAddNew(newCustomerTemplate) {
        this.setState({dialogAddNew: false}, () => {
            getCustomerStore().putNewCustomer(newCustomerTemplate);
        })
    }

    showRemove(dialogRemoveValue) {
        this.setState({
            dialogRemove: true,
            dialogRemoveValue
        })
    }
    closeRemove() {
        this.setState({dialogRemove: false})
    }
    doRemove(customer) {
        this.setState({dialogRemove: false}, () => {
            getCustomerStore().removeCustomer(customer);
        })
    }

    showUpdate(customer) {
        this.setState({
            dialogUpdate: true,
            dialogUpdateModel: UPDATE_CUSTOMER_MODEL,
            dialogUpdateValue: customer.value
        })
    }
    closeUpdate() {
        this.setState({dialogUpdate: false})
    }
    doUpdate(changes, customerValueObject) {
        this.setState({dialogUpdate: false}, () => {
            getCustomerStore().updateCustomer(new Customer(customerValueObject), changes);
        })
    }

    doFilter(event) {
        this.setState({
            filterValue: event.target.value
        });
    }

    showRefill(dialogRefillCustomer) {
        this.setState({
            dialogRefill: true,
            dialogRefillCustomer
        })
    }

    closeRefill() {
        this.setState({dialogRefill: false})
    }

    doRefill(customer, value) {
        this.setState({dialogRefill: false}, () => {
            getCustomerStore().refill(customer, value);
        })
    }

    render() {

        const customers = getCustomerStore().customers;

        return (
            <div>
                <button onClick={this.reloadData.bind(this)}>refresh</button>
                <button onClick={this.showAddNew.bind(this)}>add new</button>
                <input type="text" value={this.state.filterValue} onChange={this.doFilter.bind(this)} />

                {
                    customers === null
                        ? <i>processing</i>
                        : customers
                            .filter(customer => customer.getName().indexOf(this.state.filterValue) > -1)
                            .map(customer =>
                                <Row key={customer.getId()} customer={customer}
                                     doUpdate={this.showUpdate.bind(this, customer)}
                                     doRemove={this.showRemove.bind(this, customer)}
                                     doRefill={this.showRefill.bind(this, customer)}
                                />
                            )
                }

                <EditItemDialog // todo, anchor(*)
                    open={this.state.dialogAddNew}
                    yesTitle="add"
                    noTitle="cancel"
                    model={this.state.dialogAddNewModel}
                    yes={this.doAddNew.bind(this)} // todo, bind throws new function in each call. may be in bind without arguments it is possible to store bounded function in class properties?
                    no={this.closeAddNew.bind(this)}
                />
                <ConfirmDialog
                    open={this.state.dialogRemove}
                    yes={this.doRemove.bind(this)}
                    no={this.closeRemove.bind(this)}
                    value={this.state.dialogRemoveValue}
                />
                <EditItemDialog // todo, may be, merge with anchor(*)
                    open={this.state.dialogUpdate}
                    yesTitle="update"
                    noTitle="back"
                    model={this.state.dialogUpdateModel}
                    yes={this.doUpdate.bind(this)}
                    no={this.closeUpdate.bind(this)}
                    values={this.state.dialogUpdateValue}
                />
                <RefillDialog
                    open={this.state.dialogRefill}
                    customer={this.state.dialogRefillCustomer}
                    yesTitle="ok"
                    noTitle="cancel"
                    yes={this.doRefill.bind(this)}
                    no={this.closeRefill.bind(this)}
                />
            </div>
        )
    }
}
