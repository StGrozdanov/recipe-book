import { BASE_URL } from "./backendService.js";
import * as send from '../utils/requestDataHandler';

const AUTHENTICATION_END_POINT = '/authenticate';

const ENDPOINT = {
    REGISTER: `${BASE_URL + AUTHENTICATION_END_POINT}/register`,
    LOGIN: `${BASE_URL + AUTHENTICATION_END_POINT}/login`,
    LOGOUT: `${BASE_URL + AUTHENTICATION_END_POINT}/logout`,
    REFRESH_TOKEN: `${BASE_URL + AUTHENTICATION_END_POINT}/token/refresh`,
    CHECK_CREDENTIALS: (userId) => `${BASE_URL + AUTHENTICATION_END_POINT}/credentials-check/${userId}`,
    FORGOTTEN_PASSWORD: `${BASE_URL}/forgotten-password`,
    RESET_PASSWORD: (code) => `${BASE_URL}/password-reset/${code}`,
}

export const register = (registrationData) => send.POST(ENDPOINT.REGISTER, registrationData);

export const login = (loginData) => send.POST(ENDPOINT.LOGIN, loginData);

export const logout = () => send.authPOST(ENDPOINT.LOGOUT);

export const forgottenPassword = (email) => send.POST(ENDPOINT.FORGOTTEN_PASSWORD, { email });

export const requestPasswordReset = (code) => send.POST(ENDPOINT.RESET_PASSWORD(code));

export const resetPassword = (code, formData) => send.POST(ENDPOINT.RESET_PASSWORD(code), formData);

export const checkCredentials = (userId, password) => send.authPOST(ENDPOINT.CHECK_CREDENTIALS(userId), password);

export const refreshToken = async () => {
    try {
        const user = localStorage.getItem('user');
        const auth = JSON.parse(user || '{}');

        const response = await fetch(ENDPOINT.REFRESH_TOKEN, {
            headers: {
                'Authorization': `Bearer ${auth.refreshToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            const user = JSON.parse(localStorage.getItem('user'));
            user.sessionToken = data.sessionToken;
            user.refreshToken = data.refreshToken;
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            throw new Error(data.error);
        }
    } catch (err) {
        console.log(err);
    }
};