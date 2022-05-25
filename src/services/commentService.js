import { BASE_HEADERS, BASE_URL } from "./back4appService.js";
import { addOwner, createPointer, createPointerQuery } from "./recipeService.js";
import MODIFIYNG_OPERATIONS_HEADERS from "./back4appService.js";

const COMMENT_END_POINTS = {
    CREATE_COMMENT: '/classes/Comment',
    GET_COMMENTS_BY_RECIPE: (recipeId) => { 
        return `/classes/Comment?where=${createPointerQuery('recipe', 'Recipe', recipeId)}&include=owner` 
    },
    GET_SINGLE_COMMENT: (id) => { return `/classes/Comment/${id}` },
    EDIT_COMMENT: (id) => { return `/classes/Comment/${id}` },
}

export async function getCommentsForRecipe(recipeId) {
    const response = await fetch(BASE_URL + COMMENT_END_POINTS.GET_COMMENTS_BY_RECIPE(recipeId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    const data = await response.json();
    return data;
}

export async function commentRecipe(recipeId, comment) {
    const authorizationToken = sessionStorage.getItem('authToken');

    comment.recipe = createPointer('Recipe', recipeId)
    addOwner(comment);

    const options = {
        method: 'POST',
        headers: {
            ...MODIFIYNG_OPERATIONS_HEADERS(authorizationToken),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    };
    const response = await fetch(BASE_URL + COMMENT_END_POINTS.CREATE_COMMENT, options);
    return response.json();
}

export async function removeComment(id) {
    const authorizationToken = sessionStorage.getItem('authToken');

    const options = {
        method: 'DELETE',
        headers: MODIFIYNG_OPERATIONS_HEADERS(authorizationToken)
    };
    const response = await fetch(BASE_URL + COMMENT_END_POINTS.GET_SINGLE_COMMENT(id), options);
    await response.json();
}

export async function editComment(commentContent, commentId) {
    const authorizationToken = sessionStorage.getItem('authToken');

    const options = {
        method: 'PUT',
        headers: {
            ...MODIFIYNG_OPERATIONS_HEADERS(authorizationToken),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: commentContent })
    };
    const response = await fetch(BASE_URL + COMMENT_END_POINTS.EDIT_COMMENT(commentId), options);
    return response.json();
}