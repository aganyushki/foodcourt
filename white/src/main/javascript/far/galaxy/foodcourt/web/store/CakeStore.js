import {action, observable} from "mobx";
import {getCakes} from "../api/CakeAPI";

class CakeStore {
    @observable cakes = null;

    constructor() {
        this.getCakes();
    }

    @action.bound
    getCakes() {
        this.cakes = null;
        getCakes()
            .then(cakes => {
                this.cakes = cakes;
            })
    }
}

let store = null;
export function getCakeStore() {
    if (store === null) {
        store = new CakeStore();
    }
    return store;
}
