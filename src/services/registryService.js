import { notify } from "../views/templates/notificationTemplate.js";
import { BASE_HEADERS, BASE_URL, REGISTRY_HEADERS, REGISTRY_HEADERS_CRUD } from "./back4appService.js";

const REGISTRY_END_POINTS = {
    REGISTER: '/users',
    LOGIN: '/login',
    LOGOUT: '/logout',
    UPDATE: (id) => { return `/users/${id}` },
    DELETE: (id) => { return `/users/${id}` },
}

const REGISTRY_AUTHORIZATION_BASE = {
    ...BASE_HEADERS, 
    ...REGISTRY_HEADERS
}

export const REGISTRY_AUTHORIZATION_UPDATE_DELETE = {
    ...BASE_HEADERS,
    ...REGISTRY_HEADERS_CRUD
}

export async function register(username, email, password) {
    const response = await fetch(BASE_URL + REGISTRY_END_POINTS.REGISTER, {
        method: 'POST',
        headers: REGISTRY_AUTHORIZATION_BASE,
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
    const response = await fetch(BASE_URL + REGISTRY_END_POINTS.LOGIN, {
        method: 'POST',
        headers: REGISTRY_AUTHORIZATION_BASE,
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
    const response = await fetch(BASE_URL + REGISTRY_END_POINTS.LOGOUT, {
        method: 'POST',
        headers: REGISTRY_AUTHORIZATION_BASE
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
    const response = await fetch(BASE_URL + REGISTRY_END_POINTS.UPDATE(userId), {
        method: 'PUT',
        headers: REGISTRY_AUTHORIZATION_UPDATE_DELETE,
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
    const response = await fetch(BASE_URL + REGISTRY_END_POINTS.DELETE(userId), {
        method: 'DELETE',
        headers: REGISTRY_AUTHORIZATION_UPDATE_DELETE
    });
    if (response.ok) {
        clearUserData();
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}

function saveUserData(data) {
    sessionStorage.setItem('authToken', data.sessionToken);
    sessionStorage.setItem('id', data.objectId);
    sessionStorage.setItem('username', data.username);
}

function clearUserData() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
}