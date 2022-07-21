import { handleRequest } from "../helpers/requestDataHandler.js";
import { BASE_HEADERS, BASE_URL, CALLBACK, MODIFIYNG_OPERATIONS_HEADERS } from "./customService.js";
import { RECEPIES_END_POINT } from "./recipeService.js";
import { getUserToken } from "./authenticationService.js";
import { COULD_NOT_SEARCH } from "../constants/errorMessages.js";

const FILTRATION_END_POINTS = {
    FIND_RECIPES_BY_NAME_CONTAINS: (query) => { return `${RECEPIES_END_POINT}/search-by-name?whereName=${query}` },
    FIND_RECIPES_BY_NAME_CONTAINS_ADMIN: (query, page) => {
        return `/recipes/admin/search-by-name?whereName=${query}&page=${(page - 1)}`
    },
    GLOBAL_SEARCH_ADMIN: (query) => `/global-search/admin?where=${query}`,
}

export async function searchByRecipeName(query) {
    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.FIND_RECIPES_BY_NAME_CONTAINS(query), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    return handleRequest(response, COULD_NOT_SEARCH);
}

export async function searchByRecipeNameAdmin(query, page) {
    CALLBACK.call = () => searchByRecipeNameAdmin(query, page);

    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.FIND_RECIPES_BY_NAME_CONTAINS_ADMIN(query, page), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken())
    });
    return handleRequest(response, COULD_NOT_SEARCH, CALLBACK);
}

export async function globalSearchAdmin(query) {
    CALLBACK.call = () => globalSearchAdmin(query);

    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.GLOBAL_SEARCH_ADMIN(query), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
    });
    return handleRequest(response, COULD_NOT_SEARCH, CALLBACK);
}