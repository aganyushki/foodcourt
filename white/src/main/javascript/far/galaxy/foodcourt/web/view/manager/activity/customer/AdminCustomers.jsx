import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import EditItemDialog from "../../../component/EditItemDialog";
import ConfirmDialog from "../../../component/ConfirmDialog";
import Customer from "../../../../entity/Customer";
import RefillDialog from "../../../component/RefillDialog";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {NEW_CUSTOMER_MODEL, UPDATE_CUSTOMER_MODEL} from "./Constants";
import {styles} from "./Style";
import CustomerAdminViewRow from "./CustomerAdminViewRow";
import CustomerAdminViewTable from "./CustomerAdminViewTable";
import {Route, Switch} from "react-router-dom";
import {URL} from "../../../../Constants";
import Drawer from "../../ManagerRootLayout";
import AdminCustomersEditorView from "./AdminCustomersEditorView";

@inject("customerStore")
@observer
class AdminCustomers extends Component {
    // todo, maybe need more detailed type with MobxPropTypes.observableObject.isRequired
    static propTypes = {
        classes: PropTypes.object.isRequired,
        customerStore: PropTypes.object.isRequired
    };

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
        this.props.customerStore.getCustomers();
    }

    showAddNew = ()  => {
        this.setState({
            dialogAddNew: true,
            dialogAddNewModel: NEW_CUSTOMER_MODEL
        })
    };
    closeAddNew = () => {
        this.setState({dialogAddNew: false})
    };
    doAddNew = (newCustomerTemplate) => {
        this.setState({dialogAddNew: false}, () => {
            this.props.customerStore.putNewCustomer(newCustomerTemplate);
        })
    };

    showRemove = (dialogRemoveValue) => {
        this.setState({
            dialogRemove: true,
            dialogRemoveValue
        })
    };
    closeRemove = () => {
        this.setState({dialogRemove: false})
    };
    doRemove = (customer) => {
        this.setState({dialogRemove: false}, () => {
            this.props.customerStore.removeCustomer(customer);
        })
    };

    showUpdate = (customer) => {
        this.setState({
            dialogUpdate: true,
            dialogUpdateModel: UPDATE_CUSTOMER_MODEL,
            dialogUpdateValue: customer.value
        })
    };
    closeUpdate = () => {
        this.setState({dialogUpdate: false})
    };
    doUpdate = (changes, customerValueObject) => {
        this.setState({dialogUpdate: false}, () => {
            this.props.customerStore.updateCustomer(new Customer(customerValueObject), changes);
        })
    };

    showRefill = (dialogRefillCustomer) => {
        this.setState({
            dialogRefill: true,
            dialogRefillCustomer
        })
    };

    closeRefill = () => {
        this.setState({dialogRefill: false})
    };

    doRefill = (customer, value) => {
        this.setState({dialogRefill: false}, () => {
            this.props.customerStore.refill(customer, value);
        })
    };

    selectCustomer = (customer) => {
        this.props.customerStore.selectCustomer(customer)
    };
    render() {
        const {customerStore} = this.props;
        return (
            <div>
                <CustomerAdminViewTable>{
                    customerStore.customers === null
                        ? null
                        : customerStore.customers
                            .filter(customer => customer.getName().indexOf(customerStore.filterString) > -1)
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
                    yes={this.doAddNew} // todo, bind throws new function in each call. may be in bind without arguments it is possible to store bounded function in class properties?
                    no={this.closeAddNew}
                />
                <ConfirmDialog
                    open={this.state.dialogRemove}
                    yes={this.doRemove}
                    no={this.closeRemove}
                    value={this.state.dialogRemoveValue}
                />
                <EditItemDialog // todo, may be, merge with anchor(*)
                    open={this.state.dialogUpdate}
                    yesTitle="update"
                    noTitle="back"
                    model={this.state.dialogUpdateModel}
                    yes={this.doUpdate}
                    no={this.closeUpdate}
                    values={this.state.dialogUpdateValue}
                />
                <RefillDialog
                    open={this.state.dialogRefill}
                    customer={this.state.dialogRefillCustomer}
                    yesTitle="ok"
                    noTitle="cancel"
                    yes={this.doRefill}
                    no={this.closeRefill}
                />

                <Drawer
                    className={classes.drawer}
                    open={customerStore.selectedCustomer !== null}
                    anchor="right"
                >
                    <div className={classes.editorContent}>
                        <Switch>
                            <Route path={URL.ADMIN_CUSTOMERS} component={AdminCustomersEditorView} />
                        </Switch>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default withStyles(styles)(AdminCustomers);
