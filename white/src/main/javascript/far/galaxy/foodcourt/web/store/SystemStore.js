import {observable, action, computed} from "mobx";
import {doAuth, getUser} from "../api/SystemAPI";
import Cookies from 'js-cookie';
import {AUTH_COOKIE_NAME} from "../Constants";

export default class SystemStore {
    @observable user = undefined;
    @observable globalProcessingIndicator = false;
    @observable loginActionError = null;

    constructor() {
        this.getUser();
    }

    @action.bound
    setGlobalProcessingStatus(status) {
        this.globalProcessingIndicator = status;
    }

    @computed
    get globalProcessingStatus() {
        return this.globalProcessingIndicator;
    }

    @action.bound
    setUser(user) {
        this.user = user;
    }

    @action.bound
    getUser() {
        this.setUser(undefined);
        return getUser()
            .then(this.getUserOk)
            .catch(this.getUserFail)
    }

    @action.bound
    getUserOk(user) {
        this.user = user;
    }

    @action.bound
    getUserFail() {
        this.user = null;
    }

    @action.bound
    clearLoginActionError() {
        this.loginActionError = null;
    }

    @action.bound
    doLogin(login, pwd) {
        this.clearLoginActionError();
        return doAuth(login, pwd)
            .then(this.doLoginOk)
            .catch(this.doLoginFail)
    }

    @action.bound
    doLoginOk(user) {
        if (user) {
            this.user = user;
        } else {
            this.user = null;
        }
    }

    @action.bound
    doLoginFail() {
        this.user = null;
        this.loginActionError = "Unable to login, please check you credentials and try again.";
    }

    @action.bound
    doLogout() {
        this.setUser(null);
        // Cookies.remove(AUTH_COOKIE_NAME, { path: '' });
        // todo, doesnt work!
    }
}
