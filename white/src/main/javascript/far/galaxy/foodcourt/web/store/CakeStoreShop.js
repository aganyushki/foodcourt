import {action, observable} from "mobx";
import {} from "../api/CakeAPI";
import React from "react";
import {getAvailableCakes} from "../api/CakeAPI";

export default class CakeStoreShop {
    @observable cakes = null;

    @action.bound
    pullCakes() {
        if (this.cakes === null) {
            getAvailableCakes().then(this.setCakes)
        }
    }

    @action.bound
    setCakes(cakes) {
        this.cakes = cakes;
    }
}
