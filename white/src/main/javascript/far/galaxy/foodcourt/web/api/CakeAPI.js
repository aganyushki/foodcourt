import Cake from "../entity/Cake";

export function getCakes() {
    return fetch("/api/cakes")
        .then(res => res.json())
        .then(({content}) =>
            content.map(cake => new Cake(cake))
        )
}

export function addCake(newCake) {
    return fetch(
        `/api/cakes`,
        {
            method: "PUT",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                name: newCake.getName(),
                price: newCake.getPrice()
            })
        }
    )
        .then(res => res.json())
        .then(cake => new Cake(cake))
}

export function updateCake(cake, changes) {
    return fetch(
        `/api/cakes/${cake.getId()}`,
        {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                name: changes.name,
                price: changes.price
            })
        }
    )
        .then(res => res.json())
        .then(cake => new Cake(cake))
}

export function removeCake(cake) {
    return fetch(
        `/api/cakes/${cake.getId()}`,
        {
            method: "DELETE",
            cache: "no-cache"
        }
    )
}
