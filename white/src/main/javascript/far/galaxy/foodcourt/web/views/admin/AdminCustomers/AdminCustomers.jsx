import React, {Component} from "react";
import {getCustomerStore} from "../../../store/CustomerStore";
import {observer} from "mobx-react";
import EditItemDialog from "../../component/EditItemDialog";
import ConfirmDialog from "../../component/ConfirmDialog";
import Customer from "../../../entity/Customer";
import RefillDialog from "../../component/RefillDialog";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {NEW_CUSTOMER_MODEL, UPDATE_CUSTOMER_MODEL} from "./Constants";
import {styles} from "./Style";
import CustomerAdminViewRow from "./CustomerAdminViewRow";
import CustomerAdminViewTable from "./CustomerAdminViewTable";

@observer
class AdminCustomers extends Component {

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

    selectCustomer(customer) {
        getCustomerStore().selectCustomer(customer)
    }
    render() {
        const customers = getCustomerStore().customers;
        const filter = getCustomerStore().filterString;
        return (
            <div>
                <CustomerAdminViewTable>{
                    customers === null
                        ? null
                        : customers
                            .filter(customer => customer.getName().indexOf(filter) > -1)
                            .map(customer =>
                                <CustomerAdminViewRow key={customer.getId()} customer={customer}
                                                      doSelect={this.selectCustomer.bind(this, customer)}
                                />
                            )
                }</CustomerAdminViewTable>

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

AdminCustomers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminCustomers);
