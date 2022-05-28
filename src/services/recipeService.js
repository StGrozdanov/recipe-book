import { COULD_NOT_GET_RECEPIES, COULD_NOT_GET_RECEPIE, COULD_NOT_CREATE_RECEPIE, COULD_NOT_EDIT_RECEPIE } from "../constants/errorMessages.js";
import { handleRequest } from "../utils/requestDataHandler.js";
import { BASE_HEADERS, BASE_URL, MODIFIYNG_OPERATIONS_HEADERS } from "./back4appService.js";
import { getUserToken } from "./userService.js";

export const RECEPIES_PER_PAGE = 6;
export const RECEPIES_END_POINT = '/classes/Recipe';

const RECIPE_END_POINTS = {
    TOTAL_RECEPIES_COUNT: `${RECEPIES_END_POINT}?count=1`,
    CREATE_RECIPE: RECEPIES_END_POINT,
    ALL_RECIPES: (page) => `${RECEPIES_END_POINT}?limit=${RECEPIES_PER_PAGE}&skip=${(page - 1) * RECEPIES_PER_PAGE}`,
    SINGLE_RECIPE: (id) => { return `${RECEPIES_END_POINT}/${id}` },
    OWNER_PUBLICATIONS: (ownerId) => { return `${RECEPIES_END_POINT}?where=${createPointerQuery('owner', '_User', ownerId)}` },
    OWNER_PUBLICATIONS_COUNT: (ownerId) => { 
        return `${RECEPIES_END_POINT}?where=${createPointerQuery('owner', '_User', ownerId)}&count=1` 
    },
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
    addOwner(recipe);

    const options = {
        method: 'POST',
        headers: {
            ...MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    };

    const response = await fetch(BASE_URL + RECIPE_END_POINTS.CREATE_RECIPE, options);
    return handleRequest(response, COULD_NOT_CREATE_RECEPIE);
}

export async function getSingleRecipe(id) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.SINGLE_RECIPE(id), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_GET_RECEPIE);
}

export async function updateRecipe(recipe, recipeId) {
    const options = {
        method: 'PUT',
        headers: {
            ...MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
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
    await handleRequest(response, COULD_NOT_EDIT_RECEPIE);
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

export function addOwner(record) {
    const id = sessionStorage.getItem('id');
    record.owner = createPointer('_User', id);

    return record;
}

export function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query));
}

export function createPointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    };
}

export function createPointerQuery(propName, className, ownerId) {
    return createQuery({ [propName]: createPointer(className, ownerId) });
}