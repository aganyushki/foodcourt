import {action, observable} from "mobx";
import {
    addBalance,
    addCustomer,
    getCustomers,
    getCustomersByGroup,
    getGroups,
    removeCustomer,
    updateCustomer
} from "../api/CustomerAPI";
import Customer from "../entity/Customer";

export default class CustomerStore {
    @observable groups = null;
    @observable customers = null;
    @observable filterString = '';
    @observable selectedCustomer = null;

    constructor() {
        getGroups()
            .then(groups => {
                this.groups = groups;
            });
    }

    @action.bound
    setCustomers(customers) {
        this.customers = customers;
        return customers;
    }

    @action.bound
    addNewCustomer(customer) {
        this.customers.push(customer);
    }

    @action.bound
    dropCustomer(customer) {
        const idToRemove = customer.getId();
        this.customers = this.customers
            .filter(customer => customer.getId() !== idToRemove);
    }

    @action.bound
    _updateCustomer({updatedCustomer, customer, commit}) {
        this.customers = this.customers
            .map(customer =>
                customer.getId() === updatedCustomer.getId() ? updatedCustomer : customer
            );
        if (commit) {
            customer.doCommit();
        }
        return updatedCustomer;
    }

    @action.bound
    getCustomersByGroup(group) {
        this.customers = null;
        return getCustomersByGroup(group)
            .then(this.setCustomers);
    }

    @action.bound
    setFilter(filter) {
        this.filterString = filter;
    }

    @action.bound
    getCustomers() {
        this.customers = null;
        return getCustomers()
            .then(this.setCustomers);
    }

    @action.bound
    putNewCustomer(newCustomerTemplate) {
        return addCustomer(new Customer(newCustomerTemplate))
            .then(this.addNewCustomer);
    }

    @action.bound
    removeCustomer(customer) {
        return removeCustomer(customer)
            .then(() => customer)
            .then(this.dropCustomer);
    }

    @action.bound
    rollbackCustomer(customer) {
        customer && customer.doRollback && customer.doRollback();
    }

    @action.bound
    updateCustomer(customer) {
        if (customer.isChanged()) {
            return updateCustomer(customer, customer.getName(), customer.getEmail())
                .then(updatedCustomer => ({updatedCustomer, customer, commit: true}))
                .then(this._updateCustomer);
        } else {
            return Promise.resolve(customer);
        }
    }

    @action.bound
    refill(customer, value) {
        const incomingValue = +value;
        return addBalance(customer, incomingValue)
            .then(updatedCustomer => ({updatedCustomer, customer, commit: false}))
            .then(this._updateCustomer);
        // todo, may be need to use WeakMap to optimize performance for local store data updates
    }

    @action.bound
    selectCustomer(customer) {
        this.selectedCustomer = customer;
    }
}
