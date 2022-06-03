import { COULD_NOT_GET_NOTIFICATIONS, COULD_NOT_MARK_NOTIFICATION, COULD_NOT_POST_NOTIFICATION } from "../constants/errorMessages.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { BASE_HEADERS, BASE_URL, MODIFIYNG_OPERATIONS_HEADERS } from "./back4appService.js";
import { createQuery } from "./recipeService.js";
import { getUserToken } from "./userService.js";

export const NOTIFICATION_END_POINT = '/classes/Notification';

const NOTIFICATIONS_END_POINTS = {
    GET_USER_NOTIFICATIONS: (userId) => {
        return `${NOTIFICATION_END_POINT}?where=${
            createQuery({ 'receiverId': `${userId}`, 'isMarkedAsRead': { '$eq': false } })
        }`
    },
    CREATE_NOTIFICATION: NOTIFICATION_END_POINT,
    MARK_AS_READ: (notificationId) => { return `${NOTIFICATION_END_POINT}/${notificationId}` }
}

export async function getMyNotifications(userId) {
    const response = await fetch(BASE_URL + NOTIFICATIONS_END_POINTS.GET_USER_NOTIFICATIONS(userId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_NOTIFICATIONS);
}

export async function createNotification({action, senderId, senderName, senderAvatar, receiverId, locationId, locationName}) {
    const notificationData = {
        action,
        senderId, 
        senderName, 
        senderAvatar,
        receiverId,
        locationId,
        locationName 
    }

    const options = {
        method: 'POST',
        headers: {
            ...MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationData)
    };

    const response = await fetch(BASE_URL + NOTIFICATIONS_END_POINTS.CREATE_NOTIFICATION, options);
    return handleRequest(response, COULD_NOT_POST_NOTIFICATION);
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