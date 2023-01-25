import { BASE_URL } from "./customService.js";
import * as send from "../utils/requestDataHandler.js";

export const NOTIFICATION_END_POINT = '/notifications';

const END_POINTS = {
    GET_USER_NOTIFICATIONS: (userId) => `${BASE_URL + NOTIFICATION_END_POINT}/${userId}`,
    CREATE_NOTIFICATION: BASE_URL + NOTIFICATION_END_POINT,
    MARK_AS_READ: (notificationId) => `${BASE_URL + NOTIFICATION_END_POINT}/${notificationId}`,
    USER_NOTIFICATIONS_COUNT: (userId) => `${BASE_URL + NOTIFICATION_END_POINT}/${userId}/count`,
}

export const getMyNotifications = (userId) => send.authGET(END_POINTS.GET_USER_NOTIFICATIONS(userId));

export const getMyNotificationsCount = (userId) => send.authGET(END_POINTS.USER_NOTIFICATIONS_COUNT(userId));

export const createNotification = (data) => send.authPOST(END_POINTS.CREATE_NOTIFICATION, data);

export const markNotificationAsRead = (notificationId) => send.authPATCH(END_POINTS.MARK_AS_READ(notificationId));