
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
}
