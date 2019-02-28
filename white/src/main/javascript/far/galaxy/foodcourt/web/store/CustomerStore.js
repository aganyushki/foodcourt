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

class CustomerStore {
    @observable groups = null;
    @observable customers = null;
    @observable filterString = '';
    @observable selectedCustomer = null;

    constructor() {
        getGroups()
            .then(groups => {
                this.groups = groups;
            })
    }

    getCustomersByGroup(group) {
        this.customers = null;
        return getCustomersByGroup(group)
            .then(customers => {
                this.customers = customers;
                return customers;
            })
    }

    @action.bound
    setFilter(filter) {
        this.filterString = filter;
    }

    @action.bound
    getCustomers() {
        this.customers = null;
        return getCustomers()
            .then(customers => {
                this.customers = customers;
                return customers;
            })
    }

    @action.bound
    putNewCustomer(newCustomerTemplate) {
        return addCustomer(new Customer(newCustomerTemplate))
            .then(customer => {
                this.customers.push(customer);
            })
    }

    @action.bound
    removeCustomer(customer) {
        return removeCustomer(customer)
            .then(() => {
                const idToRemove = customer.getId();
                this.customers = this.customers
                    .filter(customer => customer.getId() !== idToRemove)
            })
    }

    @action.bound
    rollbackCustomer(customer) {
        customer && customer.doRollback && customer.doRollback();
    }

    @action.bound
    updateCustomer(customer) {
        if (customer.isChanged()) {
            return updateCustomer(customer, customer.getName(), customer.getEmail())
                .then(updatedCustomer => {
                    this.customers = this.customers
                        .map(customer =>
                            customer.getId() === updatedCustomer.getId() ? updatedCustomer : customer
                        );
                    customer.doCommit();
                    return updatedCustomer;
                })
        } else {
            return Promise.resolve(customer);
        }
    }

    @action.bound
    refill(customer, value) {
        const incomingValue = +value;
        return addBalance(customer, incomingValue)
            .then(updatedCustomer => {
                this.customers = this.customers
                    .map(customer =>
                        customer.getId() === updatedCustomer.getId() ? updatedCustomer : customer
                    );
                // todo, may be need to use WeakMap to optimize performance for local store data updates
                return updatedCustomer;
            })
    }

    @action.bound
    selectCustomer(customer) {
        this.selectedCustomer = customer;
    }
}

let store = null;
export function getCustomerStore() {
    if (store === null) {
        store = new CustomerStore();
    }
    return store;
}
