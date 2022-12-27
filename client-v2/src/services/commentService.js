import { BASE_HEADERS, BASE_URL, CALLBACK, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { AUTHENTICATE_FIRST, COULD_NOT_DELETE_COMMENT, COULD_NOT_EDIT_COMMENT, COULD_NOT_FETCH_COMMENTS } from "../constants/errorMessages.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { getCurrentUser, getUserToken } from "./authenticationService.js";

const COMMENT_END_POINT = '/comments';

const COMMENT_REQUEST_POINTS = {
    CREATE_COMMENT: COMMENT_END_POINT,
    GET_COMMENTS_BY_RECIPE: (recipeId) => { return `${COMMENT_END_POINT}/${recipeId}` },
    GET_SINGLE_COMMENT: (id) => { return `${COMMENT_END_POINT}/${id}` },
    GET_LAST_SIX_COMMENTS: `${COMMENT_END_POINT}/latest-six-comments`,
    TOTAL_COMMENTS_COUNT: `${COMMENT_END_POINT}/count`,
    GET_ALL_COMMENTS: (page) => `${COMMENT_END_POINT}/admin?skip=${(page - 1)}`,
    SEARCH_BY_COMMENT_CONTENT: (query, page) => {
        return `${COMMENT_END_POINT}/search-by-content?whereContent=${query}&page=${page}`;
    },
}

export async function getCommentsForRecipe(recipeId) {
    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.GET_COMMENTS_BY_RECIPE(recipeId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_FETCH_COMMENTS);
}

export async function getTotalCommentsCount() {
    CALLBACK.call = () => getTotalCommentsCount();

    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.TOTAL_COMMENTS_COUNT, {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });
    return handleRequest(response, COULD_NOT_FETCH_COMMENTS, CALLBACK);
}

export async function getTheLatestSixComments() {
    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.GET_LAST_SIX_COMMENTS, {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_FETCH_COMMENTS);
}

export async function commentRecipe(recipeId, comment) {
    CALLBACK.call = () => commentRecipe(recipeId, comment);
    comment.targetRecipeId = recipeId;
    comment.ownerId = getCurrentUser();

    const options = {
        method: 'POST',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify(comment)
    };

    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.CREATE_COMMENT, options);
    return handleRequest(response, AUTHENTICATE_FIRST, CALLBACK);
}

export async function removeComment(id) {
    CALLBACK.call = () => removeComment(id);

    const options = {
        method: 'DELETE',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    };
    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.GET_SINGLE_COMMENT(id), options);
    return handleRequest(response, COULD_NOT_DELETE_COMMENT, CALLBACK);
}

export async function editComment(commentContent, commentId) {
    CALLBACK.call = () => editComment(commentContent, commentId);

    const options = {
        method: 'PUT',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify({ content: commentContent })
    };
    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.GET_SINGLE_COMMENT(commentId), options);
    return handleRequest(response, COULD_NOT_EDIT_COMMENT, CALLBACK);
}

export async function getAllCommentsAdmin(page) {
    CALLBACK.call = () => getAllCommentsAdmin(page);

    const response = await fetch(`${BASE_URL}${COMMENT_REQUEST_POINTS.GET_ALL_COMMENTS(page)}`, {
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
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