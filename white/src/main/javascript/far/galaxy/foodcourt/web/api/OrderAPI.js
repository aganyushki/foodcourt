import OrderItem from "../entity/OrderItem";
import {checkIfRequestIsOKAndConvertToJSON} from "./Utils";

export function putOrder(orderTemplate) {
    return fetch(
        `/api/orders`,
        {
            method: "PUT",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                customer: orderTemplate.getCustomerId(),
                cake: orderTemplate.getCakeId(),
                count: orderTemplate.getCount(),
            })
        }
    )
        .then(checkIfRequestIsOKAndConvertToJSON)
        .then(order => new OrderItem(order));
}

export function getPageableOrders(page, limit) {
    return fetch(`/api/orders?page=${page}&limit=${limit}`)
        .then(checkIfRequestIsOKAndConvertToJSON);
}
