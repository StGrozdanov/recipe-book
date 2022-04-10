import { notify } from "../views/templates/notificationTemplate.js";

export const REGISTRY_URL = 'https://parseapi.back4app.com';

const endPoints = {
    register: '/users',
    login: '/login',
    logout: '/logout',
    update: (id) => { return `/users/${id}` },
    delete: (id) => { return `/users/${id}` },
}

export async function register(username, email, password) {
    const response = await fetch(REGISTRY_URL + endPoints.register, {
        method: 'POST',
        headers: { 
        'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea', 
        'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
        'X-Parse-Revocable-Session': '1',
        'Content-Type': 'application/json' 
    },
        body: JSON.stringify({ username: username, email: email, password: password })
    });
    if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('authToken', data.sessionToken);
        sessionStorage.setItem('id', data.objectId);
        sessionStorage.setItem('username', username);
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}

export async function login(username, password) {
    const response = await fetch(REGISTRY_URL + endPoints.login, {
        method: 'POST',
        headers: { 
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea', 
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
            'X-Parse-Revocable-Session': '1'
        },
        body: JSON.stringify({ username: username, password: password })
    });
    if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('authToken', data.sessionToken);
        sessionStorage.setItem('id', data.objectId);
        sessionStorage.setItem('username', username);
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}

export async function logout() {
    const response = await fetch(REGISTRY_URL + endPoints.logout, {
        method: 'POST',
        headers: { 
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea', 
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
            'X-Parse-Revocable-Session': '1'
        }});
    if (response.ok) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}

export async function update(username, email, password, userId) {
    const response = await fetch(REGISTRY_URL + endPoints.update(userId), {
        method: 'PUT',
        headers: { 
        'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea', 
        'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
        'X-Parse-Session-Token': `${sessionStorage.getItem('authToken')}`,
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ username: username, email: email, password: password })
    });
    if (response.ok) {
        const data = await response.json();
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}

export async function remove(userId) {
    const response = await fetch(REGISTRY_URL + endPoints.delete(userId), {
        method: 'DELETE',
        headers: { 
        'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea', 
        'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
        'X-Parse-Session-Token': `${sessionStorage.getItem('authToken')}`
    }});
    if (response.ok) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
    } else {
        const error = await response.json();
        notify(error.error);
        throw new Error(error.error);
    }
}