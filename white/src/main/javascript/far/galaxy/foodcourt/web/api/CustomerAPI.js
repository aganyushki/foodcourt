import CustomerGroup from "../entity/CustomerGroup";
import Customer from "../entity/Customer";
import {checkIfRequestIsOKAndConvertToJSON} from "./Utils";

export function getPageableCustomers(page, limit, search) {
    let url = `/api/customers?page=${page}&limit=${limit}`;
    if (search && search.length) {
        url = `${url}&search=${search}`;
    }
    return fetch(url)
        .then(checkIfRequestIsOKAndConvertToJSON);
}

export function getGroups() {
    return fetch("/api/groups")
        .then(res => res.json())
        .then(groups =>
            groups.map(group => new CustomerGroup(group))
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
        .then(checkIfRequestIsOKAndConvertToJSON)
        .then(customer => new Customer(customer))
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
        .then(checkIfRequestIsOKAndConvertToJSON)
        .then(customer => new Customer(customer))
}
