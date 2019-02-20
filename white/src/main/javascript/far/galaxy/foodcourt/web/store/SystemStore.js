import {observable, action} from "mobx";
import {doAuth, getUser} from "../api/SystemAPI";

class SystemStore {
    @observable user = null;

    constructor() {

    }

    @action.bound
    getUser() {
        if (this.user) {
            return Promise.resolve(this.user);
        } else {
            const authToken = '';
            return getUser(authToken)
                .then(user => {
                    this.user = user;
                })
                .catch(() => {
                    this.user = null;
                })
        }
    }

    @action.bound
    doLogin(login, pwd) {
        console.log(`doLogin(login: ${login}; pwd: ${pwd})`);
        return doAuth(login, pwd)
            .then(user => {
                if (user) {
                    console.log(user.getAuthToken());
                    this.user = user;
                } else {
                    this.user = null;
                }
            })
            .catch(() => {
                this.user = null;
            })
    }

    @action.bound
    doLogout() {
        this.user = null;
    }
}

let store = null;
export function getSystemStore() {
    if (store === null) {
        store = new SystemStore();
    }
    return store;
}
