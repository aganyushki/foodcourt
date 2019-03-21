import User from "../entity/User";
import {SYS_ERROR_UNABLE_TO_LOGIN} from "../Constants";
import {checkIfRequestIsOKAndConvertToJSON} from "./Utils";

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
        .then(checkIfRequestIsOKAndConvertToJSON)
        .then(response => {
            if (response.status !== 'OK') {
                throw new Error(SYS_ERROR_UNABLE_TO_LOGIN);
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
        .then(checkIfRequestIsOKAndConvertToJSON)
        .then(response => {
            if (response.status !== 'OK') {
                throw new Error(SYS_ERROR_UNABLE_TO_LOGIN);
            }
            return new User(response.user);
        })
}
