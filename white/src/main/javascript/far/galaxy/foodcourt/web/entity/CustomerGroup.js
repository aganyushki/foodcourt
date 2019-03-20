import Customer from "./Customer";

export default class CustomerGroup {

    constructor(value) {
        this.value = value;
    }

    getId() {
        return this.value.id;
    }

    getTitle() {
        return this.value.title;
    }

    getCustomers() {
        if (this.value.customers && this.value.customers.length) {
            return this.value.customers.map(customer => new Customer(customer));
        }
        return null;
    }
}
