import {observable, action, computed} from "mobx";
import {getPageableOrders} from "../api/OrderAPI";
import DataViewTableBaseStore from "./DataViewTableBaseStore";
import React from "react";
import MoneyValue from "../view/component/MoneyValue";
import Timestamp from "../view/component/Timestamp";
import Text from "../view/component/Text";

export default class OrderStoreManager extends DataViewTableBaseStore {
    constructor(scope) {
        super({
            scope,
            getPageableFromServer: getPageableOrders,
            fieldsDescription: [
                {id: 'time', title: <Text>DATA_ENTITY_ORDER_TIME</Text>, transform: value => <Timestamp value={value} />},
                {id: 'orderPrice', title: <Text>DATA_ENTITY_ORDER_ORDER_PRICE</Text>, transform: value => <MoneyValue value={value} />},
                {id: 'count', title: <Text>DATA_ENTITY_ORDER_COUNT</Text>},
                {id: 'customer', title: <Text>DATA_ENTITY_ORDER_CUSTOMER</Text>},
                {id: 'cake', title: <Text>DATA_ENTITY_ORDER_CAKE</Text>},
                {id: 'price', title: <Text>DATA_ENTITY_ORDER_CAKE_PRICE</Text>, transform: value => <MoneyValue value={value} />},
            ],
            rowTransformer: (row => (
                {...row, customer: row.customer.name, cake: row.cake.name, price: row.cake.price,
                    orderPrice: row.cake.price * row.count}
            )),
            rowOnClick: item => console.log(item.id)
        });
    }
}
