
export default class Customer {

    constructor(value) {
        this.value = value;
    }

    getId() {
        return this.value.id;
    }

    getName() {
        return this.value.name;
    }

    getEmail() {
        return this.value.email;
    }

    getBalance() {
        return this.value.balance;
    }
}
