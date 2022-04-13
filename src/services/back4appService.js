export const BASE_URL = 'https://parseapi.back4app.com';

export const BASE_HEADERS = {
    'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
    'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
}

export const REGISTRY_HEADERS = {
    'X-Parse-Revocable-Session': '1',
    'Content-Type': 'application/json'
}

export const REGISTRY_HEADERS_CRUD = {
    'X-Parse-Session-Token': `${sessionStorage.getItem('authToken')}`,
    'Content-Type': 'application/json'
}