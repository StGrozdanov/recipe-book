// export const BASE_URL = 'http://localhost:8080';
export const BASE_URL = 'https://recipes-server-api.herokuapp.com';

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