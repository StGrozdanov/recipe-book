import { BASE_HEADERS, BASE_URL, CALLBACK, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { COULD_NOT_RECORD_VISITATION } from "../constants/errorMessages.js";

const VISITATION_END_POINT = '/visitations';

const VISITATIONS_END_POINTS = {
    RECORD_WEBSITE_VISITATION: VISITATION_END_POINT,
}

export async function recordWebsiteVisitation() {
    const response = await fetch(BASE_URL + VISITATIONS_END_POINTS.RECORD_WEBSITE_VISITATION, {
        method: 'POST',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_RECORD_VISITATION);
}