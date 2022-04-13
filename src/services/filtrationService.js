import { BASE_HEADERS, BASE_URL } from "./back4appService.js";
import { createQuery } from "./recipeService.js";

const FILTRATION_END_POINTS = {
    FIND_RECIPES_BY_NAME_CONTAINS: (query) => { 
        return `/classes/Recipe?where=${createQuery({ "name": { "$regex": `${query}` } })}` 
    },
    FIND_RECIPES_BY_CATEGORY: (query) => {
        return `/classes/Recipe?where=${
            createQuery({ "category": { "$in": [`${query[0]}`, `${query[1]}`, `${query[2]}`, `${query[3]}`] } })
            }`
    },
}

export async function searchByName(query) {
    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.FIND_RECIPES_BY_NAME_CONTAINS(query), {
        method: 'GET',
        headers: BASE_HEADERS
    });
    const data = await response.json();
    return data;
}

export async function filterByCategory(query) {
    let filter = Array.from(query);

    const response = await fetch(BASE_URL + FILTRATION_END_POINTS.FIND_RECIPES_BY_CATEGORY(filter), {
        method: 'GET',
        headers: BASE_HEADERS
    });

    const data = await response.json();
    return data;
}