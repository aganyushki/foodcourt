import {action, observable} from "mobx";
import {addCake, getCakes, removeCake, updateCake} from "../api/CakeAPI";
import Cake from "../entity/Cake";

export default class CakeStore {
    @observable cakes = null;

    constructor() {
        this.getCakes();
    }

    @action.bound
    setCakes(cakes) {
        this.cakes = cakes;
    }

    @action.bound
    addCake(cake) {
        this.cakes.push(cake);
    }

    @action.bound
    dropCake(cake) {
        const idToRemove = cake.getId();
        this.cakes = this.cakes
            .filter(cake => cake.getId() !== idToRemove);
    }

    @action.bound
    _updateCake(updatedCake) {
        this.cakes = this.cakes
            .map(cake =>
                cake.getId() === updatedCake.getId() ? updatedCake : cake
            );

        return updatedCake;
    }

    @action.bound
    getCakes() {
        this.cakes = null;
        getCakes()
            .then(this.setCakes)
    }

    @action.bound
    putNewCake(newCakeTemplate) {
        return addCake(new Cake(newCakeTemplate))
            .then(this.addCake)
    }

    @action.bound
    removeCake(cake) {
        return removeCake(cake)
            .then(() => cake)
            .then(this.dropCake)
    }

    @action.bound
    updateCake(cake, changes) {
        return updateCake(cake, changes)
            .then(this._updateCake)
    }
}
