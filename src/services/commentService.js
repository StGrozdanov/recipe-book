import { BASE_HEADERS, BASE_URL } from "./back4appService.js";
import { addOwner, createPointer, createPointerQuery } from "./recipeService.js";

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
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
            'X-Parse-Session-Token': sessionStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    };

    console.log(options.headers);

    const response = await fetch(BASE_URL + COMMENT_END_POINTS.CREATE_COMMENT, options);
    return response.json();
}