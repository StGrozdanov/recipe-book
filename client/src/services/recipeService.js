import { COULD_NOT_GET_RECEPIES, COULD_NOT_GET_RECEPIE, COULD_NOT_CREATE_RECEPIE, COULD_NOT_EDIT_RECEPIE } from "../constants/errorMessages.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { BASE_HEADERS, BASE_URL, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { getUserToken } from "./authenticationService.js";

export const RECEPIES_PER_PAGE = 6;
export const RECEPIES_END_POINT = '/recipes';

const RECIPE_END_POINTS = {
    TOTAL_RECEPIES_COUNT: `${RECEPIES_END_POINT}/count`,
    CREATE_RECIPE: RECEPIES_END_POINT,
    ALL_RECIPES: (page) => {
        return `${RECEPIES_END_POINT}/pagination?limit=${RECEPIES_PER_PAGE}&skip=${(page - 1)}`
    },
    LATEST_THREE_RECIPES: `${RECEPIES_END_POINT}/latest-three-recipes`,
    SINGLE_RECIPE: (id) => `${RECEPIES_END_POINT}/${id}`,
    OWNER_PUBLICATIONS: (ownerId) => `${RECEPIES_END_POINT}/created-by/${ownerId}`,
    OWNER_PUBLICATIONS_COUNT: (ownerId) => `${RECEPIES_END_POINT}/created-by/${ownerId}/count`,
    THE_THREE_MOST_VIEWED_RECIPES: `${RECEPIES_END_POINT}/most-viewed-three-recipes`,
}

export async function getRecepiesCount() {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.TOTAL_RECEPIES_COUNT, {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_RECEPIES);
}

export async function getAllRecepies(page) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.ALL_RECIPES(page), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_RECEPIES);
}

export async function createRecipe(recipe) {
    const options = {
        method: 'POST',
        headers: { "Authorization": `Bearer ${getUserToken()}` },
        body: recipe
    };
    const response = await fetch(BASE_URL + RECEPIES_END_POINT, options);
    return handleRequest(response, COULD_NOT_CREATE_RECEPIE);
}

export async function getSingleRecipe(recipeId) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.SINGLE_RECIPE(recipeId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_RECEPIE);
}

export async function getTheLastThreeRecepies() {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.LATEST_THREE_RECIPES, {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_RECEPIES);
}

export async function updateRecipe(recipeData, recipeId) {
    const options = {
        method: 'PUT',
        headers: { "Authorization": `Bearer ${getUserToken()}` },
        body: recipeData
    };
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.SINGLE_RECIPE(recipeId), options);
    return handleRequest(response, COULD_NOT_EDIT_RECEPIE);
}

export async function removeRecipe(id) {
    const options = {
        method: 'DELETE',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    };
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.SINGLE_RECIPE(id), options);
    return handleRequest(response, COULD_NOT_EDIT_RECEPIE);
}

export async function getMyPublications(userId) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.OWNER_PUBLICATIONS(userId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_RECEPIES);
}

export async function getMyPublicationsCount(userId) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.OWNER_PUBLICATIONS_COUNT(userId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_RECEPIES);
}

export async function getTheThreeMostViewedRecepies() {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.THE_THREE_MOST_VIEWED_RECIPES, {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_RECEPIES);
}