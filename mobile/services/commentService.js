import { BASE_URL, CALLBACK, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { COULD_NOT_DELETE_COMMENT, COULD_NOT_FETCH_COMMENTS } from "../constants/errorMessages.js";
import { handleRequest } from "../helpers/requestDataHandler.js";
import { getUserToken } from "./authenticationService.js";

const COMMENT_END_POINT = '/comments';

const COMMENT_REQUEST_POINTS = {
    GET_SINGLE_COMMENT: (id) => { return `${COMMENT_END_POINT}/${id}` },
    TOTAL_COMMENTS_COUNT: `${COMMENT_END_POINT}/count`,
    GET_ALL_COMMENTS: `${COMMENT_END_POINT}/admin?limit=1000`,
    SEARCH_BY_COMMENT_CONTENT: (query, page) => {
        return `${COMMENT_END_POINT}/search-by-content?whereContent=${query}&page=${page}`;
    },
}

export async function getTotalCommentsCount() {
    CALLBACK.call = () => getTotalCommentsCount();

    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.TOTAL_COMMENTS_COUNT, {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(await getUserToken())
    });
    return handleRequest(response, COULD_NOT_FETCH_COMMENTS, CALLBACK);
}

export async function removeComment(id) {
    CALLBACK.call = () => removeComment(id);

    const options = {
        method: 'DELETE',
        headers: MODIFIYNG_OPERATIONS_HEADERS(await getUserToken())
    };

    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.GET_SINGLE_COMMENT(id), options);
    return handleRequest(response, COULD_NOT_DELETE_COMMENT, CALLBACK);
}

export async function getAllCommentsAdmin() {
    CALLBACK.call = () => getAllCommentsAdmin();

    const response = await fetch(`${BASE_URL}${COMMENT_REQUEST_POINTS.GET_ALL_COMMENTS}`, {
        headers: MODIFIYNG_OPERATIONS_HEADERS(await getUserToken()),
    });

    return handleRequest(response, COULD_NOT_FETCH_COMMENTS, CALLBACK);
}

export async function searchComments(query, page) {
    CALLBACK.call = () => searchComments(query, page);

    const response = await fetch(`${BASE_URL}${COMMENT_REQUEST_POINTS.SEARCH_BY_COMMENT_CONTENT(query, page)}`, {
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
    });

    return handleRequest(response, COULD_NOT_FETCH_COMMENTS, CALLBACK);
}