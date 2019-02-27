import {observable, action} from "mobx";
import {doAuth, getUser} from "../api/SystemAPI";

class SystemStore {
    @observable user = undefined;

    constructor() {
        this.getUser();
    }

    @action.bound
    setUser(user) {
        this.user = user;
    }

    @action.bound
    getUser() {
        this.setUser(undefined);
        return getUser()
            .then(user => {
                this.setUser(user);
            })
            .catch(() => {
                this.setUser(null);
            })
    }

    @action.bound
    doLogin(login, pwd) {
        return doAuth(login, pwd)
            .then(user => {
                if (user) {
                    this.setUser(user);
                } else {
                    this.setUser(null);
                }
            })
            .catch(() => {
                this.setUser(null);
            })
    }

    @action.bound
    doLogout() {
        this.setUser(null);
    }
}

let store = null;
export function getSystemStore() {
    if (store === null) {
        store = new SystemStore();
    }
    return store;
}
