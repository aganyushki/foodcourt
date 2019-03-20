import ChangeableEntity from "./ChangeableEntity";

export default class Cake extends ChangeableEntity {
    constructor(value) {
        super(value);
    }

    getId() {
        return this.value.id;
    }

    getName() {
        return this.value.name;
    }

    setName(name) {
        this.markAsChanged();
        this.value.name = name;
    }

    getPrice() {
        return this.value.price;
    }

    setPrice(price) {
        if (!isNaN(+price)) {
            this.markAsChanged();
            this.value.price = +price;
        }
    }

    getMaxCount() {
        return this.value.max || 5;
    }
}
