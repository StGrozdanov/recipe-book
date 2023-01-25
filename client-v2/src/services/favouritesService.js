import { BASE_URL } from "./customService.js";
import * as send from "../utils/requestDataHandler.js";

const END_POINTS = {
    USER_FAVOURITE_RECEPIES: (userId) => `${BASE_URL}/users/favourites/${userId}`,
    ADD_RECIPE_TO_FAVOURITES: `${BASE_URL}/recipes/add-to-favourites`,
    REMOVE_RECIPE_FROM_FAVOURITES: `${BASE_URL}/recipes/remove-from-favourites`,
    RECIPE_IS_IN_USER_FAVOURITES: `${BASE_URL}/users/recipe-is-in-favourites`,
}

export const getMyFavouriteRecepies = (userId) => send.authGET(END_POINTS.USER_FAVOURITE_RECEPIES(userId));

export const addToFavourites = (recipeId, userId) => send.authPOST(END_POINTS.ADD_RECIPE_TO_FAVOURITES, { recipeId, userId });

export const removeFromFavourites = (recipeId, userId) => send.authPOST(END_POINTS.REMOVE_RECIPE_FROM_FAVOURITES, { recipeId, userId });

export const isFavouriteRecipe = (recipeId, userId) => send.authPOST(END_POINTS.RECIPE_IS_IN_USER_FAVOURITES, { recipeId, userId });