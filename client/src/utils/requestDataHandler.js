import { AUTHENTICATE_FIRST } from "../constants/errorMessages.js";
import { refreshToken } from "../services/authenticationService.js";
import { notify } from "./notification.js";

export async function handleRequest(fetchResponse, errorMessage) {
    let data = await fetchResponse.json();

    if (fetchResponse.ok) {
        return data;
    }

    if (data.status === 403) {
        try {
            await refreshToken();
            return data;
        } catch (e) {
            if (errorMessage == AUTHENTICATE_FIRST) {
                return AUTHENTICATE_FIRST;
            }
        }
    } else {
        notify(errorMessage);
        throw new Error(data.error);
    }
}