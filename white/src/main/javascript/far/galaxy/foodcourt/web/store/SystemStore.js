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
        this.initLogRocket(user);
    }

    initLogRocket(user) { // todo, not good idea to have this initialization as part of app core.
        const opts = {
            name: "#:anonymous",
            roles: "",
            cookie: null,
        };
        if (user) {
            opts.name = `#${user.getId()}:${user.getName() || "anonymous"}`;
            opts.roles = user.getRolesAsString();
        }
        LogRocket.identify(opts.name, opts);
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
            this.setUser(user);
        }
        return user;
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
