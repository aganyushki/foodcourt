import Customer from "./Customer";
import Cake from "./Cake";

export default class OrderItem {

    constructor(value) {
        this.value = value;
    }

    getId() {
        return this.value.id;
    }

    getCustomer() {
        return new Customer(this.value.customer);
    }

    getCake() {
        return new Cake(this.value.cake);
    }

    getCount() {
        return this.value.count;
    }

    getTime() {
        return this.value.time;
    }

    getTimeFormatted() {
        return new Date(this.getTime()).toLocaleString();
    }
}
