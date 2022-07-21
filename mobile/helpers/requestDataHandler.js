import { AUTHENTICATE_FIRST } from "../constants/errorMessages.js";
import { refreshToken } from "../services/authenticationService.js";

let refreshTokenUsed = false;

export async function handleRequest(fetchResponse, errorMessage, callback) {
    let data = await fetchResponse.json();

    if (fetchResponse.ok) {
        return data;
    }

    if (data.status === 403 && !refreshTokenUsed) {
        try {
            await refreshToken();
            refreshTokenUsed = true;
            return callback.call();
        } catch (e) {
            if (errorMessage == AUTHENTICATE_FIRST) {
                return AUTHENTICATE_FIRST;
            }
        }
    } else {
        if (refreshTokenUsed) {
            refreshTokenUsed = false;
        }
        console.log(errorMessage);
        throw new Error(data.error);
    }
}