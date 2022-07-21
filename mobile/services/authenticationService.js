import { BASE_URL, BASE_HEADERS, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTHENTICATION_END_POINT = '/authenticate';

const AUTHENTICATION_END_POINTS = {
    LOGIN: `${AUTHENTICATION_END_POINT}/login`,
    LOGOUT: `${AUTHENTICATION_END_POINT}/logout`,
    REFRESH_TOKEN: `${AUTHENTICATION_END_POINT}/token/refresh`,
}

export async function login(loginData) {
    const response = await fetch(BASE_URL + AUTHENTICATION_END_POINTS.LOGIN, {
        method: 'POST',
        headers: BASE_HEADERS,
        body: JSON.stringify(loginData)
    });
    return await response.json();
}

export async function logout() {
    const response = await fetch(BASE_URL + AUTHENTICATION_END_POINTS.LOGOUT, {
        method: 'POST',
        headers: MODIFIYNG_OPERATIONS_HEADERS(await getUserToken())
    });
    if (response.ok) {
        console.log('logout success');
    } else {
        const data = await response.json();
        if (data.status === 403) {
            await refreshToken();
            await logout();
        } else {
            console.log(data.message);
            throw new Error(data.error);
        }
    }
}

export async function checkCredentials(userId, password) {
    const response = await fetch(BASE_URL + AUTHENTICATION_END_POINTS.CHECK_CREDENTIALS(userId), {
        method: 'POST',
        headers: MODIFIYNG_OPERATIONS_HEADERS(await getUserToken()),
        body: JSON.stringify(password)
    });
    return response;
}

export async function refreshToken() {
    const response = await fetch(BASE_URL + AUTHENTICATION_END_POINTS.REFRESH_TOKEN, {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(await getRefreshToken()),
    });
    const data = await response.json();
    if (response.ok) {
        const user = await AsyncStorage.getItem('user');
        const userData = JSON.parse(user);

        userData.sessionToken = data.sessionToken;
        userData.refreshToken = data.refreshToken;

        await AsyncStorage.setItem('user', JSON.stringify(userData));
    } else {
        throw new Error(data.error);
    }
}

async function getRefreshToken() {
    const user = await AsyncStorage.getItem('user');
    const refreshToken = JSON.parse(user).refreshToken;

    return refreshToken;
}

export async function getUserToken() {
    const user = await AsyncStorage.getItem('user');
    const userToken = JSON.parse(user).sessionToken;

    if (userToken) {
        return userToken;
    }

    return null;
}

export async function getCurrentUser() {
    const user = await AsyncStorage.getItem('user');
    const userId = JSON.parse(user).id;

    return Number(userId);
}