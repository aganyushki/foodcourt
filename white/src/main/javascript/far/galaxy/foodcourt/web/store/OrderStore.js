import {observable, action} from "mobx";
import {getOrders, putOrder} from "../api/OrderAPI";
import OrderItem from "../entity/OrderItem";

const DEF_ORDER = {
    group: null,
    customer: null,
    cake: null,
    count: 0
};

function buildOrderEntity(internalOrderStructure) {
    return {
        id: null,
        customer: internalOrderStructure.customer.getId(),
        cake: internalOrderStructure.cake.getId(),
        count: internalOrderStructure.count
    }
}

class OrderStore {
    @observable order = DEF_ORDER;
    @observable processing = false;
    @observable orders = null;

    constructor() {
        this.cleanupOrder();

    }

    @action.bound
    getOrders() {
        this.orders = null;
        getOrders()
            .then(orders => {
                this.orders = orders;
            })
    }

    @action.bound
    putOrder() { // todo, workflow?
        this.processing = true;
        putOrder(new OrderItem(buildOrderEntity(this.order)))
            .then(() => {
                this.processing = false;
                this.cleanupOrder();
            })
    }

    @action.bound
    cleanupOrder() {
        this.order = DEF_ORDER;
    }

    @action.bound
    setGroup(group) {
        this.order.group = group;
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

let store = null;
export function getOrderStore() {
    if (store === null) {
        store = new OrderStore();
    }
    return store;
}
