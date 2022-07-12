import { COULD_NOT_ADD_TO_FAVOURITE_RECIPES, COULD_NOT_FIND_FAVOURITE_RECIPES, COULD_NOT_REMOVE_FROM_FAVOURITE_RECIPES } from "../constants/errorMessages.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { BASE_URL } from "./customService.js";
import { MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { getCurrentUser, getUserToken } from "./userService.js";

const FAVOURITES_END_POINTS = {
    USER_FAVOURITE_RECEPIES: (userId) => `/users/favourites/${userId}`,
    ADD_RECIPE_TO_FAVOURITES: `/recipes/add-to-favourites`,
    REMOVE_RECIPE_FROM_FAVOURITES: `/recipes/remove-from-favourites`,
    RECIPE_IS_IN_USER_FAVOURITES: '/users/recipe-is-in-favourites'
}

export async function getMyFavouriteRecepies() {
    const response = await fetch(BASE_URL + FAVOURITES_END_POINTS.USER_FAVOURITE_RECEPIES(getCurrentUser()), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
    });
    return handleRequest(response, COULD_NOT_FIND_FAVOURITE_RECIPES);
}

export async function addToFavourites(recipeId) {
    const options = {
        method: 'POST',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify({ recipeId, userId: getCurrentUser() })
    };

    const response = await fetch(BASE_URL + FAVOURITES_END_POINTS.ADD_RECIPE_TO_FAVOURITES, options);
    return handleRequest(response, COULD_NOT_ADD_TO_FAVOURITE_RECIPES);
}

export async function removeFromFavourites(recipeId) {
    const options = {
        method: 'POST',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify({ recipeId, userId: getCurrentUser() })
    };

    const response = await fetch(BASE_URL + FAVOURITES_END_POINTS.REMOVE_RECIPE_FROM_FAVOURITES, options);
    return handleRequest(response, COULD_NOT_REMOVE_FROM_FAVOURITE_RECIPES);
}

export async function isFavouriteRecipe(recipeId) {
    const response = await fetch(BASE_URL + FAVOURITES_END_POINTS.RECIPE_IS_IN_USER_FAVOURITES, {
        method: 'POST',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify({ recipeId, userId: getCurrentUser() })
    });
    return handleRequest(response, COULD_NOT_FIND_FAVOURITE_RECIPES);
}