export default class OrderItem {

    constructor(value) {
        this.value = value;
    }

    getId() {
        return this.value.id;
    }

    getCount() {
        return this.value.count;
    }
}
