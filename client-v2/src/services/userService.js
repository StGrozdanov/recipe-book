import { BASE_URL } from "./customService.js";
import * as send from "../utils/requestDataHandler.js";

const USER_END_POINT = '/users'

const END_POINT = {
    UPDATE: (userId) => `${BASE_URL + USER_END_POINT}/profile/${userId}`,
    DELETE: (userId) => `${BASE_URL + USER_END_POINT}/${userId}`,
    USER_INFO: (userId) => `${BASE_URL + USER_END_POINT}/profile/${userId}`,
    EXISTS_BY_USERNAME: (username) => `${BASE_URL + USER_END_POINT}/existsByUsername?username=${username}`,
    EXISTS_BY_EMAIL: (email) => `${BASE_URL + USER_END_POINT}/existsByEmail?email=${email}`,
    OTHER_EXISTS_BY_USERNAME: (username, userUsername) => {
        return `${BASE_URL + USER_END_POINT}/otherExistsByUsername?username=${username}&userUsername=${userUsername}`;
    },
    OTHER_EXISTS_BY_EMAIL: (email, userEmail) => {
        return `${BASE_URL + USER_END_POINT}/otherExistsByEmail?email=${email}&userEmail=${userEmail}`;
    },
    CHANGE_PASSWORD: (userId) => `${BASE_URL + USER_END_POINT}/changePassword/${userId}`,
    USERS_COUNT: `${BASE_URL + USER_END_POINT}/count`,
    GET_ALL_USERS: (page) => `${BASE_URL + USER_END_POINT}?skip=${(page - 1)}`,
    UPDATE_AS_ADMIN: (userId) => `${BASE_URL + USER_END_POINT}/administrate/profile/${userId}`,
    BLOCK_USER: `${BASE_URL + USER_END_POINT}/block`,
    UNBLOCK_USER: (userId) => `${BASE_URL + USER_END_POINT}/unblock/${userId}`,
    CHANGE_ROLE: (userId) => `${BASE_URL + USER_END_POINT}/change-role/${userId}`,
    SEARCH_USERS: (query, page) => {
       return `${BASE_URL + USER_END_POINT}/search-by-username?whereUsername=${query}&skip=${(page - 1)}`
    },
}

export const update = (userId, formData) => send.authPUT(END_POINT.UPDATE(userId), formData);

export const updateAsAdmin = (userId, formData) => send.authPUT(END_POINT.UPDATE_AS_ADMIN(userId), formData);

export const remove = (userId) => send.authDELETE(END_POINT.DELETE(userId));

export const getUser = (userId) => send.authGET(END_POINT.USER_INFO(userId));

export const userExistsByUsername = (username) => send.GET(END_POINT.EXISTS_BY_USERNAME(username));

export const otherUserExistsByUsername = (username, currentUserUsername) => send.GET(END_POINT.OTHER_EXISTS_BY_USERNAME(username, currentUserUsername));

export const userExistsByEmail = (email) => send.GET(END_POINT.EXISTS_BY_EMAIL(email));

export const otherUserExistsByEmail = (email, currentUserEmail) => send.GET(END_POINT.OTHER_EXISTS_BY_EMAIL(email, currentUserEmail));

export const changeUserPassword = (userId, data) => send.authPATCH(END_POINT.CHANGE_PASSWORD(userId), data);

export const getTotalUsersCount = () => send.authGET(END_POINT.USERS_COUNT);

export const getAllUsers = (page) => send.authGET(END_POINT.GET_ALL_USERS(page));

export const blockUser = (userId, reason) => send.authPATCH(END_POINT.BLOCK_USER, { userId, reason });

export const unblockUser = (userId) => send.authPATCH(END_POINT.UNBLOCK_USER(userId));

export const changeUserRole = (userId, role) => send.authPATCH(END_POINT.CHANGE_ROLE(userId), role);

export const searchUsersByUsername = (page, query) => send.authGET(END_POINT.SEARCH_USERS(query, page));