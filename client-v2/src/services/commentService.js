import { BASE_URL } from "./backendService.js";
import * as send from "../utils/requestDataHandler.js";

const COMMENT_END_POINT = '/comments';

const END_POINT = {
    CREATE_COMMENT: BASE_URL + COMMENT_END_POINT,
    GET_COMMENTS_BY_RECIPE: (recipeId) => { return `${BASE_URL + COMMENT_END_POINT}/${recipeId}` },
    GET_SINGLE_COMMENT: (id) => { return `${BASE_URL + COMMENT_END_POINT}/${id}` },
    GET_LAST_SIX_COMMENTS: `${BASE_URL + COMMENT_END_POINT}/latest-six-comments`,
    TOTAL_COMMENTS_COUNT: `${BASE_URL + COMMENT_END_POINT}/count`,
    GET_ALL_COMMENTS: (page) => `${BASE_URL + COMMENT_END_POINT}/admin?skip=${(page - 1)}`,
    SEARCH_BY_COMMENT_CONTENT: (query, page) => {
        return `${BASE_URL + COMMENT_END_POINT}/search-by-content?whereContent=${query}&page=${page}`;
    },
}

export const getCommentsForRecipe = (recipeId) => send.GET(END_POINT.GET_COMMENTS_BY_RECIPE(recipeId));

export const getTotalCommentsCount = () => send.authGET(END_POINT.TOTAL_COMMENTS_COUNT);

export const getTheLatestSixComments = () => send.GET(END_POINT.GET_LAST_SIX_COMMENTS);

export const commentRecipe = (comment) => send.authPOST(END_POINT.CREATE_COMMENT, { comment });

export const removeComment = (commentId) => send.authDELETE(END_POINT.GET_SINGLE_COMMENT(commentId));

export const editComment = (content, commentId) => send.authPUT(END_POINT.GET_SINGLE_COMMENT(commentId), { content })

export const getAllCommentsAdmin = (page) => send.authGET(END_POINT.GET_ALL_COMMENTS(page));

export const searchComments = (query, page) => send.authGET(END_POINT.SEARCH_BY_COMMENT_CONTENT(query, page));