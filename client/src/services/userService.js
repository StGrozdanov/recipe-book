import { COULD_NOT_FIND_USER } from "../constants/errorMessages.js";
import { notify } from "../utils/notification.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { BASE_URL, BASE_HEADERS, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";

const USER_END_POINT = '/users'

const USERS_END_POINTS = {
    UPDATE: (userId) => `${USER_END_POINT}/profile/${userId}`,
    DELETE: (userId) => `${USER_END_POINT}/${userId}`,
    USER_INFO: (userId) => `${USER_END_POINT}/profile/${userId}`,
}

export async function update(userId, formData) {
    const options = {
        method: 'PUT',
        headers: { "Authorization": `Bearer ${getUserToken()}` },
        body: formData
    };

    const response = await fetch(`${BASE_URL}${USERS_END_POINTS.UPDATE(userId)}`, options);

    return handleRequest(response, COULD_NOT_FIND_USER);
    
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

async function handleUserRequestError(requestResponse) {
    const error = await requestResponse.json();
    notify(error.error);
    throw new Error(error.error);
}