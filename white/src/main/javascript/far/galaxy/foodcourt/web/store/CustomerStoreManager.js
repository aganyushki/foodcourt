import {action, observable} from "mobx";
import {
    getPageableCustomers,
    saveOrUpdateCustomer,
    addBalance
} from "../api/CustomerAPI";
import Customer from "../entity/Customer";
import DataViewTableBaseStore from "./DataViewTableBaseStore";
import React from "react";
import MoneyValue from "../view/component/MoneyValue";
import Text from "../view/component/Text";

export default class CustomerStoreManager extends DataViewTableBaseStore {
    @observable selectedCustomer = null;

    constructor(scope) {
        super({
            scope,
            getPageableFromServer: getPageableCustomers,
            fieldsDescription: [
                {id: 'name', title: <Text>DATA_ENTITY_CUSTOMER_NAME</Text>},
                {id: 'email', title: <Text>DATA_ENTITY_CUSTOMER_EMAIL</Text>},
                {id: 'balance', title: <Text>DATA_ENTITY_CUSTOMER_BALANCE</Text>, transform: value => <MoneyValue value={value} />},
            ],
            rowOnClick: customer => this.selectCustomer(new Customer(customer)),
            search: true,
        });
    }

    @action.bound
    addNewCustomer() {
        this.selectedCustomer = new Customer({});
    }

    @action.bound
    selectCustomer(selectedCustomer) {
        this.selectedCustomer && this.selectedCustomer.doRollback && this.selectedCustomer.doRollback();
        this.selectedCustomer = selectedCustomer;
    }

    @action.bound
    saveCustomer(customer) {
        this.scope.systemStore.setGlobalProcessingStatus(true);
        customer.doCommit();
        this.selectCustomer(null);

        return saveOrUpdateCustomer(customer)
            .then(this.saveCustomerOk)
            .catch(this.saveCustomerFail)
    }
    @action.bound
    saveCustomerOk() {
        this.scope.systemStore.setGlobalProcessingStatus(false);
        this.reload();
        // todo,
    }
    @action.bound
    saveCustomerFail() {
        this.scope.systemStore.setGlobalProcessingStatus(false);
        // todo,
    }

    @action.bound
    refill(customer, value) {
        this.scope.systemStore.setGlobalProcessingStatus(true);
        this.selectCustomer(null);

        return addBalance(customer, value)
            .then(this.refillOk)
            .catch(this.refillFail)
    }
    @action.bound
    refillOk() {
        this.scope.systemStore.setGlobalProcessingStatus(false);
        this.reload();
        // todo,
    }
    @action.bound
    refillFail() {
        this.scope.systemStore.setGlobalProcessingStatus(false);
        // todo,
    }
}
