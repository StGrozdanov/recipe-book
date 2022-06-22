import { COULD_NOT_GET_NOTIFICATIONS, COULD_NOT_MARK_NOTIFICATION } from "../constants/errorMessages.js";
import { handleRequest } from "../helpers/requestDataHandler.js";
import { BASE_HEADERS, BASE_URL, MODIFIYNG_OPERATIONS_HEADERS } from "./back4appService.js";
import { getUserToken } from "./userService.js";

export const NOTIFICATION_END_POINT = '/classes/Notification';

const NOTIFICATIONS_END_POINTS = {
    GET_USER_NOTIFICATIONS: (userId) => {
        return `${NOTIFICATION_END_POINT}?where=${
            createQuery({ 'receiverId': `${userId}`, 'isMarkedAsRead': { '$eq': false } })
        }`
    },
    MARK_AS_READ: (notificationId) => { return `${NOTIFICATION_END_POINT}/${notificationId}` }
}

export async function getMyNotifications(userId) {
    const response = await fetch(BASE_URL + NOTIFICATIONS_END_POINTS.GET_USER_NOTIFICATIONS(userId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_NOTIFICATIONS);
}

export async function markNotificationAsRead(notificationId) {
    const options = {
        method: 'PUT',
        headers: {
            ...MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isMarkedAsRead: true })
    };
    const response = await fetch(BASE_URL + NOTIFICATIONS_END_POINTS.MARK_AS_READ(notificationId), options);
    return handleRequest(response, COULD_NOT_MARK_NOTIFICATION);
}

export function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query));
}