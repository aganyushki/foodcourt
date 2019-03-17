
import {observable, action} from "mobx";

export default class Customer {

    @observable value = null;
    @observable changed = false;
    backup = null;

    constructor(value) {
        this.value = value;
        this.changed = false;
    }

    getId() {
        return this.value.id;
    }

    getName() {
        return this.value.name || "";
    }

    @action
    setName(name) {
        this.markAsChanged();
        this.changed = true;

        this.value.name = name;
    }

    getEmail() {
        return this.value.email || "";
    }

    @action
    setEmail(email) {
        this.markAsChanged();
        this.changed = true;

        this.value.email = email;
    }

    getBalance() {
        return this.value.balance || 0;
    }

    isChanged() {
        return this.changed;
    }

    @action
    clearChangedFlag() {
        this.changed = false;
    }

    markAsChanged() {
        if (this.backup === null) {
            this.backup = {...this.value};
        }
        this.changed = true;
    }

    @action
    doRollback() {
        if (this.backup !== null) {
            this.value = this.backup;
            this.backup = null;
        }
        this.changed = false;
    }

    @action
    doCommit() {
        this.backup = null;
        this.changed = false;
    }
}
