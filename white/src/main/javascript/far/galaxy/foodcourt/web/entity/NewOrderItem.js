
export default class OrderItem {

    constructor(value) {
        this.value = value;
    }

    getId() {
        return this.value.id;
    }

    getCustomerId() {
        return this.value.customer;
    }

    getCakeId() {
        return this.value.order;
    }

    getCount() {
        return this.value.count;
    }
}
