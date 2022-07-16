import { notify } from "../utils/notification.js";
import { BASE_URL, BASE_HEADERS, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";

const AUTHENTICATION_END_POINT = '/authenticate';

const AUTHENTICATION_END_POINTS = {
    REGISTER: `${AUTHENTICATION_END_POINT}/register`,
    LOGIN: `${AUTHENTICATION_END_POINT}/login`,
    LOGOUT: `${AUTHENTICATION_END_POINT}/logout`,
    REFRESH_TOKEN: `${AUTHENTICATION_END_POINT}/token/refresh`
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
        if (data.status === 403) {
            refreshToken();
        } else {
            notify(errorMessage);
            throw new Error(data.error);
        }
    }
}

export async function refreshToken() {
    const response = await fetch(BASE_URL + AUTHENTICATION_END_POINTS.REFRESH_TOKEN, {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getRefreshToken()),
    });
    const data = await response.json();
    if (response.ok) {
        sessionStorage.setItem('sessionToken', data.sessionToken);
        sessionStorage.setItem('refreshToken', data.refreshToken);
    } else {
        throw new Error(data.error);
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

export function saveUserData(data) {
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

export function clearUserData() {
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

function getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
}

export function getUserToken() {
    const userToken = sessionStorage.getItem('sessionToken');

    if (userToken) {
        return userToken;
    }

    return null;
}

export function getCurrentUser() {
    return Number(sessionStorage.getItem('id'));
}

export function getCurrentUserUsername() {
    return sessionStorage.getItem('username');
}

export function getCurrentUserAvatar() {
    return sessionStorage.getItem('avatarUrl');
}

export function getCurrentUserEmail() {
    return sessionStorage.getItem('email');
}