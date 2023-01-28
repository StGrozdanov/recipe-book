import multiLineInputProcessor from "./multiLineInputProcessor.js";

export const validate = {
    email: (email) => { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) },
    username: (username) => { return username.length >= 3 && username.length <= 10 },
    password: (password) => { return password.length >= 4 },
    name: (recipeName) => { return /^[а-яА-Я\s]+$/.test(recipeName) && recipeName.length >= 4 },
    products: (recipeProducts) => { return multiLineInputProcessor.process(recipeProducts).length >= 3 },
    steps: (recipeSteps) => { return multiLineInputProcessor.process(recipeSteps).length >= 3 },
}

export function formContainsEmptyFields(formData) {
    const formEntriesObject = Object.fromEntries(formData);
    const formValuesArray = Object.values(formEntriesObject);

    return formValuesArray.some(field => field.trim() == '');
}

export function recipeFormContainsEmptyFields(fileImg, img, name, products, steps, category) {
    const noImageIsProvided = fileImg.size === 0 && img.trim() == '';
    const nameIsEmpty = name.trim() == '';
    const productsAreEmpty = products.length === 0;
    const stepsAreEmpty = steps.length === 0;
    const categoryIsEmpty = category.trim() == '';

    return nameIsEmpty || productsAreEmpty || stepsAreEmpty || categoryIsEmpty || noImageIsProvided;
}