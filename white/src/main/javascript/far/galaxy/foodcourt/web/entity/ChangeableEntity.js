
import {observable, action} from "mobx";

export default class ChangeableEntity {
    @observable value = null;
    @observable changed = false;
    backup = null;

    constructor(value) {
        this.value = value;
        this.changed = false;
    }

    isChanged() {
        return this.changed;
    }

    @action
    clearChangedFlag() {
        this.changed = false;
    }

    @action
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
