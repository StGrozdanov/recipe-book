import { BACKEND_URL } from "../utils/keys.js";

export const BASE_URL = 'http://localhost:8080';
// export const BASE_URL = BACKEND_URL;

export const BASE_HEADERS = {
    'Content-Type': 'application/json'
}

export const MODIFIYNG_OPERATIONS_HEADERS = (userToken) => {
    return {
        ...BASE_HEADERS,
        "Authorization": `Bearer ${userToken}`,
    }
}

export const CALLBACK = {
    call: undefined
}