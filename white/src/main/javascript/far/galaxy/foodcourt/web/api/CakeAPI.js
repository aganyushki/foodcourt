import Cake from "../entity/Cake";
import {checkIfRequestIsOKAndConvertToJSON} from "./Utils";

export function getPageableCakes(page, limit, search) {
    let url = `/api/cakes?page=${page}&limit=${limit}`;
    if (search && search.length) {
        url = `${url}&search=${search}`;
    }
    return fetch(url)
        .then(checkIfRequestIsOKAndConvertToJSON);
}

export function getAvailableCakes() {
    return getPageableCakes(0, 1e3, null) // todo, hmm....
        .then(({content}) => content.map(cake => new Cake(cake)))
}

export function saveOrUpdateCake(cake) {
    let url = '/api/cakes';
    let method = 'PUT';

    if (cake.getId()) {
        url = `/api/cakes/${cake.getId()}`;
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
                name: cake.getName(),
                price: cake.getPrice()
            })
        }
    )
        .then(checkIfRequestIsOKAndConvertToJSON)
        .then(cake => new Cake(cake))
}
