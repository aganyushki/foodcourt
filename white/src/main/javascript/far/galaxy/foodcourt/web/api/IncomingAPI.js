import {checkIfRequestIsOKAndConvertToJSON} from "./Utils";

export function getPageableIncoming(page, limit) {
    return fetch(`/api/incoming?page=${page}&limit=${limit}`)
        .then(checkIfRequestIsOKAndConvertToJSON);
}
