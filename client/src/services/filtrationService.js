import { BASE_HEADERS, BASE_URL } from "./customService.js";
import { RECEPIES_END_POINT } from "./recipeService.js";
import { getCurrentUser } from "./userService.js";

const FILTRATION_END_POINTS = {
    FIND_RECIPES_BY_NAME_CONTAINS: (query) => { return `${RECEPIES_END_POINT}/search-by-name?whereName=${query}` },
    FIND_RECIPES_BY_CATEGORY: `${RECEPIES_END_POINT}/search-by-categories`,
    FIND_IN_CREATED_RECIPES_BY_NAME_CONTAINS: (query) => {
        return `${RECEPIES_END_POINT}/search-in-created-recipes?whereName=${query}` 
    },
    FIND_IN_USER_FAVOURITE_RECIPES: (query) => {
        return `/users/search-favourite-recipe-by-name?whereName=${query}`
    },
}

export async function searchByRecipeName(query) {
    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.FIND_RECIPES_BY_NAME_CONTAINS(query), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    const data = await response.json();
    return data;
}

export async function filterByCategory(query) {
    let categoriesArray = Array.from(query);

    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.FIND_RECIPES_BY_CATEGORY, {
        method: 'POST',
        headers: BASE_HEADERS,
        body: JSON.stringify({ categories: categoriesArray })
    });
    const data = await response.json();
    return data;
}

export async function searchInUserCreatedRecipesByRecipeName(query) {
    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.FIND_IN_CREATED_RECIPES_BY_NAME_CONTAINS(query), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify({ userId: getCurrentUser() })
    });
    const data = await response.json();
    return data;
}

export async function searchByNameOfFavouriteRecipe(query) {
    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.FIND_IN_USER_FAVOURITE_RECIPES(query), {
        method: 'GET',
        headers: MODIFIYNG_OPERATIONS_HEADERS(getUserToken()),
        body: JSON.stringify({ userId: getCurrentUser() })
    });
    const data = await response.json();
    return data;
}