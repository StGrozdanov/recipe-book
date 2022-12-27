import { BASE_HEADERS, BASE_URL, CALLBACK, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { COULD_NOT_FIND_VISITATIONS_TODAY, COULD_NOT_RECORD_VISITATION } from "../constants/errorMessages.js";
import { getUserToken } from "./authenticationService.js";

const VISITATION_END_POINT = '/visitations';

const VISITATIONS_END_POINTS = {
    RECORD_WEBSITE_VISITATION: VISITATION_END_POINT,
    VISITATIONS_TODAY: `${VISITATION_END_POINT}/today`,
}

export async function recordWebsiteVisitation() {
    const response = await fetch(BASE_URL + VISITATIONS_END_POINTS.RECORD_WEBSITE_VISITATION, {
        method: 'POST',
        headers: BASE_HEADERS,
        body: JSON.stringify({ smh: 'smh' })
    });
    return handleRequest(response, COULD_NOT_RECORD_VISITATION);
}

export async function getVisitationsToday() {
    CALLBACK.call = () => getVisitationsToday();

    const response = await fetch(BASE_URL + VISITATIONS_END_POINTS.VISITATIONS_TODAY, {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });

    return handleRequest(response, COULD_NOT_FIND_VISITATIONS_TODAY, CALLBACK);
}