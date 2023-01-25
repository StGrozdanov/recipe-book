import * as send from '../utils/requestDataHandler';

export const createMobilePushNotification = (subject, content) => {
    const data = {
        appId: process.env.REACT_APP_NATIVE_NOTIFY_APP_ID,
        appToken: process.env.REACT_APP_NATIVE_NOTIFY_APP_TOKEN,
        title: subject,
        body: content,
    };

    send.POST(process.env.REACT_APP_NATIVE_NOTIFY_URL, data)
}