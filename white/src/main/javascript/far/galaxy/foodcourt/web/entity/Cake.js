
export default class Cake {

    constructor(value) {
        this.value = value;
    }

    getId() {
        return this.value.id;
    }

    getName() {
        return this.value.name;
    }

    getPrice() {
        return this.value.price;
    }

    getMaxCount() {
        return this.value.max;
    }
}
