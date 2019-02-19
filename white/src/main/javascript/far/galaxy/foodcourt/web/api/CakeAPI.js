import Cake from "../entity/Cake";

export function getCakes() {
    return new Promise((res)=> {
        setTimeout(() => {
            let cakes = [];
            for (let i = 0; i < 10; i++) {
                cakes.push(new Cake({
                    id: i,
                    name: `item # ${i}`,
                    price: 3 * i,
                    max: 5
                }))
            }
            res(cakes);
        }, 1000);
    })
}

export function addCake(newCake) {
    return Promise.resolve(null);
}

export function deleteCake(cake) {
    return Promise.resolve(cake);
}
