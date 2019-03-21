import {API_ERROR_ACTION_CAN_NOT_BE_COMPLETED} from "../Constants";

export function getPageableIncoming(page, limit) {
    return fetch(`/api/incoming?page=${page}&limit=${limit}`)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(API_ERROR_ACTION_CAN_NOT_BE_COMPLETED);
            }
            return res;
        })
        .then(res => res.json());
}
