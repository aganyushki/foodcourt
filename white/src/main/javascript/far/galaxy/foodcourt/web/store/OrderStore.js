import {observable, action, computed} from "mobx";
import {getOrders, getPageableOrders, putOrder} from "../api/OrderAPI";
import NewOrderItem from "../entity/NewOrderItem";
import DataViewTableBaseStore from "./DataViewTableBaseStore";

function buildOrderEntity(internalOrderStructure) {
    return {
        id: null,
        customer: internalOrderStructure.customer.getId(),
        cake: internalOrderStructure.cake.getId(),
        count: internalOrderStructure.count
    }
}

export default class OrderStore extends DataViewTableBaseStore {
    @observable order;
    @observable processing = false;

    constructor(scope) {
        super({
            scope,
            getPageableFromServer: getPageableOrders,
            fieldsDescription: [
                {id: 'time', title: "Time", transform: value => new Date(value).toLocaleString()},
                {id: 'orderPrice', title: "Order Price", transform: value => `${value} ₽`},
                {id: 'count', title: "Count"},
                {id: 'customer', title: "Customer"},
                {id: 'cake', title: "Cake"},
                {id: 'price', title: "Price", transform: value => `${value} ₽`},
            ],
            rowTransformer: (row => (
                {...row, customer: row.customer.name, cake: row.cake.name, price: row.cake.price,
                    orderPrice: row.cake.price * row.count}
            )),
            rowOnClick: item => console.log(item.id)
        });

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
