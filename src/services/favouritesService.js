import { COULD_NOT_ADD_TO_FAVOURITE_RECIPES, COULD_NOT_FIND_FAVOURITE_RECIPES, COULD_NOT_REMOVE_FROM_FAVOURITE_RECIPES } from "../constants/errorMessages.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { BASE_URL, BASE_HEADERS } from "./back4appService.js";
import { createPointerQuery, RECEPIES_END_POINT } from "./recipeService.js";

const FAVOURITES_END_POINTS = {
    USER_FAVOURITE_RECEPIES: (userId) => {
        return `${RECEPIES_END_POINT}?where=${createPointerQuery('favouritedBy', '_User', userId)}`
    },
    ADD_RECIPE_TO_FAVOURITES: (recipeId) => `${RECEPIES_END_POINT}/${recipeId}`,
    REMOVE_RECIPE_FROM_FAVOURITES: (recipeId) => `${RECEPIES_END_POINT}/${recipeId}`,
}

export async function getMyFavouriteRecepies(userId) {
    const response = await fetch(BASE_URL + FAVOURITES_END_POINTS.USER_FAVOURITE_RECEPIES(userId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_FIND_FAVOURITE_RECIPES);
}

export async function addToFavourites(recipeId) {
    const targetRecipeBody = {}
    updateFavouritesRelation(targetRecipeBody, 'AddRelation');

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetRecipeBody)
    };

    const response = await fetch(BASE_URL + FAVOURITES_END_POINTS.ADD_RECIPE_TO_FAVOURITES(recipeId), options);
    return handleRequest(response, COULD_NOT_ADD_TO_FAVOURITE_RECIPES);
}

export async function removeFromFavourites(recipeId) {
    const targetRecipeBody = {}
    updateFavouritesRelation(targetRecipeBody, 'RemoveRelation');

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetRecipeBody)
    };

    const response = await fetch(BASE_URL + FAVOURITES_END_POINTS.REMOVE_RECIPE_FROM_FAVOURITES(recipeId), options);
    return handleRequest(response, COULD_NOT_REMOVE_FROM_FAVOURITE_RECIPES);
}

export async function isFavouriteRecipe(userId, recipeId) {
    const response = await fetch(BASE_URL + FAVOURITES_END_POINTS.USER_FAVOURITE_RECEPIES(userId), {
        method: 'GET',
        headers: BASE_HEADERS
    });

    const data = await response.json();
    return data.results.some(recipe => recipe.objectId === recipeId);
}

function updateFavouritesRelation(record, method) {
    const userId = sessionStorage.getItem('id');

    record.favouritedBy = {
        __op: method,
        objects: [{
            __type: 'Pointer',
            className: '_User',
            objectId: userId
        }]
    }

    record._ApplicationId = "Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea";
    record._ClientVersion = "js3.3.0";
    record._InstallationId = "21e7248a-14ba-48cb-ad63-9593dc88fa95";
    record._MasterKey = "LpdlmxYNw0OjlDHOR4aynD6IQOm90180iOEGUayE";
    record._method = 'PUT';

    return record;
}