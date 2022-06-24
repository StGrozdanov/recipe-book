import { COULD_NOT_FIND_USER } from "../constants/errorMessages.js";
import { USER_AUTHORIZATION_BASE_HEADERS, BASE_URL, BASE_HEADERS, MODIFIYNG_OPERATIONS_HEADERS } from "./back4appService.js";
import { handleRequest } from "../helpers/requestDataHandler.js";

const USERS_END_POINTS = {
    LOGIN: '/login',
    UPDATE: (id) => { return `/users/${id}` },
    DELETE: (id) => { return `/users/${id}` },
    USER_INFO: (id) => { return `/parse/users/${id}` },
}

export async function login({ username, password }) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.LOGIN, {
        method: 'POST',
        headers: USER_AUTHORIZATION_BASE_HEADERS,
        body: JSON.stringify({ username: username, password: password })
    });
    return handleRequest(response);
}

export async function update(userId, username, email, avatar, coverPhoto) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.UPDATE(userId), {
        method: 'PUT',
        headers: {
            ...MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, email: email, avatar: avatar, coverPhoto: coverPhoto })
    });
    handleRequest(response, COULD_NOT_FIND_USER);
}

export async function remove(userId) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.DELETE(userId), {
        method: 'DELETE',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });
    handleRequest(response, COULD_NOT_FIND_USER);
}

export async function getUser(userId) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.USER_INFO(userId), {
        method: 'GET',
        headers: getUserToken() ? MODIFIYNG_OPERATIONS_HEADERS(getUserToken()) : BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_FIND_USER);
}