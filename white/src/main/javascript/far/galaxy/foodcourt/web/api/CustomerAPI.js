import CustomerGroup from "../entity/CustomerGroup";
import Customer from "../entity/Customer";
import {API_ERROR_ACTION_CAN_NOT_BE_COMPLETED} from "../Constants";

export function getPageableCustomers(page, limit, search) {
    let url = `/api/customers?page=${page}&limit=${limit}`;
    if (search && search.length) {
        url = `${url}&search=${search}`;
    }
    return fetch(url)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(API_ERROR_ACTION_CAN_NOT_BE_COMPLETED);
            }
            return res;
        })
        .then(res => res.json());
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

export function saveOrUpdateCustomer(customer) {
    let url = '/api/customers';
    let method = 'PUT';

    if (customer.getId()) {
        url = `/api/customers/${customer.getId()}`;
        method = 'POST';
    }

    return fetch(
        url,
        {
            method,
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                name: customer.getName(),
                email: customer.getEmail()
            })
        }
    )
        .then(res => {
            if (res.status !== 200) {
                throw new Error(API_ERROR_ACTION_CAN_NOT_BE_COMPLETED);
            }
            return res;
        })
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
        .then(res => {
            if (res.status !== 200) {
                throw new Error(API_ERROR_ACTION_CAN_NOT_BE_COMPLETED);
            }
            return res;
        })
        .then(res => res.json())
        .then(customer => new Customer(customer))
}
