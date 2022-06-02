import { COULD_NOT_FIND_USER } from "../constants/errorMessages.js";
import { notify } from "../utils/notification.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { USER_AUTHORIZATION_BASE_HEADERS, BASE_URL, BASE_HEADERS, MODIFIYNG_OPERATIONS_HEADERS } from "./back4appService.js";

const USERS_END_POINTS = {
    REGISTER: '/users',
    LOGIN: '/login',
    LOGOUT: '/logout',
    UPDATE: (id) => { return `/users/${id}` },
    DELETE: (id) => { return `/users/${id}` },
    USER_INFO: (id) => { return `/parse/users/${id}` },
}

export async function register({ username, email, password }) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.REGISTER, {
        method: 'POST',
        headers: USER_AUTHORIZATION_BASE_HEADERS,
        body: JSON.stringify({ username: username, email: email, password: password })
    });
    await handleUserRequest(response);
}

export async function login({ username, password }) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.LOGIN, {
        method: 'POST',
        headers: USER_AUTHORIZATION_BASE_HEADERS,
        body: JSON.stringify({ username: username, password: password })
    });
    await handleUserRequest(response);
}

export async function logout() {
    const response = await fetch(BASE_URL + USERS_END_POINTS.LOGOUT, {
        method: 'POST',
        headers: USER_AUTHORIZATION_BASE_HEADERS
    });
    if (response.ok) {
        clearUserData();
    } else {
        await handleUserRequestError(response);
    }
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
    if (response.ok) {
        clearUserData();
        let userData = { username: username, email: email, avatar: avatar, coverPhoto: coverPhoto }
        saveUserData(userData);
    } else {
        await handleUserRequestError(response);
    }
}

export async function remove(userId) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.DELETE(userId), {
        method: 'DELETE',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });
    if (response.ok) {
        clearUserData();
    } else {
        await handleUserRequestError(response);
    }
}

export async function getUser(userId) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.USER_INFO(userId), {
        method: 'GET',
        headers: getUserToken() ? MODIFIYNG_OPERATIONS_HEADERS(getUserToken()) : BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_FIND_USER);
}

function saveUserData(data) {
    sessionStorage.setItem('authToken', data.sessionToken);
    sessionStorage.setItem('id', data.objectId);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('avatar', data.avatar);
    sessionStorage.setItem('coverPhoto', data.coverPhoto);
}

function clearUserData() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('avatar');
    sessionStorage.removeItem('coverPhoto');
}

export function getUserToken() {
    const userToken = sessionStorage.getItem('authToken');

    if (userToken) {
        return userToken;
    }

    return null;
}

export function userIsAuthenticated() {
    return sessionStorage.getItem('email');
}

export function getCurrentUser() {
    return sessionStorage.getItem('id');
}

async function handleUserRequest(requestResponse) {
    const data = await requestResponse.json();
    console.log(data);

    if (requestResponse.ok) {
        saveUserData(data);
    } else {
        notify(data.error);
        throw new Error(data.error);
    }
}

async function handleUserRequestError(requestResponse) {
    const error = await response.json();
    notify(error.error);
    throw new Error(error.error);
}