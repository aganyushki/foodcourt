import User from "../entity/User";

export function getUser(authToken) {
    return new Promise((res) => {
        setTimeout(() => {

            const user = new User({
                id: 77000,
                name: 'User Name',
                authToken
            });

            res(user);
        }, 100);
    })
}

export function doAuth(login, pwd) {
    return new Promise((res)=> {
        setTimeout(() => {

            const user = new User({
                id: 77000,
                name: 'User Name',
                authToken: 'XXX-YYY-ZZZ'
            });

            res(user);

        }, 1000);
    })
}
