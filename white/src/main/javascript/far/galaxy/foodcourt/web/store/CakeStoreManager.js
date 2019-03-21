import {action, observable} from "mobx";
import {getPageableCakes, saveOrUpdateCake} from "../api/CakeAPI";
import DataViewTableBaseStore from "./DataViewTableBaseStore";
import React from "react";
import MoneyValue from "../view/component/MoneyValue";
import Cake from "../entity/Cake";
import Text from "../view/component/Text";

export default class CakeStoreManager extends DataViewTableBaseStore {
    @observable selectedCake = null;
    scope = null;

    constructor(scope) {
        super({
            scope,
            getPageableFromServer: getPageableCakes,
            fieldsDescription: [
                {id: 'name', title: <Text>DATA_ENTITY_CAKE_NAME</Text>},
                {id: 'price', title: <Text>DATA_ENTITY_CAKE_PRICE</Text>, transform: value => <MoneyValue value={value} />},
                {id: 'available', title: <Text>DATA_ENTITY_CAKE_AVAILABLE</Text>, transform: value => value ? 'YES' : 'NO'},
                {id: 'version', title: <Text>DATA_ENTITY_CAKE_VERSION</Text>},
            ],
            rowOnClick: cake => this.selectCake(new Cake(cake)),
            search: true,
        });
        this.scope = scope;
    }

    @action.bound
    selectCake(selectedCake) {
        this.selectedCake && this.selectedCake.doRollback && this.selectedCake.doRollback();
        this.selectedCake = selectedCake;
    }

    @action.bound
    saveCake(cake) {
        this.scope.systemStore.setGlobalProcessingStatus(true);
        cake.doCommit();
        this.selectCake(null);

        return saveOrUpdateCake(cake)
            .then(this.saveCakeOk)
            .catch(this.saveCakeFail)
    }

    @action.bound
    saveCakeOk() {
        this.scope.systemStore.setGlobalProcessingStatus(false);
    }

    @action.bound
    saveCakeFail(error) {
        this.scope.systemStore.setGlobalProcessingStatus(false);
        this.scope.systemStore.setGlobalErrorNotification(error.message);
    }

    @action.bound
    addNewCake() {
        this.selectedCake = new Cake({});
    }
}
