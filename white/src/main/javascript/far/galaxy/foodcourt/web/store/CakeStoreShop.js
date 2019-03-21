import {action, observable} from "mobx";
import React from "react";
import {getAvailableCakes} from "../api/CakeAPI";

export default class CakeStoreShop {
    @observable cakes = null;

    scope = null;

    constructor(scope) {
        this.scope = scope;
    }

    @action.bound
    pullCakes() {
        getAvailableCakes()
            .then(this.setCakes)
            .catch(this.pullCakesFails);
    }

    @action.bound
    setCakes(cakes) {
        this.cakes = cakes;
    }

    @action.bound
    pullCakesFails(error) {
        this.scope.systemStore.setGlobalErrorNotification(error.message);
    }
}
