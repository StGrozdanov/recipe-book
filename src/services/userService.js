import { notify } from "../utils/notification.js";
import MODIFIYNG_OPERATIONS_HEADERS, { USER_AUTHORIZATION_BASE_HEADERS, BASE_URL, BASE_HEADERS } from "./back4appService.js";

const USERS_END_POINTS = {
    REGISTER: '/users',
    LOGIN: '/login',
    LOGOUT: '/logout',
    UPDATE: (id) => { return `/users/${id}` },
    DELETE: (id) => { return `/users/${id}` },
    USER_INFO: (id) => { return `/parse/users/${id}` },
}

export async function register(username, email, password) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.REGISTER, {
        method: 'POST',
        headers: USER_AUTHORIZATION_BASE_HEADERS,
        body: JSON.stringify({ username: username, email: email, password: password })
    });
    if (response.ok) {
        const data = await response.json();
        saveUserData(data);
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}

export async function login(username, password) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.LOGIN, {
        method: 'POST',
        headers: USER_AUTHORIZATION_BASE_HEADERS,
        body: JSON.stringify({ username: username, password: password })
    });
    if (response.ok) {
        const data = await response.json();
        saveUserData(data);
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}

export async function logout() {
    const response = await fetch(BASE_URL + USERS_END_POINTS.LOGOUT, {
        method: 'POST',
        headers: USER_AUTHORIZATION_BASE_HEADERS
    });
    if (response.ok) {
        clearUserData();
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}

export async function update(username, email, password, userId) {
    const authorizationToken = sessionStorage.getItem('authToken');

    const response = await fetch(BASE_URL + USERS_END_POINTS.UPDATE(userId), {
        method: 'PUT',
        headers: {
            ...MODIFIYNG_OPERATIONS_HEADERS(authorizationToken),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, email: email, password: password })
    });
    if (response.ok) {
        clearUserData();
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}

export async function remove(userId) {
    const authorizationToken = sessionStorage.getItem('authToken');

    const response = await fetch(BASE_URL + USERS_END_POINTS.DELETE(userId), {
        method: 'DELETE',
        headers: MODIFIYNG_OPERATIONS_HEADERS(authorizationToken)
    });
    if (response.ok) {
        clearUserData();
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}

export async function getUser(userId) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.USER_INFO(userId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    const data = await response.json();
    return data;
}

function saveUserData(data) {
    sessionStorage.setItem('authToken', data.sessionToken);
    sessionStorage.setItem('id', data.objectId);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('avatar', data.avatar);
}

function clearUserData() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('avatar');
}