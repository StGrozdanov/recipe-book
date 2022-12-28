export async function createMobilePushNotification(subject, content) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            appId: process.env.REACT_APP_NATIVE_NOTIFY_APP_ID,
            appToken: process.env.REACT_APP_NATIVE_NOTIFY_APP_TOKEN,
            title: subject,
            body: content,
        })
    };
    await fetch(process.env.REACT_APP_NATIVE_NOTIFY_URL, options);
}