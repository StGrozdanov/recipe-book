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
    return response;
}

export async function login(loginData) {
    const response = await fetch(BASE_URL + AUTHENTICATION_END_POINTS.LOGIN, {
        method: 'POST',
        headers: BASE_HEADERS,
        body: JSON.stringify(loginData)
    });
    await handleUserRequest(response);
    return response;
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
    return sessionStorage.getItem('sessionToken');
}

export function userIsAdministrator() {
    return sessionStorage.getItem('isAdministrator');
}

export function userIsModerator() {
    return sessionStorage.getItem('isModerator')
}

function saveUserData(data) {
    sessionStorage.setItem('sessionToken', data.sessionToken);
    sessionStorage.setItem('refreshToken', data.refreshToken);
    sessionStorage.setItem('id', data.id);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('avatarUrl', data.avatarUrl);
    sessionStorage.setItem('coverPhotoUrl', data.coverPhotoUrl);
    sessionStorage.setItem('isModerator', data.moderator);
    sessionStorage.setItem('isAdministrator', data.administrator);
    sessionStorage.setItem('email', data.email);
}

function clearUserData() {
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('avatarUrl');
    sessionStorage.removeItem('coverPhotoUrl');
    sessionStorage.removeItem('isModerator');
    sessionStorage.removeItem('isAdministrator');
    sessionStorage.removeItem('email');
}

async function handleUserRequest(requestResponse) {
    if (requestResponse.ok) {
        const data = await requestResponse.json();
        saveUserData(data);
    }
}

async function handleUserRequestError(requestResponse) {
    const error = await requestResponse.json();
    notify(error.error);
    throw new Error(error.error);
}