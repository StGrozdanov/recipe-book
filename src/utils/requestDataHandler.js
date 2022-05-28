import { notify } from "./notification.js";

export async function handleRequest(fetchResponse, errorMessage) {
    const data = await fetchResponse.json();

    if (fetchResponse.ok) {
        return data;
    }

    notify(errorMessage);
    throw new Error(data.error);
}