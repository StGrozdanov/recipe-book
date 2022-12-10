import { NATIVE_NOTIFY_APP_ID, NATIVE_NOTIFY_APP_TOKEN, NATIVE_NOTIFY_URL } from "../utils/keys.js";

export async function createMobilePushNotification(subject, content) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            appId: NATIVE_NOTIFY_APP_ID,
            appToken: NATIVE_NOTIFY_APP_TOKEN,
            title: subject,
            body: content,
        })
    };
    await fetch(NATIVE_NOTIFY_URL, options);
}