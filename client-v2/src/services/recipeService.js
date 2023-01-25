import { BASE_URL } from "./backendService.js";
import * as send from "../utils/requestDataHandler.js";

export const RECIPES_PER_PAGE = 3;
export const RECIPES_END_POINT = '/recipes';

const END_POINT = {
    RECIPES: BASE_URL + RECIPES_END_POINT,
    TOTAL_RECIPES_COUNT: `${BASE_URL + RECIPES_END_POINT}/count`,
    CREATE_RECIPE: BASE_URL + RECIPES_END_POINT,
    ALL_RECIPES: (page) => {
        return `${BASE_URL + RECIPES_END_POINT}/pagination?limit=${RECIPES_PER_PAGE}&skip=${(page - 1)}`
    },
    LATEST_THREE_RECIPES: `${BASE_URL + RECIPES_END_POINT}/latest-three-recipes`,
    SINGLE_RECIPE: (id) => `${BASE_URL + RECIPES_END_POINT}/${id}`,
    RECORD_VISITATION: (recipeId) => `${BASE_URL + RECIPES_END_POINT}/${recipeId}/new-visitation`,
    OWNER_PUBLICATIONS: (ownerId) => `${BASE_URL + RECIPES_END_POINT}/created-by/${ownerId}`,
    OWNER_PUBLICATIONS_COUNT: (ownerId) => `${BASE_URL + RECIPES_END_POINT}/created-by/${ownerId}/count`,
    APPROVE_RECIPE: (recipeId) => `${BASE_URL + RECIPES_END_POINT}/approve/${recipeId}`,
    THE_THREE_MOST_VIEWED_RECIPES: `${BASE_URL + RECIPES_END_POINT}/most-viewed-three-recipes`,
    EXISTS_BY_NAME: (name) => `${BASE_URL + RECIPES_END_POINT}/existsByName?name=${name}`,
    EXISTS_BY_PICTURE: (pictureUrl) => `${BASE_URL + RECIPES_END_POINT}/existsByPicture?pictureUrl=${pictureUrl}`,
    OTHER_EXISTS_BY_NAME: (name, originalName) => {
        return `${BASE_URL + RECIPES_END_POINT}/otherExistsByName?name=${name}&originalName=${originalName}`;
    },
    OTHER_EXISTS_BY_PICTURE: (pictureUrl, originalPictureUrl) => {
        return `${BASE_URL + RECIPES_END_POINT}/otherExistsByPicture?pictureUrl=${pictureUrl}&originalPictureUrl=${originalPictureUrl}`;
    },
    MOST_ACTIVE_USER: `${BASE_URL + RECIPES_END_POINT}/most-active-user`,
    ALL_RECIPES_ADMIN: (page) => `${BASE_URL + RECIPES_END_POINT}/admin?skip=${(page - 1)}`,
}

export const getRecipesCount = () => send.GET(END_POINT.TOTAL_RECIPES_COUNT);

export const getAllRecipes = (page) => send.GET(END_POINT.ALL_RECIPES(page));

export const createRecipe = (recipe) => send.authPOST(END_POINT.RECIPES, recipe);

export const getSingleRecipe = (recipeId) => send.GET(END_POINT.SINGLE_RECIPE(recipeId));

export const getTheLastThreeRecepies = () => send.GET(END_POINT.LATEST_THREE_RECIPES);

export const updateRecipe = (recipeData, recipeId) => send.authPUT(END_POINT.SINGLE_RECIPE(recipeId), recipeData);

export const removeRecipe = (recipeId) => send.authDELETE(END_POINT.SINGLE_RECIPE(recipeId));

export const getMyPublications = (userId) => send.GET(END_POINT.OWNER_PUBLICATIONS(userId)); 

export const getMyPublicationsCount = (userId) => send.GET(END_POINT.OWNER_PUBLICATIONS_COUNT(userId));

export const getTheThreeMostViewedRecipes = () => send.GET(END_POINT.THE_THREE_MOST_VIEWED_RECIPES);

export const recipeExistsByName = (recipeName) => send.GET(END_POINT.EXISTS_BY_NAME(recipeName));

export const recipeExistsByPicture = (pictureUrl) => send.GET(END_POINT.EXISTS_BY_PICTURE(pictureUrl));

export const otherRecipeExistsByName = (name, originalName) => send.GET(END_POINT.OTHER_EXISTS_BY_NAME(name, originalName));

export const otherRecipeExistsByPicture = (pictureUrl, originalPictureUrl) => send.GET(END_POINT.OTHER_EXISTS_BY_PICTURE(pictureUrl, originalPictureUrl));

export const approveRecipe = (recipeId) => send.authPATCH(END_POINT.APPROVE_RECIPE(recipeId));

export const recordRecipeVisitation = (recipeId) => send.POST(END_POINT.RECORD_VISITATION(recipeId));

export const findTheMostActiveUser = () => send.authGET(END_POINT.MOST_ACTIVE_USER);

export const getAllRecipesAdmin = (page) => send.authGET(END_POINT.ALL_RECIPES_ADMIN(page));