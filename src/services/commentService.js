import { BASE_HEADERS, BASE_URL } from "./back4appService.js";
import { addOwner, createPointer, createPointerQuery } from "./recipeService.js";
import { REGISTRY_AUTHORIZATION_UPDATE_DELETE } from "./registryService.js";

const COMMENT_END_POINTS = {
    CREATE_COMMENT: '/classes/Comment',
    GET_COMMENTS_BY_RECIPE: (recipeId) => { 
        return `/classes/Comment?where=${createPointerQuery('recipe', 'Recipe', recipeId)}&include=owner` 
    },
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
    comment.recipe = createPointer('Recipe', recipeId)
    addOwner(comment);

    const options = {
        method: 'POST',
        headers: REGISTRY_AUTHORIZATION_UPDATE_DELETE,
        body: JSON.stringify(comment)
    };

    const response = await fetch(BASE_URL + COMMENT_END_POINTS.CREATE_COMMENT, options);
    return response.json();
}