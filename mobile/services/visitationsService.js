import { BASE_URL, CALLBACK, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { handleRequest } from "../helpers/requestDataHandler.js";
import { COULD_NOT_FIND_VISITATIONS_TODAY } from "../constants/errorMessages.js";
import { getUserToken } from "./authenticationService.js";

const VISITATION_END_POINT = '/visitations';

const VISITATIONS_END_POINTS = {
    VISITATIONS_TODAY: `${VISITATION_END_POINT}/today`,
}

export async function getVisitationsToday() {
    CALLBACK.call = () => getVisitationsToday();

    const response = await fetch(BASE_URL + VISITATIONS_END_POINTS.VISITATIONS_TODAY, {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });

    return handleRequest(response, COULD_NOT_FIND_VISITATIONS_TODAY, CALLBACK);
}