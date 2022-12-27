import { AUTHENTICATE_FIRST } from "../constants/errorMessages.js";
import { refreshToken } from "../services/authenticationService.js";
// import { notify } from "./notification.js";

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
    } 
    // else if (fetchResponse.status === 401) {
    //     sessionStorage.clear();
    //     sessionStorage.setItem('blockedFor', data.message);
    //     page.redirect('/blocked');
    // } 
    // else if (data.status === 404) {
    //     page.redirect('*');
    // } 
    else {
        if (refreshTokenUsed) {
            refreshTokenUsed = false;
        }
        // notify(errorMessage);
        throw new Error(data.error);
    }
}