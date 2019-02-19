import OrderItem from "../entity/OrderItem";
import Customer from "../entity/Customer";
import Cake from "../entity/Cake";

function newItem(i) {
    return new OrderItem({
        id: i,
        customer: new Customer({
            id: i * 7,
            name: `User Name ${i * 7}`,
            email: `email_${i * 7}@wiley.com`,
            balance: i * 3
        }),
        order: new Cake({
            id: i + 9000,
            name: `item name ${i + 9000}`,
            price: i * 2
        }),
        count: 2 * i
    })
}

let orderPool = [];
for (let i = 0; i < 3; i++) {
    orderPool.push(newItem(i));
}

export function putOrder(orderTemplate) {
    return new Promise((res) => {
        setTimeout(() => {

            const order = newItem(orderPool.length);
            orderPool.push(order);

            res(order);
        }, 1000);
    })
}

export function getOrders() {
    return fetch(`/api/orders`)
        .then(res => res.json())
        .then(orders =>
            orders.map(order => new OrderItem(order))
        )
}
