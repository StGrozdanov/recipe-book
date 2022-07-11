import { COULD_NOT_GET_NOTIFICATIONS, COULD_NOT_MARK_NOTIFICATION, COULD_NOT_POST_NOTIFICATION } from "../constants/errorMessages.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { BASE_URL, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { getCurrentUser, getUserToken } from "./userService.js";

export const NOTIFICATION_END_POINT = '/notifications';

const NOTIFICATIONS_END_POINTS = {
    GET_USER_NOTIFICATIONS: (userId) => { return `${NOTIFICATION_END_POINT}/${userId}` },
    CREATE_NOTIFICATION: NOTIFICATION_END_POINT,
    MARK_AS_READ: (notificationId) => { return `${NOTIFICATION_END_POINT}/${notificationId}` }
}

export async function getMyNotifications() {
    const response = await fetch(BASE_URL + NOTIFICATIONS_END_POINTS.GET_USER_NOTIFICATIONS(getCurrentUser()), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
    });
    return handleRequest(response, COULD_NOT_GET_NOTIFICATIONS);
}

export async function createNotification(notificationData) {
    const options = {
        method: 'POST',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify(notificationData)
    };

    const response = await fetch(BASE_URL + NOTIFICATIONS_END_POINTS.CREATE_NOTIFICATION, options);
    return handleRequest(response, COULD_NOT_POST_NOTIFICATION);
}

export async function markNotificationAsRead(notificationId) {
    const options = {
        method: 'PATCH',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
    };
    const response = await fetch(BASE_URL + NOTIFICATIONS_END_POINTS.MARK_AS_READ(notificationId), options);
    return handleRequest(response, COULD_NOT_MARK_NOTIFICATION);
}