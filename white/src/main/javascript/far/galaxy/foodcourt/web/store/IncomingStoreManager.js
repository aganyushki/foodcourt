import {getPageableIncoming} from "../api/IncomingAPI";
import DataViewTableBaseStore from "./DataViewTableBaseStore";
import React from "react";
import MoneyValue from "../view/component/MoneyValue";
import Timestamp from "../view/component/Timestamp";
import Text from "../view/component/Text";

export default class IncomingStoreManager extends DataViewTableBaseStore {
    constructor(scope) {
        super({
            scope,
            getPageableFromServer: getPageableIncoming,
            fieldsDescription: [
                {id: 'time', title: <Text>DATA_ENTITY_INCOMING_TIME</Text>, transform: value => <Timestamp value={value} />},
                {id: 'customer', title: <Text>DATA_ENTITY_INCOMING_CUSTOMER</Text>},
                {id: 'amount', title: <Text>DATA_ENTITY_INCOMING_AMOUNT</Text>, transform: value => <MoneyValue value={value} />},
                {id: 'balance', title: <Text>DATA_ENTITY_INCOMING_BALANCE</Text>, transform: value => <MoneyValue value={value} />},
            ],
            rowTransformer: (row => (
                {...row, customer: row.customer.name, balance: row.customer.balance}
            )),
        });
    }
}
