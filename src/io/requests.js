import { REGISTRY_URL } from "./registry.js";

export const RECEPIES_PER_PAGE = 3;

const endPoints = {
    allRecordsCount: '/classes/Recipe?count=1',
    allRecords: (page) => `/classes/Recipe?limit=${RECEPIES_PER_PAGE}&skip=${(page - 1) * RECEPIES_PER_PAGE}`,
    singleRecord: (id) => { return `/classes/Recipe/${id}` },
    singleRecordOwnerDetails: (id) => { return `/classes/Recipe/${id}?include=owner` },
    ownerPublications: (ownerId) => { return `/classes/Recipe?where=${createPointerQuery('owner', '_User', ownerId)}` },
    commentsByRecipe: (recipeId) => { return `/classes/Comment?where=${createPointerQuery('recipe', 'Recipe', recipeId)}&include=owner` },
    comment: '/classes/Comment',
    searchByName: (page, query) => { return `/classes/Recipe?limit=${RECEPIES_PER_PAGE}&skip=${(page - 1) * RECEPIES_PER_PAGE}&where=${createQuery({"name":{"$regex":`${query}`}})}` },
    filterByCategory: (query) => { return `/classes/Recipe?where=${createQuery({"category": `${query}`})}` },
    createRecord: '/classes/Recipe'
}

export async function getRecepiesCount() {
    const response = await fetch(REGISTRY_URL + endPoints.allRecordsCount, {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS'
        }
    });
    const data = await response.json();
    return data;
}

export async function getAll(page) {
    const response = await fetch(REGISTRY_URL + endPoints.allRecords(page), {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS'
        }
    });
    const data = await response.json();
    return data;
}

export async function create(recipe) {
    addOwner(recipe);

    const options = {
        method: 'POST',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
            'X-Parse-Session-Token': sessionStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    };

    const response = await fetch(REGISTRY_URL + endPoints.createRecord, options);

    return await response.json();
}

export async function getSingle(id) {
    const response = await fetch(REGISTRY_URL + endPoints.singleRecord(id), {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
        }
    });
    const data = await response.json();
    return data;
}

export async function update(recipe, recipeId) {
    const options = {
        method: 'PUT',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
            'X-Parse-Session-Token': sessionStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    };

    const response = await fetch(REGISTRY_URL + endPoints.singleRecord(recipeId), options);

    return await response.json();
}

export async function removeRecipe(id) {
    const options = {
        method: 'DELETE',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
            'X-Parse-Session-Token': sessionStorage.getItem('authToken'),
        }
    };

    const response = await fetch(REGISTRY_URL + endPoints.singleRecord(id), options);

    await response.json();
}

export async function getMyPublications(userId) {
    const response = await fetch(REGISTRY_URL + endPoints.ownerPublications(userId), {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS'
        }
    });
    const data = await response.json();
    return data;
}

export async function getCommentsForRecipe(recipeId) {
    const response = await fetch(REGISTRY_URL + endPoints.commentsByRecipe(recipeId), {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
        }
    });
    const data = await response.json();
    return data;
}

export async function commentRecipe(recipeId, comment) {
    comment.recipe = createPointer('Recipe', recipeId)
    addOwner(comment);

    const options = {
        method: 'POST',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
            'X-Parse-Session-Token': sessionStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    };

    const response = await fetch(REGISTRY_URL + endPoints.comment, options);

    return await response.json();
}

export async function searchByName(page, query) {
    const response = await fetch(REGISTRY_URL + endPoints.searchByName(page, query), {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
        }
    });
    const data = await response.json();
    return data;
}

export async function filterByCategory(query) {
    const response = await fetch(REGISTRY_URL + endPoints.filterByCategory(query), {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'Z8Q8uaXTv77Bw38xSjfbNYfoyt3gKTOQPEqMN3Ea',
            'X-Parse-REST-API-Key': '5hjL2s81MAheTfmeu4ejBnR41hS2V0WHmkilsWiS',
        }
    });
    const data = await response.json();
    return data;
}

function createPointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    };
}

function addOwner(record) {
    const id = sessionStorage.getItem('id');
    record.owner = createPointer('_User', id);

    return record;
}

function createPointerQuery(propName, className, ownerId) {
    return createQuery({ [propName]: createPointer(className, ownerId) });
}

function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query));
}