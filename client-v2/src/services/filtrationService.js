import { BASE_URL } from "./backendService.js";
import { RECIPES_END_POINT } from "./recipeService.js";
import * as send from "../utils/requestDataHandler.js";

const END_POINT = {
    FIND_RECIPES_BY_NAME_CONTAINS: (query) => { return `${BASE_URL + RECIPES_END_POINT}/search-by-name?whereName=${query}` },
    FIND_RECIPES_BY_CATEGORY: `${BASE_URL + RECIPES_END_POINT}/search-by-categories`,
    FIND_IN_CREATED_RECIPES_BY_NAME_CONTAINS: (query, userId) => {
        return `${BASE_URL + RECIPES_END_POINT}/search-in-created-recipes?whereName=${query}&whereUser=${userId}`
    },
    FIND_IN_USER_FAVOURITE_RECIPES: (query, userId) => {
        return `${BASE_URL}/users/search-favourite-recipe-by-name?whereName=${query}&whereUser=${userId}`
    },
    FIND_RECIPES_BY_NAME_CONTAINS_ADMIN: (query, page) => {
        return `${BASE_URL + RECIPES_END_POINT}/admin/search-by-name?whereName=${query}&page=${(page - 1)}`
    },
    GLOBAL_SEARCH_ADMIN: (query) => `${BASE_URL}/global-search/admin?where=${query}`,
}

export const searchByRecipeName = (query) => send.GET(END_POINT.FIND_RECIPES_BY_NAME_CONTAINS(query));

export const searchByRecipeNameAdmin = (query, page) => send.authGET(END_POINT.FIND_RECIPES_BY_NAME_CONTAINS_ADMIN(query, page));

export const filterByCategory = (categories) => send.POST(END_POINT.FIND_RECIPES_BY_CATEGORY, { categories });

export const searchInUserCreatedRecipesByRecipeName = (query, userId) => send.authGET(END_POINT.FIND_IN_CREATED_RECIPES_BY_NAME_CONTAINS(query, userId));

export const searchByNameOfFavouriteRecipe = (query, userId) => send.authGET(END_POINT.FIND_IN_USER_FAVOURITE_RECIPES(query, userId));

export const globalSearchAdmin = (query) => send.authGET(END_POINT.GLOBAL_SEARCH_ADMIN(query));