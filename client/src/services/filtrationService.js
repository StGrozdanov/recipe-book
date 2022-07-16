import { handleRequest } from "../utils/requestDataHandler.js";
import { BASE_HEADERS, BASE_URL, CALLBACK, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { RECEPIES_END_POINT } from "./recipeService.js";
import { getCurrentUser, getUserToken } from "./authenticationService.js";
import { COULD_NOT_SEARCH } from "../constants/errorMessages.js";

const FILTRATION_END_POINTS = {
    FIND_RECIPES_BY_NAME_CONTAINS: (query) => { return `${RECEPIES_END_POINT}/search-by-name?whereName=${query}` },
    FIND_RECIPES_BY_CATEGORY: `${RECEPIES_END_POINT}/search-by-categories`,
    FIND_IN_CREATED_RECIPES_BY_NAME_CONTAINS: (query, userId) => {
        return `${RECEPIES_END_POINT}/search-in-created-recipes?whereName=${query}&whereUser=${userId}` 
    },
    FIND_IN_USER_FAVOURITE_RECIPES: (query, userId) => {
        return `/users/search-favourite-recipe-by-name?whereName=${query}&whereUser=${userId}`
    },
}

export async function searchByRecipeName(query) {
    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.FIND_RECIPES_BY_NAME_CONTAINS(query), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_SEARCH);
}

export async function filterByCategory(query) {
    let categoriesArray = Array.from(query);

    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.FIND_RECIPES_BY_CATEGORY, {
        method: 'POST',
        headers: BASE_HEADERS,
        body: JSON.stringify({ categories: categoriesArray })
    });
    return handleRequest(response, COULD_NOT_SEARCH);
}

export async function searchInUserCreatedRecipesByRecipeName(query) {
    CALLBACK.call = () => searchInUserCreatedRecipesByRecipeName(query);

    const response = await fetch(BASE_URL + 
        FILTRATION_END_POINTS.FIND_IN_CREATED_RECIPES_BY_NAME_CONTAINS(query, getCurrentUser()), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
    });
    return handleRequest(response, COULD_NOT_SEARCH, CALLBACK);
}

export async function searchByNameOfFavouriteRecipe(query) {
    CALLBACK.call = () => searchByNameOfFavouriteRecipe(query);

    const response = await fetch(BASE_URL + 
        FILTRATION_END_POINTS.FIND_IN_USER_FAVOURITE_RECIPES(query, getCurrentUser()), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
    });
    return handleRequest(response, COULD_NOT_SEARCH, CALLBACK);
}