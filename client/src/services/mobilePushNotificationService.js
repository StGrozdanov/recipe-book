import { APP_ID, APP_TOKEN, BASE_URL } from "./nativeNotifyService.js";

export async function createMobilePushNotification(subject, content) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            appId: APP_ID,
            appToken: APP_TOKEN,
            title: subject,
            body: content,
        })
    };
    await fetch(BASE_URL, options);
}