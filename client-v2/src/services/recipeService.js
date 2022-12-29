import { COULD_NOT_GET_RECEPIES, COULD_NOT_GET_RECEPIE, COULD_NOT_CREATE_RECEPIE, COULD_NOT_EDIT_RECEPIE, COULD_NOT_APPROVE_RECEPIE, COULD_NOT_RECORD_VISITATION, COULD_NOT_FIND_USER } from "../constants/errorMessages.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { BASE_HEADERS, BASE_URL, CALLBACK, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { getUserToken } from "./authenticationService.js";

export const RECEPIES_PER_PAGE = 3;
export const RECEPIES_END_POINT = '/recipes';

const RECIPE_END_POINTS = {
    TOTAL_RECEPIES_COUNT: `${RECEPIES_END_POINT}/count`,
    CREATE_RECIPE: RECEPIES_END_POINT,
    ALL_RECIPES: (page) => {
        return `${RECEPIES_END_POINT}/pagination?limit=${RECEPIES_PER_PAGE}&skip=${(page - 1)}`
    },
    LATEST_THREE_RECIPES: `${RECEPIES_END_POINT}/latest-three-recipes`,
    SINGLE_RECIPE: (id) => `${RECEPIES_END_POINT}/${id}`,
    RECORD_VISITATION: (recipeId) => `${RECEPIES_END_POINT}/${recipeId}/new-visitation`,
    OWNER_PUBLICATIONS: (ownerId) => `${RECEPIES_END_POINT}/created-by/${ownerId}`,
    OWNER_PUBLICATIONS_COUNT: (ownerId) => `${RECEPIES_END_POINT}/created-by/${ownerId}/count`,
    APPROVE_RECIPE: (recipeId) => `${RECEPIES_END_POINT}/approve/${recipeId}`,
    THE_THREE_MOST_VIEWED_RECIPES: `${RECEPIES_END_POINT}/most-viewed-three-recipes`,
    EXISTS_BY_NAME: (name) => `${RECEPIES_END_POINT}/existsByName?name=${name}`,
    EXISTS_BY_PICTURE: (pictureUrl) => `${RECEPIES_END_POINT}/existsByPicture?pictureUrl=${pictureUrl}`,
    OTHER_EXISTS_BY_NAME: (name, originalName) => {
        return `${RECEPIES_END_POINT}/otherExistsByName?name=${name}&originalName=${originalName}`;
    },
    OTHER_EXISTS_BY_PICTURE: (pictureUrl, originalPictureUrl) => {
       return `${RECEPIES_END_POINT}/otherExistsByPicture?pictureUrl=${pictureUrl}&originalPictureUrl=${originalPictureUrl}`;
    },
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

export async function getAllRecepies(page) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.ALL_RECIPES(page), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_RECEPIES);
}

export async function createRecipe(recipe) {
    CALLBACK.call = () => createRecipe(recipe);

    const options = {
        method: 'POST',
        headers: { "Authorization": `Bearer ${getUserToken()}` },
        body: recipe
    };
    const response = await fetch(BASE_URL + RECEPIES_END_POINT, options);
    return handleRequest(response, COULD_NOT_CREATE_RECEPIE, CALLBACK);
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
    CALLBACK.call = () => updateRecipe(recipeData, recipeId);

    const options = {
        method: 'PUT',
        headers: { "Authorization": `Bearer ${getUserToken()}` },
        body: recipeData
    };
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.SINGLE_RECIPE(recipeId), options);
    return handleRequest(response, COULD_NOT_EDIT_RECEPIE, CALLBACK);
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

export async function recipeExistsByName(name) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.EXISTS_BY_NAME(name));
    if (response.ok) {
        return response.json();
    }
}

export async function recipeExistsByPicture(pictureUrl) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.EXISTS_BY_PICTURE(pictureUrl));
    if (response.ok) {
        return response.json();
    }
}

export async function otherRecipeExistsByName(name, originalName) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.OTHER_EXISTS_BY_NAME(name, originalName));

    if (response.ok) {
        return response.json();
    }
}

export async function otherRecipeExistsByPicture(pictureUrl, originalPictureUrl) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.OTHER_EXISTS_BY_PICTURE(pictureUrl, originalPictureUrl));

    if (response.ok) {
        return response.json();
    }
}

export async function approveRecipe(recipeId) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.APPROVE_RECIPE(recipeId), {
        method: 'PATCH',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });
    return handleRequest(response, COULD_NOT_APPROVE_RECEPIE);
}

export async function recordRecipeVisitation(recipeId) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.RECORD_VISITATION(recipeId), {
        method: 'POST',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_RECORD_VISITATION);
}

export async function findTheMostActiveUser() {
    CALLBACK.call = () => findTheMostActiveUser();

    const response = await fetch(`${BASE_URL}${RECIPE_END_POINTS.MOST_ACTIVE_USER}`, {
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
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