import Cake from "../entity/Cake";

let cakePool = [];
for (let i = 0; i < 10; i++) {
    cakePool.push(new Cake({
        id: i,
        name: `item # ${i}`,
        price: 3 * i,
        max: 5
    }))
}

export function getCakes() {
    return fetch("/api/cakes")
        .then(res => res.json())
        .then(cakes =>
            cakes.map(cake => new Cake(cake))
        )
}

export function addCake(newCake) {
    return new Promise((res)=> {
        setTimeout(() => {

            newCake.value.id = cakePool.length + 8000;
            cakePool.push(newCake);

            res(newCake);
        }, 300);
    })
}

export function updateCake(cake, changes) {
    return new Promise((res, rej)=> {
        setTimeout(() => {

            if (changes.price && (changes.price < 0)) {
                rej(`Incorrect incoming value ${changes.price}`);
                return;
            }

            const idToUpdate = cake.getId();
            const updated = cakePool
                .filter(cake => cake.getId() === idToUpdate)
                .map(cake => {
                    cake.value.price = changes.price;
                    cake.value.name = changes.name;
                    return cake;
                });

            if (updated.length === 0) {
                rej('Undefined cake');
            } else {
                res(updated[0]);
            }

        }, 300);
    })
}

export function removeCake(cake) {
    return new Promise((res)=> {
        setTimeout(() => {

            const idToRemove = cake.getId();
            cakePool = cakePool.filter(cake => cake.getId() !== idToRemove);

            res();
        }, 300);
    })
}
