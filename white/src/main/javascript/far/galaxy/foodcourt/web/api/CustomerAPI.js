import CustomerGroup from "../entity/CustomerGroup";
import Customer from "../entity/Customer";

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
    return fetch(
        `/api/customers`,
        {
            method: "PUT",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                name: newCustomer.getName(),
                email: newCustomer.getEmail()
            })
        }
    )
        .then(res => res.json())
        .then(customer => new Customer(customer))
}

export function updateCustomer(customer, changes) {
    return fetch(
        `/api/customers/${customer.getId()}`,
        {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                name: changes.name,
                email: changes.email
            })
        }
    )
        .then(res => res.json())
        .then(customer => new Customer(customer))
}

export function removeCustomer(customer) {
    return fetch(
        `/api/customers/${customer.getId()}`,
        {
            method: "DELETE",
            cache: "no-cache"
        }
    )
}

export function addBalance(customer, incoming) {
    return fetch(
        `/api/customers/${customer.getId()}/balance`,
        {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                balance: incoming
            })
        }
    )
        .then(res => res.json())
        .then(customer => new Customer(customer))
}
