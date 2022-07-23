import { AUTHENTICATE_FIRST } from "../constants/errorMessages.js";
import { logout, refreshToken, userIsAuthenticated } from "../services/authenticationService.js";
import { notify } from "./notification.js";
import page from '../../node_modules/page/page.mjs';
import { blockedUserPage } from "../views/blockedUserView.js";

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
    } else if (fetchResponse.status === 401) {
        sessionStorage.clear();
        sessionStorage.setItem('blockedFor', data.message);
        page.redirect('/blocked');
    } else {
        if (refreshTokenUsed) {
            refreshTokenUsed = false;
        }
        notify(errorMessage);
        throw new Error(data.error);
    }
}