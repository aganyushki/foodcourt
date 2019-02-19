import {autorun, observable} from "mobx";
import {URL} from '../URLS';
import {getOrderStore} from "./OrderStore";
import {getCustomerStore} from "./CustomerStore";

class Workflow {
    @observable routerPath = URL.ROOT;

    constructor() {
        autorun(() => {
            let order = getOrderStore().order;

            if (order.group === null) {
                this.routerPath = URL.SHOP_GROUPS;
            } else if (order.customer === null) {
                getCustomerStore().getCustomersByGroup(order.group);
                this.routerPath = URL.SHOP_CUSTOMERS;
            } else if (order.cake === null) {
                this.routerPath = URL.SHOP_CAKES;
            } else {
                this.routerPath = URL.SHOP_ORDER;
            }

            console.log(`Workflow->autorun <${this.routerPath}>`);
        });
    }

    getRouterPath() {
        return this.routerPath || URL.ROOT;
    }
}

let workflow = null;
export function getWorkflow() {
    if (workflow === null) {
        workflow = new Workflow();
    }
    return workflow;
}
