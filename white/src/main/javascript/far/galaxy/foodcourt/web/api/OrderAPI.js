import OrderItem from "../entity/OrderItem";

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
    return fetch(`/api/orders`)
        .then(res => res.json())
        .then(orders =>
            orders.map(order => new OrderItem(order))
        )
}
