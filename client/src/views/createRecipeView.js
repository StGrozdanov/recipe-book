import { html } from '../../node_modules/lit-html/lit-html.js';
import { createRecipe } from '../services/recipeService.js';
import { notify } from '../utils/notification.js';
import * as formDataValidator from '../utils/formDataValidator.js';
import multiLineInputProcessor from '../utils/multiLineInputProcessor.js';
import { getUserToken, getCurrentUser } from '../services/authenticationService.js';
import { CREATED_RECIPE_SUCCESS, ONLY_REGISTERED_USERS_CAN_CREATE, THERE_ARE_EMPTY_FIELDS_LEFT, THERE_ARE_INVALID_FIELDS_LEFT } from '../constants/notificationMessages.js';
import { sendNotifications } from './templates/commentTemplate.js';
import { NEW_RECIPE, POSTED_NEW_RECIPE } from '../constants/userActions.js';
import { hideLoadingSpinner, showLoadingSpinner } from '../utils/loadingSpinner.js';

const createRecipeTemplate = (ctx) => html`
<section id="create-page" class="create formData">
    <form @submit=${(e)=> createHandler(e, ctx)}
        id="create-form"
        autocomplete="off"
        enctype='multipart/form-data'
        style="position: relative;"
    >
        <fieldset>
            <legend>Нова рецепта</legend>
            <p class="field">
                <label for="title">Наименование</label>
                <span class="input">
                    <i class="fa-solid fa-bowl-rice"></i>
                    <input @input=${formDataValidator.inputValidateHandler} type="search" name="name" id="title"
                        placeholder="Име на рецепта" autocomplete="off">
                    <i class="fa-solid fa-triangle-exclamation warning-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">
                    Името трябва да е на български, минимум 4 букви, без символи.
                </span>
            </p>
            <p class="field">
                <label for="description">Продукти</label>
                <span class="input">
                    <i class="fa-solid fa-book-open"></i>
                    <textarea @input=${formDataValidator.inputValidateHandler} name="products" id="description"
                        placeholder="Продукти и грамаж, всеки на нов ред"></textarea>
                    <i class="fa-solid fa-triangle-exclamation warning-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">Минимум 3 продукта</span>
            </p>
            <p class="field">
                <label for="description">Стъпки за приготвяне</label>
                <span class="input">
                    <i class="fa-solid fa-shoe-prints"></i>
                    <textarea @input=${formDataValidator.inputValidateHandler} name="steps" id="description"
                        placeholder="Стъпки за приготвяне, всяка на нов ред"></textarea>
                    <i class="fa-solid fa-triangle-exclamation warning-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">Минимум 3 стъпки</span>
            </p>
            <p class="field">
                <label for="image">Картинка</label>
                <span class="input">
                    <i class="fa-solid fa-utensils"></i>
                    <input type="text" name="img" id="image" placeholder="Адрес на изображение">
                </span>
                <input type="file" name="fileImg" id="fileImg" />
            </p>
            <p class="field">
                <label for="type">Категория</label>
                <span class="input">
                    <select id="type" name="category">
                        <option value="" selected hidden>Изберете категория...</option>
                        <option value="Пилешко">Пилешко</option>
                        <option value="Свинско">Свинско</option>
                        <option value="Телешко">Телешко</option>
                        <option value="Телешко-свинско">Телешко-свинско</option>
                        <option value="Други месни">Други месни</option>
                        <option value="Вегитариански">Вегитариански</option>
                        <option value="Риба">Риба</option>
                        <option value="Салати">Салати</option>
                        <option value="Тестени">Тестени</option>
                        <option value="Десерти">Десерти</option>
                        <option value="Други">Други</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Създай рецепта">
        </fieldset>
    </form>
</section>
`;

export function addRecipePage(context) {
    if (getUserToken() != null) {
        context.render(createRecipeTemplate(context))
    } else {
        notify(ONLY_REGISTERED_USERS_CAN_CREATE);
    }
}

async function createHandler(e, context) {
    e.preventDefault();

    const form = new FormData(e.target);

    const name = form.get('name');
    const products = multiLineInputProcessor.process(form.get('products'));
    const steps = multiLineInputProcessor.process(form.get('steps'));
    const img = form.get('img');
    const category = form.get('category');
    const fileImg = form.get('fileImg');

    const thereAreEmptyFieldsLeft = formDataValidator.recipeFormContainsEmptyFields(fileImg, img, name, products, steps, category);

    if (thereAreEmptyFieldsLeft) {
        return notify(THERE_ARE_EMPTY_FIELDS_LEFT);
    } else if (formDataValidator.formContainsInvalidInput(e.target)) {
        return notify(THERE_ARE_INVALID_FIELDS_LEFT);
    }

    const newRecipe = {
        recipeName: name,
        products: products,
        steps: steps,
        imageUrl: img,
        category: category,
        ownerId: getCurrentUser()
    }

    form.append('file', fileImg);
    form.append('data', JSON.stringify(newRecipe));

    showLoadingSpinner(document.getElementById('create-form'));

    const createdRecipeId = await createRecipe(form);

    context.page.redirect(`/details-${createdRecipeId.recipeId}`);
    notify(CREATED_RECIPE_SUCCESS);
    
    await sendNotifications(
        { id: createdRecipeId.recipeId, recipeName: newRecipe.recipeName }, 
        POSTED_NEW_RECIPE, 
        NEW_RECIPE
    );

    hideLoadingSpinner();
}