import { BASE_URL } from "./backendService.js";
import * as send from "../utils/requestDataHandler.js";

const VISITATION_END_POINT = '/visitations';

const END_POINT = {
    RECORD_WEBSITE_VISITATION: BASE_URL + VISITATION_END_POINT,
    VISITATIONS_TODAY: `${BASE_URL + VISITATION_END_POINT}/today`,
}

export const recordWebsiteVisitation = () => send.POST(END_POINT.RECORD_WEBSITE_VISITATION);

export const getVisitationsToday = () => send.authGET(END_POINT.VISITATIONS_TODAY);