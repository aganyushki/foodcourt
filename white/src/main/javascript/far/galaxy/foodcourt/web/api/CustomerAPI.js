import CustomerGroup from "../entity/CustomerGroup";
import Customer from "../entity/Customer";

let customerPool = [];
for (let i = 0; i < 3; i++) {
    customerPool.push(new Customer({
        id: i,
        name: `User Name # ${i}`,
        email: `email_${i}@wiley.com`,
        balance: 10 * i
    }))
}

export function getGroups() {
    return fetch("/api/groups")
        .then(res => res.json())
        .then(groups =>
            groups.map(group => new CustomerGroup(group))
        )
}

export function getCustomersByGroup(group) {
    return fetch(`/api/groups/${group.getId()}/customers`)
        .then(res => res.json())
        .then(customers =>
            customers.map(customer => new Customer(customer))
        )
}

export function getCustomers() {
    return fetch(`/api/customers`)
        .then(res => res.json())
        .then(customers =>
            customers.map(customer => new Customer(customer))
        )
}

export function addCustomer(newCustomer) {
    return new Promise((res)=> {
        setTimeout(() => {

            newCustomer.value.id = customerPool.length + 7000;
            newCustomer.value.balance = 0;
            customerPool.push(newCustomer);

            res(newCustomer);
        }, 300);
    })
}

export function updateCustomer(customer, changes) {
    return new Promise((res, rej)=> {
        setTimeout(() => {
            const idToUpdate = customer.getId();
            const updated = customerPool
                .filter(customer => customer.getId() === idToUpdate)
                .map(customer => {
                    customer.value.name = changes.name;
                    return customer;
                });

            if (updated.length === 0) {
                rej('Undefined customer');
            } else {
                res(updated[0]);
            }

        }, 300);
    })
}

export function removeCustomer(customer) {
    return new Promise((res)=> {
        setTimeout(() => {

            const idToRemove = customer.getId();
            customerPool = customerPool.filter(customer => customer.getId() !== idToRemove);

            res();
        }, 300);
    })
}

export function addBalance(customer, incoming) {
    return new Promise((res, rej)=> {
        setTimeout(() => {

            if (incoming < 1) {
                rej(`Incorrect incoming value ${incoming}`);
                return;
            }

            const idToUpdate = customer.getId();
            const updated = customerPool
                .filter(customer => customer.getId() === idToUpdate)
                .map(customer => {
                    customer.value.balance = +customer.value.balance + incoming;
                    return customer;
                });

            if (updated.length === 0) {
                rej('Undefined customer');
            } else {
                res(updated[0]);
            }

        }, 300);
    })
}
