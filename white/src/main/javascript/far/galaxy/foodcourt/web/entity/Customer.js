import ChangeableEntity from "./ChangeableEntity";

export default class Customer extends ChangeableEntity {
    constructor(value) {
        super(value);
    }

    getId() {
        return this.value.id;
    }

    getName() {
        return this.value.name || "";
    }

    setName(name) {
        this.markAsChanged();
        this.value.name = name;
    }

    getEmail() {
        return this.value.email || "";
    }

    setEmail(email) {
        this.markAsChanged();
        this.value.email = email;
    }

    getBalance() {
        return this.value.balance || 0;
    }
}
