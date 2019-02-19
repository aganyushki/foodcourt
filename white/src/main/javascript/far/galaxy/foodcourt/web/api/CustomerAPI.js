import CustomerGroup from "../entity/CustomerGroup";
import Customer from "../entity/Customer";

export function getGroups() {
    return new Promise((res)=> {
        setTimeout(() => {
            let groups = [];
            for (let i = 0; i < 10; i++) {
                groups.push(new CustomerGroup({id: i, title: `group # ${i}`}))
            }
            res(groups);
        }, 1000);
    })
}

export function getCustomersByGroup(group) {
    return new Promise((res)=> {
        setTimeout(() => {
            let customers = [];
            for (let i = 0; i < 10; i++) {
                customers.push(new Customer({
                    id: i,
                    name: `User Name # ${i}`,
                    email: `email_${i}@wiley.com`,
                    balance: 10 * i
                }))
            }
            res(customers);
        }, 1000);
    })
}

export function getCustomers() {
    return new Promise((res)=> {
        setTimeout(() => {
            let customers = [];
            for (let i = 0; i < 25; i++) {
                customers.push(new Customer({
                    id: i,
                    name: `Customer Name # ${i}`,
                    email: `email_${i}@wiley.com`,
                    balance: 10 * i
                }))
            }
            res(customers);
        }, 1000);
    })
}

export function addCustomer(newCustomer) {
    return Promise.resolve(null);
}

export function updateCustomerName(customer, newName) {
    return Promise.resolve(null);
}

export function deleteCustomer(customer) {
    return Promise.resolve(customer);
}

export function addBalance(customer, incoming) {
    return Promise.resolve();
}
