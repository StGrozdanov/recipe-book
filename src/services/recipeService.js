import { BASE_HEADERS, BASE_URL } from "./back4appService.js";
import { REGISTRY_AUTHORIZATION_UPDATE_DELETE } from "./registryService.js";

export const RECEPIES_PER_PAGE = 6;

const RECIPE_END_POINTS = {
    TOTAL_RECEPIES_COUNT: '/classes/Recipe?count=1',
    CREATE_RECIPE: '/classes/Recipe',
    ALL_RECIPES: (page) => `/classes/Recipe?limit=${RECEPIES_PER_PAGE}&skip=${(page - 1) * RECEPIES_PER_PAGE}`,
    SINGLE_RECIPE: (id) => { return `/classes/Recipe/${id}` },
    OWNER_PUBLICATIONS: (ownerId) => { return `/classes/Recipe?where=${createPointerQuery('owner', '_User', ownerId)}` },
}

export async function getRecepiesCount() {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.TOTAL_RECEPIES_COUNT, {
        method: 'GET',
        headers: BASE_HEADERS
    });
    const data = await response.json();
    return data;
}

export async function getAllRecepies(page) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.ALL_RECIPES(page), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    const data = await response.json();
    return data;
}

export async function createRecipe(recipe) {
    addOwner(recipe);

    const options = {
        method: 'POST',
        headers: REGISTRY_AUTHORIZATION_UPDATE_DELETE,
        body: JSON.stringify(recipe)
    };
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.CREATE_RECIPE, options);
    return response.json();
}

export async function getSingleRecipe(id) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.SINGLE_RECIPE(id), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    const data = await response.json();
    return data;
}

export async function updateRecipe(recipe, recipeId) {
    const options = {
        method: 'PUT',
        headers: REGISTRY_AUTHORIZATION_UPDATE_DELETE,
        body: JSON.stringify(recipe)
    };
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.SINGLE_RECIPE(recipeId), options);
    return response.json();
}

export async function removeRecipe(id) {
    const options = {
        method: 'DELETE',
        headers: REGISTRY_AUTHORIZATION_UPDATE_DELETE
    };
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.SINGLE_RECIPE(id), options);
    await response.json();
}

export async function getMyPublications(userId) {
    const response = await fetch(BASE_URL + RECIPE_END_POINTS.OWNER_PUBLICATIONS(userId), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    const data = await response.json();
    return data;
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