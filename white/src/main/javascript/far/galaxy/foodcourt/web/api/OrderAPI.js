import OrderItem from "../entity/OrderItem";
import {API_ERROR_ACTION_CAN_NOT_BE_COMPLETED} from "../Constants";

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
        .then(res => res.json())
        .then(order => new OrderItem(order))
}

export function getOrders() {
    return getPageableOrders()
        .then(({content}) =>
            content.map(order => new OrderItem(order))
        )
}

export function getPageableOrders(page, limit) {
    return fetch(`/api/orders?page=${page}&limit=${limit}`)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(API_ERROR_ACTION_CAN_NOT_BE_COMPLETED);
            }
            return res;
        })
        .then(res => res.json());
}
