import { AUTHENTICATE_FIRST } from "../constants/errorMessages.js";
import { refreshToken } from "../services/authenticationService.js";

let refreshTokenUsed = false;

const handleRequest = async (method, authRequest, URL, bodyData) => {
    let buildRequest;

    if (authRequest) {
        try {
            const user = localStorage.getItem('user');
            const auth = JSON.parse(user || '{}');

            let headers = {}

            if (auth.sessionToken) {
                headers["Authorization"] = `Bearer ${auth.sessionToken}`
            }

            if (method === 'GET') {
                buildRequest = fetch(URL, { ...headers, 'Content-Type': 'application/json' });
            } else {
                buildRequest = fetch(URL, {
                    method,
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                });
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (method === 'GET') {
            buildRequest = fetch(URL);
        } else {
            buildRequest = fetch(URL, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            });
        }
    }

    const response = await buildRequest;
    const data = await response.json();

    if (response.ok) {
        return data;
    }

    if (data.status === 403 && !refreshTokenUsed) {
        try {
            await refreshToken();
            refreshTokenUsed = true;
            this.call();
        } catch (e) {
            if (e.message == AUTHENTICATE_FIRST) {
                return AUTHENTICATE_FIRST;
            }
        }
    }
    else if (data.status === 401) {
        localStorage.removeItem('user');
        localStorage.setItem('blockedFor', JSON.stringify(data.message));
        // navigate('/blocked');
    }
    else if (data.status === 404) {
        // navigate('*');
    }
    else {
        if (refreshTokenUsed) {
            refreshTokenUsed = false;
        }
        throw new Error(data.error);
    }
}

export const GET = handleRequest.bind({}, 'GET', false);
export const POST = handleRequest.bind({}, 'POST', false);
export const PATCH = handleRequest.bind({}, 'PATCH', false);
export const PUT = handleRequest.bind({}, 'PUT', false);
export const DELETE = handleRequest.bind({}, 'DELETE', false);

export const authGET = handleRequest.bind({}, 'GET', true);
export const authPOST = handleRequest.bind({}, 'POST', true);
export const authPATCH = handleRequest.bind({}, 'PATCH', true);
export const authPUT = handleRequest.bind({}, 'PUT', true);
export const authDELETE = handleRequest.bind({}, 'DELETE', true);