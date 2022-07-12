import { notify } from "../utils/notification.js";
import { BASE_URL, BASE_HEADERS, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { getUserToken } from "./userService.js";

const AUTHENTICATION_END_POINT = '/authenticate';

const AUTHENTICATION_END_POINTS = {
    REGISTER: `${AUTHENTICATION_END_POINT}/register`,
    LOGIN: `${AUTHENTICATION_END_POINT}/login`,
    LOGOUT: `${AUTHENTICATION_END_POINT}/logout`,
}

export async function register(registrationData) {
    const response = await fetch(BASE_URL + AUTHENTICATION_END_POINTS.REGISTER, {
        method: 'POST',
        headers: BASE_HEADERS,
        body: JSON.stringify(registrationData)
    });
    await handleUserRequest(response);
}

export async function login(loginData) {
    const response = await fetch(BASE_URL + AUTHENTICATION_END_POINTS.LOGIN, {
        method: 'POST',
        headers: BASE_HEADERS,
        body: JSON.stringify(loginData)
    });
    await handleUserRequest(response);
}

export async function logout() {
    const response = await fetch(BASE_URL + AUTHENTICATION_END_POINTS.LOGOUT, {
        method: 'POST',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });
    if (response.ok) {
        clearUserData();
    } else {
        await handleUserRequestError(response);
    }
}

export function userIsAuthenticated() {
    return sessionStorage.getItem('email');
}

function saveUserData(data) {
    sessionStorage.setItem('sessionToken', data.sessionToken);
    sessionStorage.setItem('refreshToken', data.refreshToken);
    sessionStorage.setItem('id', data.id);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('avatarUrl', data.avatarUrl);
    sessionStorage.setItem('coverPhotoUrl', data.coverPhotoUrl);
}

function clearUserData() {
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('avatarUrl');
    sessionStorage.removeItem('coverPhotoUrl');
}

async function handleUserRequest(requestResponse) {
    const data = await requestResponse.json();

    if (requestResponse.ok) {
        saveUserData(data);
        return requestResponse;
    } else {
        notify(data.error);
        throw new Error(data.error);
    }
}

async function handleUserRequestError(requestResponse) {
    const error = await requestResponse.json();
    notify(error.error);
    throw new Error(error.error);
}