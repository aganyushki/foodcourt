import {action, observable} from "mobx";
import {getCustomers, getCustomersByGroup, getGroups} from "../api/CustomerAPI";

class CustomerStore {
    @observable groups = null;
    @observable customers = null;

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
    getCustomers() {
        this.customers = null;
        return getCustomers()
            .then(customers => {
                this.customers = customers;
                return customers;
            })
    }
}

let store = null;
export function getCustomerStore() {
    if (store === null) {
        store = new CustomerStore();
    }
    return store;
}
