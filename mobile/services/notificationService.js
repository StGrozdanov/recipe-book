import { COULD_NOT_GET_NOTIFICATIONS, COULD_NOT_MARK_NOTIFICATION } from "../constants/errorMessages.js";
import { handleRequest } from "../helpers/requestDataHandler.js";
import { BASE_URL, CALLBACK, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { getCurrentUser, getUserToken } from "./authenticationService.js";

export const NOTIFICATION_END_POINT = '/notifications';

const NOTIFICATIONS_END_POINTS = {
    GET_USER_NOTIFICATIONS: (userId) => `${NOTIFICATION_END_POINT}/${userId}`,
    MARK_AS_READ: (notificationId) => `${NOTIFICATION_END_POINT}/${notificationId}`,
    USER_NOTIFICATIONS_COUNT: (userId) => `${NOTIFICATION_END_POINT}/${userId}/count`,
}

export async function getMyNotifications() {
    CALLBACK.call = () => getMyNotifications();

    const response = await fetch(BASE_URL + NOTIFICATIONS_END_POINTS.GET_USER_NOTIFICATIONS(await getCurrentUser()), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(await getUserToken()),
    });

    return handleRequest(response, COULD_NOT_GET_NOTIFICATIONS, CALLBACK);
}

export async function getMyNotificationsCount() {
    CALLBACK.call = () => getMyNotificationsCount();

    const response = await fetch(BASE_URL + NOTIFICATIONS_END_POINTS.USER_NOTIFICATIONS_COUNT(await getCurrentUser()), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(await getUserToken()),
    });

    return handleRequest(response, COULD_NOT_GET_NOTIFICATIONS, CALLBACK);
}

export async function markNotificationAsRead(notificationId) {
    CALLBACK.call = () => markNotificationAsRead(notificationId);

    const options = {
        method: 'PATCH',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
    };
    
    const response = await fetch(BASE_URL + NOTIFICATIONS_END_POINTS.MARK_AS_READ(notificationId), options);
    return handleRequest(response, COULD_NOT_MARK_NOTIFICATION, CALLBACK);
}