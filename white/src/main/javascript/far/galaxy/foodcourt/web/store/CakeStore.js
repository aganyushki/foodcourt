import {action, observable} from "mobx";
import {addCake, getCakes, removeCake, updateCake} from "../api/CakeAPI";
import Cake from "../entity/Cake";

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

    @action.bound
    putNewCake(newCakeTemplate) {
        return addCake(new Cake(newCakeTemplate))
            .then(cake => {
                this.cakes.push(cake);
            })
    }

    @action.bound
    removeCake(cake) {
        return removeCake(cake)
            .then(() => {
                const idToRemove = cake.getId();
                this.cakes = this.cakes
                    .filter(cake => cake.getId() !== idToRemove)
            })
    }

    @action.bound
    updateCake(cake, changes) {
        return updateCake(cake, changes)
            .then(updatedCake => {
                this.cakes = this.cakes
                    .map(cake =>
                        cake.getId() === updatedCake.getId() ? updatedCake : cake
                    );

                return updatedCake;
            })
    }
}


// todo, remove it
let store = null;
export function getCakeStore() {
    if (store === null) {
        store = new CakeStore();
    }
    return store;
}
