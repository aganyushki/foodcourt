import {autorun, computed, observable} from "mobx";
import {URL} from '../Constants';

export default class ShopviewWorkflow {
    @observable _routerPath = URL.ROOT;

    constructor({orderStore}) {
        autorun(() => {
            let order = orderStore.order;

            if (order.group === null) {
                this._routerPath = URL.SHOP_GROUPS;

            } else if (order.customer === null) {
                this._routerPath = URL.SHOP_CUSTOMERS;

            } else if (order.cake === null) {
                this._routerPath = URL.SHOP_CAKES;

            } else {
                this._routerPath = URL.SHOP_ORDER;
            }
        });
    }

    @computed get routerPath() {
        return this._routerPath || URL.ROOT;
    }
}
