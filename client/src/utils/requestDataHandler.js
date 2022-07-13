import { refreshToken } from "../services/authenticationService.js";
import { notify } from "./notification.js";

export async function handleRequest(fetchResponse, errorMessage) {
    const data = await fetchResponse.json();

    if (fetchResponse.ok) {
        return data;
    }

    if (data.status === 401) {
        try {
            await refreshToken();
        } catch (e) {
            if (errorMessage == 'Не можете да коментирате') {
                return 'Authenticate first';
            }
        }
    } else {
        notify(errorMessage);
        throw new Error(data.error);
    }
}