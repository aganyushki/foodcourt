import {observable, action, computed} from "mobx";
import {putOrder} from "../api/OrderAPI";
import NewOrderItem from "../entity/NewOrderItem";
import React from "react";

function buildOrderEntity(internalOrderStructure) {
    return {
        id: null,
        customer: internalOrderStructure.customer.getId(),
        cake: internalOrderStructure.cake.getId(),
        count: internalOrderStructure.count
    }
}

export default class OrderStoreShop {
    @observable order;
    @observable processing = false;

    constructor() {
        this.order = {
            group: null,
            customer: null,
            cake: null,
            count: 0
        };
    }

    @action.bound
    putOrder() { // todo, workflow?
        this.processing = true;
        putOrder(new NewOrderItem(buildOrderEntity(this.order)))
            .then(this.putOrderCompletion)
    }

    @action.bound
    putOrderCompletion() {
        this.processing = false;
        this.cleanupOrder();
    }

    @action.bound
    cleanupOrder() {
        this.order.group = null;
        this.order.customer = null;
        this.order.cake = null;
        this.order.count = 0;
    }

    @action.bound
    goBack() {
        if (this.order.count !== 0) {
            this.order.count = 0;
        } else if (this.order.cake !== null) {
            this.order.cake = null;
        } else if (this.order.customer !== null) {
            this.order.customer = null;
        } else {
            this.order.group = null;
        }
    }

    @action.bound
    setGroup(group) {
        this.order.group = group;
    }

    @computed
    get selectedGroup() {
        return this.order.group;
    }

    @action.bound
    setCustomer(customer) {
        this.order.customer = customer;
    }

    @action.bound
    setCake(cake) {
        this.order.cake = cake;
    }

    @action.bound
    setCount(count) {
        this.order.count = count;
    }
}
