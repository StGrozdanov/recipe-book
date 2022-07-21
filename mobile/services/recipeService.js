import { COULD_NOT_GET_RECEPIES, COULD_NOT_EDIT_RECEPIE, COULD_NOT_APPROVE_RECEPIE, COULD_NOT_FIND_USER } from "../constants/errorMessages.js";
import { handleRequest } from "../helpers/requestDataHandler.js";
import { BASE_HEADERS, BASE_URL, CALLBACK, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { getUserToken } from "./authenticationService.js";

export const RECEPIES_END_POINT = '/recipes';

const RECIPE_END_POINTS = {
    TOTAL_RECEPIES_COUNT: `${RECEPIES_END_POINT}/count`,
    SINGLE_RECIPE: (id) => `${RECEPIES_END_POINT}/${id}`,
    APPROVE_RECIPE: (recipeId) => `${RECEPIES_END_POINT}/approve/${recipeId}`,
    MOST_ACTIVE_USER: `${RECEPIES_END_POINT}/most-active-user`,
    ALL_RECIPES_ADMIN: (page) => `${RECEPIES_END_POINT}/admin?skip=${(page - 1)}`,
}

export async function getRecepiesCount() {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.TOTAL_RECEPIES_COUNT, {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_RECEPIES);
}

export async function removeRecipe(id) {
    CALLBACK.call = () => removeRecipe(id);

    const options = {
        method: 'DELETE',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    };

    const response = await fetch(BASE_URL + RECIPE_END_POINTS.SINGLE_RECIPE(id), options);
    return handleRequest(response, COULD_NOT_EDIT_RECEPIE, CALLBACK);
}

export async function approveRecipe(recipeId) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.APPROVE_RECIPE(recipeId), {
        method: 'PATCH',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });

    return handleRequest(response, COULD_NOT_APPROVE_RECEPIE);
}

export async function findTheMostActiveUser() {
    CALLBACK.call = () => findTheMostActiveUser();

    const response = await fetch(`${BASE_URL}${RECIPE_END_POINTS.MOST_ACTIVE_USER}`, {
        headers: MODIFIYNG_OPERATIONS_HEADERS(await getUserToken()),
    });

    return handleRequest(response, COULD_NOT_FIND_USER, CALLBACK);
}

export async function getAllRecipesAdmin(page) {
    CALLBACK.call = () => getAllRecipesAdmin(page);

    const response = await fetch(`${BASE_URL}${RECIPE_END_POINTS.ALL_RECIPES_ADMIN(page)}`, {
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
    });

    return handleRequest(response, COULD_NOT_GET_RECEPIES, CALLBACK);
}