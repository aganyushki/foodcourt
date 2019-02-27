import User from "../entity/User";

export function getUser() {
    return fetch(
        `/api/system/check/admin`,
        {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        }
    )
        .then(res => {
            if (res.status !== 200) {
                throw new Error(`Incorrect login event processing`);
            }
            return res.json()
        })
        .then(response => {
            if (response.status !== 'OK') {
                throw new Error(`Incorrect login event processing`);
            }
            return new User(response.user);
        })
}

export function doAuth(login, pwd) {
    return fetch(
        `/api/login`,
        {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `login=${login}&password=${pwd}`
        }
    )
        .then(res => {
            if (res.status !== 200) {
                throw new Error(`Incorrect login event processing`);
            }
            return res.json()
        })
        .then(response => {
            if (response.status !== 'OK') {
                throw new Error(`Incorrect login event processing`);
            }
            return new User(response.user);
        })
}
