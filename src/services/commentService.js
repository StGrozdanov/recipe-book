import { BASE_HEADERS, BASE_URL, MODIFIYNG_OPERATIONS_HEADERS } from "./back4appService.js";
import { addOwner, createPointer, createPointerQuery, createQuery } from "./recipeService.js";
import { COULD_NOT_DELETE_COMMENT, COULD_NOT_EDIT_COMMENT, COULD_NOT_FETCH_COMMENTS } from "../constants/errorMessages.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { getUserToken } from "./userService.js";

const COMMENT_END_POINT = '/classes/Comment';

const COMMENT_REQUEST_POINTS = {
    CREATE_COMMENT: COMMENT_END_POINT,
    GET_COMMENTS_BY_RECIPE: (recipeId) => {
        return `${COMMENT_END_POINT}?where=${createPointerQuery('recipe', 'Recipe', recipeId)}&include=owner`
    },
    GET_SINGLE_COMMENT: (id) => { return `${COMMENT_END_POINT}/${id}` },
    GET_LAST_SIX_COMMENTS: (totalCommentsCount) => `${COMMENT_END_POINT}?skip=${totalCommentsCount - 6}`,
    TOTAL_COMMENTS_COUNT: `${COMMENT_END_POINT}?count=1`,
    EDIT_COMMENT: (id) => { return `${COMMENT_END_POINT}/${id}` },
}

export async function getCommentsForRecipe(recipeId) {
    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.GET_COMMENTS_BY_RECIPE(recipeId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_FETCH_COMMENTS);
}

export async function getTotalCommentsCount() {
    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.TOTAL_COMMENTS_COUNT, {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_FETCH_COMMENTS);
}

export async function getTheLatestSixComments(totalCommentsCount) {
    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.GET_LAST_SIX_COMMENTS(totalCommentsCount), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_FETCH_COMMENTS);
}

export async function commentRecipe(recipeId, comment) {
    comment.recipe = createPointer('Recipe', recipeId);
    addOwner(comment);

    const options = {
        method: 'POST',
        headers: {
            ...MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    };

    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.CREATE_COMMENT, options);
    return response.json();
}

export async function removeComment(id) {
    const options = {
        method: 'DELETE',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    };

    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.GET_SINGLE_COMMENT(id), options);
    await handleRequest(response, COULD_NOT_DELETE_COMMENT);
}

export async function editComment(commentContent, commentId) {
    const options = {
        method: 'PUT',
        headers: {
            ...MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: commentContent })
    };

    const response = await fetch(BASE_URL + COMMENT_REQUEST_POINTS.EDIT_COMMENT(commentId), options);
    return handleRequest(response, COULD_NOT_EDIT_COMMENT);
}