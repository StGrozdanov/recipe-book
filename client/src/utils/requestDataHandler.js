import { refreshToken } from "../services/authenticationService.js";
import { notify } from "./notification.js";

export async function handleRequest(fetchResponse, errorMessage) {
    const data = await fetchResponse.json();

    if (fetchResponse.ok) {
        return data;
    }

    if (data.status === 401) {
        await refreshToken();
    } else {
        notify(errorMessage);
        throw new Error(data.error);
    }
}