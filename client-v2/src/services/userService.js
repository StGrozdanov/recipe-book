import { COULD_NOT_FETCH_USER_COUNT, COULD_NOT_FIND_USER } from "../constants/errorMessages.js";
import { notify } from "../utils/notification.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { getCurrentUser, getCurrentUserEmail, getCurrentUserUsername, getUserToken, refreshToken } from "./authenticationService.js";
import { BASE_URL, BASE_HEADERS, MODIFIYNG_OPERATIONS_HEADERS, CALLBACK } from "./customService.js";

const USER_END_POINT = '/users'

const USERS_END_POINTS = {
    UPDATE: (userId) => `${USER_END_POINT}/profile/${userId}`,
    DELETE: (userId) => `${USER_END_POINT}/${userId}`,
    USER_INFO: (userId) => `${USER_END_POINT}/profile/${userId}`,
    EXISTS_BY_USERNAME: (username) => `${USER_END_POINT}/existsByUsername?username=${username}`,
    EXISTS_BY_EMAIL: (email) => `${USER_END_POINT}/existsByEmail?email=${email}`,
    OTHER_EXISTS_BY_USERNAME: (username, userUsername) => {
        return `${USER_END_POINT}/otherExistsByUsername?username=${username}&userUsername=${userUsername}`;
    },
    OTHER_EXISTS_BY_EMAIL: (email, userEmail) => {
        return `${USER_END_POINT}/otherExistsByEmail?email=${email}&userEmail=${userEmail}`;
    },
    CHANGE_PASSWORD: (userId) => `${USER_END_POINT}/changePassword/${userId}`,
    USERS_COUNT: `${USER_END_POINT}/count`,
    GET_ALL_USERS: (page) => `${USER_END_POINT}?skip=${(page - 1)}`,
    UPDATE_AS_ADMIN: (userId) => `${USER_END_POINT}/administrate/profile/${userId}`,
    BLOCK_USER: `${USER_END_POINT}/block`,
    UNBLOCK_USER: (userId) => `${USER_END_POINT}/unblock/${userId}`,
    CHANGE_ROLE: (userId) => `${USER_END_POINT}/change-role/${userId}`,
    SEARCH_USERS: (query, page) => {
       return `${USER_END_POINT}/search-by-username?whereUsername=${query}&skip=${(page - 1)}`
    },
}

export async function update(userId, formData) {
    const options = {
        method: 'PUT',
        headers: { "Authorization": `Bearer ${getUserToken()}` },
        body: formData
    };
    return await fetch(`${BASE_URL}${USERS_END_POINTS.UPDATE(userId)}`, options);
}

export async function updateAsAdmin(userId, formData) {
    const options = {
        method: 'PUT',
        headers: { "Authorization": `Bearer ${getUserToken()}` },
        body: formData
    };
    return await fetch(`${BASE_URL}${USERS_END_POINTS.UPDATE_AS_ADMIN(userId)}`, options);
}

export async function remove(userId) {
    CALLBACK.call = () => remove(userId);

    const response = await fetch(BASE_URL + USERS_END_POINTS.DELETE(userId), {
        method: 'DELETE',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });

    return handleRequest(response, COULD_NOT_FIND_USER, CALLBACK);
}

export async function getUser(userId) {
    CALLBACK.call = () => getUser(userId);

    const response = await fetch(BASE_URL + USERS_END_POINTS.USER_INFO(userId), {
        method: 'GET',
        headers: getUserToken() ? MODIFIYNG_OPERATIONS_HEADERS(getUserToken()) : BASE_HEADERS
    });

    return handleRequest(response, COULD_NOT_FIND_USER, CALLBACK);
}

export async function userExistsByUsername(username) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.EXISTS_BY_USERNAME(username));
    if (response.ok) {
        return response.json();
    }
}

export async function userExistsByEmail(email) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.EXISTS_BY_EMAIL(email));
    if (response.ok) {
        return response.json();
    }
}

export async function otherUserExistsByUsername(username, currentUserUsername) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.OTHER_EXISTS_BY_USERNAME(username, currentUserUsername));

    if (response.ok) {
        return response.json();
    }
}

export async function otherUserExistsByEmail(email, currentUserEmail) {
    const response = await fetch(BASE_URL + USERS_END_POINTS.OTHER_EXISTS_BY_EMAIL(email, currentUserEmail));

    if (response.ok) {
        return response.json();
    }
}

export async function changeUserPassword(data) {
    const options = {
        method: 'PATCH',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify(data)
    };
    
    return await fetch(`${BASE_URL}${USERS_END_POINTS.CHANGE_PASSWORD(getCurrentUser())}`, options);
}

export async function getTotalUsersCount() {
    CALLBACK.call = () => getTotalUsersCount();

    const response = await fetch(`${BASE_URL}${USERS_END_POINTS.USERS_COUNT}`, {
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
    });

    return handleRequest(response, COULD_NOT_FIND_USER, CALLBACK);
}

export async function getAllUsers(page) {
    CALLBACK.call = () => getAllUsers(page);

    const response = await fetch(BASE_URL + USERS_END_POINTS.GET_ALL_USERS(page), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });

    return handleRequest(response, COULD_NOT_FETCH_USER_COUNT, CALLBACK);
}

export async function blockUser(id, reason) {
    CALLBACK.call = () => blockUser(id, reason);

    const response = await fetch(BASE_URL + USERS_END_POINTS.BLOCK_USER, {
        method: 'PATCH',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify({ id, reason })
    });

    return handleRequest(response, COULD_NOT_FIND_USER, CALLBACK);
}

export async function unblockUser(userId) {
    CALLBACK.call = () => unblockUser(userId);

    const response = await fetch(BASE_URL + USERS_END_POINTS.UNBLOCK_USER(userId), {
        method: 'PATCH',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });

    return handleRequest(response, COULD_NOT_FIND_USER, CALLBACK);
}

export async function changeUserRole(userId, role) {
    CALLBACK.call = () => changeUserRole(userId);

    const response = await fetch(BASE_URL + USERS_END_POINTS.CHANGE_ROLE(userId), {
        method: 'PATCH',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify({ role })
    });
    return handleRequest(response, COULD_NOT_FIND_USER, CALLBACK);
}

export async function searchUsersByUsername(page, query) {
    CALLBACK.call = () => searchUsersByUsername(page, query);

    const response = await fetch(BASE_URL + USERS_END_POINTS.SEARCH_USERS(query, page), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });

    return handleRequest(response, COULD_NOT_FETCH_USER_COUNT, CALLBACK);
}