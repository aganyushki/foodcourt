import {API_ERROR_ACTION_CAN_NOT_BE_COMPLETED} from "../Constants";

export function checkIfRequestIsOKAndConvertToJSON(res) {
    if (res.status !== 200) {
        throw new Error(API_ERROR_ACTION_CAN_NOT_BE_COMPLETED);
    }
    return res.json();
}
