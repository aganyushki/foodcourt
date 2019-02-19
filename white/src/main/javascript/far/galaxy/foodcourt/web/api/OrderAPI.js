import OrderItem from "../entity/OrderItem";

export function putOrder(order) {
    return new Promise((res) => {
        console.log("putOrder", order.value);
        setTimeout(() => {
            res(order);
        }, 1000);
    })
}

export function getOrders() {
    return new Promise((res)=> {
        setTimeout(() => {
            let orders = [];
            for (let i = 0; i < 100; i++) {
                orders.push(new OrderItem({
                    id: i,
                    customer: 100 + i,
                    order: 200 + i,
                    count: 2 * i
                }))
            }
            res(orders);
        }, 1000);
    })
}
