import {observable, action, computed} from "mobx";
import LogRocket from "logrocket";
import {doAuth, getUser} from "../api/SystemAPI";
import {TEXT} from "../Localization";

export default class SystemStore {
    @observable user = undefined;
    @observable globalProcessingIndicator = false;
    @observable globalErrorNotification = null;

    text = TEXT;

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

        if (user) {
            LogRocket.identify(`${user.getId()}/${user.getName()}`, {
                name: user.getName(),
                cookie: null,
                roles: user.getRolesAsString()
            });
        }
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
        this.setUser(user)
    }

    @action.bound
    getUserFail() {
        this.setUser(null)
    }

    @action.bound
    setGlobalErrorNotification(msg) {
        this.globalErrorNotification = msg;
    }

    @action.bound
    clearGlobalErrorNotification() {
        this.setGlobalErrorNotification(null);
    }

    @action.bound
    doLogin(login, pwd) {
        this.clearGlobalErrorNotification();
        return doAuth(login, pwd)
            .then(this.doLoginOk)
            .catch(this.doLoginFail)
    }

    @action.bound
    doLoginOk(user) {
        if (user) {
            this.setUser(user)
        } else {
            this.setUser(null)
        }
    }

    @action.bound
    doLoginFail() {
        this.setUser(null);
        this.setGlobalErrorNotification(this.text.UNABLE_TO_LOGIN);
    }

    @action.bound
    doLogout() {
        this.setUser(null);
        // Cookies.remove(AUTH_COOKIE_NAME, { path: '' });
        // todo, doesnt work!
    }
}
