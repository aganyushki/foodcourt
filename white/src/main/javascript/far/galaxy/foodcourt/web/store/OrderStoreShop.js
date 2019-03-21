import {observable, action, computed} from "mobx";
import {putOrder} from "../api/OrderAPI";
import NewOrderItem from "../entity/NewOrderItem";
import React from "react";
import {SHOP_ORDER_AUTO_CANCEL_TIMEOUR_SEC, SYS_ERROR_ORDER_TIMEOUT_ALREADY_STARTED} from "../Constants";

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
    @observable sendingOrder = false;
    @observable sendingOrderError = null;

    scope = null;
    orderTimeout = null;

    constructor(scope) {
        this.scope = scope;
        this.order = {
            group: null,
            customer: null,
            cake: null,
            count: 0
        };
    }

    @action.bound
    putOrder() {
        if (this.sendingOrder) return;

        this.stopOrderTimeout();

        this.sendingOrder = true;
        putOrder(new NewOrderItem(buildOrderEntity(this.order)))
            .then(this.putOrderCompletion)
            .catch(this.putOrderFails);
    }

    @action.bound
    putOrderCompletion() {
        this.sendingOrder = false;
        this.cleanupOrder();
    }

    @action.bound
    putOrderFails(error) {
        this.sendingOrder = false;
        this.sendingOrderError = error.message;
    }

    @action.bound
    cleanupOrder() {
        this.sendingOrderError = null;
        this.stopOrderTimeout();

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
            this.stopOrderTimeout();
            this.order.group = null;
        }
    }

    @action.bound
    setGroup(group) {
        this.order.group = group;
        this.startOrderTimeout();
    }

    @computed
    get selectedGroup() {
        return this.order.group;
    }

    @action.bound
    setCustomer(customer) {
        this.resetOrderTimeout();
        this.order.customer = customer;
    }

    @action.bound
    setCake(cake) {
        this.resetOrderTimeout();
        this.order.cake = cake;
    }

    @action.bound
    setCount(count) {
        this.resetOrderTimeout();
        this.order.count = count;
    }

    startOrderTimeout() {
        if (this.orderTimeout !== null) {
            throw new Error(SYS_ERROR_ORDER_TIMEOUT_ALREADY_STARTED);
        }
        this.orderTimeout = setTimeout(
            () => {
                this.cleanupOrder();
                this.orderTimeout = null;
            },
            SHOP_ORDER_AUTO_CANCEL_TIMEOUR_SEC * 1e3
        );
    }
    stopOrderTimeout() {
        if (this.orderTimeout !== null) {
            clearTimeout(this.orderTimeout);
            this.orderTimeout = null;
        }
    }
    resetOrderTimeout() {
        this.stopOrderTimeout();
        this.startOrderTimeout();
    }
}
