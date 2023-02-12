import { html } from '../../node_modules/lit-html/lit-html.js';
import { createRecipe, recipeExistsByName, recipeExistsByPicture } from '../services/recipeService.js';
import { notify } from '../utils/notification.js';
import * as formDataValidator from '../utils/formDataValidator.js';
import multiLineInputProcessor from '../utils/multiLineInputProcessor.js';
import { getUserToken, getCurrentUser, userIsAdministrator, userIsModerator } from '../services/authenticationService.js';
import { CREATED_RECIPE_SUCCESS, CREATED_RECIPE_SUCCESS_APPROVAL, ONLY_REGISTERED_USERS_CAN_CREATE, THERE_ARE_EMPTY_FIELDS_LEFT, THERE_ARE_INVALID_FIELDS_LEFT } from '../constants/notificationMessages.js';
import { sendNotifications } from './templates/commentTemplate.js';
import { NEW_RECIPE, POSTED_NEW_RECIPE } from '../constants/userActions.js';
import { hideLoadingSpinner, showLoadingSpinner } from '../utils/loadingSpinner.js';

const createRecipeTemplate = (ctx) => html`
<section id="create-page" class="create formData">
    <form @submit=${(e) => createHandler(e, ctx)}
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
                    <input @input=${formDataValidator.inputValidateHandler} @blur=${checkForExistingName} type="search"
                        name="name" id="title" placeholder="Име на рецепта" autocomplete="off">
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon validate-icon"
                        style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">
                    Името трябва да е на български, минимум 4 букви, без символи.
                </span>
                <span class="invalid-input-text non-unique-name" style="display: none;">
                    Вече съществува рецепта с това име.
                </span>
            </p>
            <p class="field">
                <label for="title">Време за приготвяне</label>
                <span class="input">
                    <i class="fa-solid fa-clock" style="margin-left: 8px"></i>
                    <input type="text" name="preparationTime" id="title" placeholder="Време за приготвяне в минути" />
                </span>
            </p>
            <p class="field">
                <label for="description">Продукти</label>
                <span class="input">
                    <i class="fa-solid fa-book-open"></i>
                    <textarea @input=${formDataValidator.inputValidateHandler} name="products" id="description"
                        placeholder="Продукти и грамаж, всеки на нов ред"></textarea>
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">Минимум 3 продукта</span>
            </p>
            <p class="field">
                <label for="description">Стъпки за приготвяне</label>
                <span class="input">
                    <i class="fa-solid fa-shoe-prints"></i>
                    <textarea @input=${formDataValidator.inputValidateHandler} name="steps" id="description"
                        placeholder="Стъпки за приготвяне, всяка на нов ред"></textarea>
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">Минимум 3 стъпки</span>
            </p>
            <p class="field">
                <label for="image">Картинка</label>
                <span class="input">
                    <i class="fa-solid fa-utensils"></i>
                    <input @blur=${checkForExistingPicture} type="text" name="img" id="image"
                        placeholder="Адрес на изображение">
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <input type="file" name="fileImg" id="fileImg" class="custom-file-input" />
                <span class="invalid-input-text non-unique-picture" style="display: none;">
                    Вече съществува рецепта с тази картинка.
                </span>
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
            <p class="field">
                <label for="type">Трудност</label>
                <span class="input">
                    <select id="type" name="difficulty">
                        <option value="" selected hidden>Изберете трудност...</option>
                        <option value="Лесна">Лесна</option>
                        <option value="Средна">Средна</option>
                        <option value="За напреднали">За напреднали</option>
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
    const preparationTime = form.get('preparationTime');
    const products = multiLineInputProcessor.process(form.get('products'));
    const steps = multiLineInputProcessor.process(form.get('steps'));
    const img = form.get('img');
    const category = form.get('category');
    const difficulty = form.get('difficulty');
    const fileImg = form.get('fileImg');

    const thereAreEmptyFieldsLeft = formDataValidator.recipeFormContainsEmptyFields(fileImg, img, name, products, steps, category, preparationTime, difficulty);

    if (thereAreEmptyFieldsLeft) {
        return notify(THERE_ARE_EMPTY_FIELDS_LEFT);
    } else if (formDataValidator.formContainsInvalidInput(e.target)) {
        return notify(THERE_ARE_INVALID_FIELDS_LEFT);
    }

    const newRecipe = {
        recipeName: name,
        difficulty: difficulty, 
        products: products,
        steps: steps,
        imageUrl: img,
        category: category,
        preparationTime: preparationTime,
        ownerId: getCurrentUser()
    }

    form.append('file', fileImg);
    form.append('data', JSON.stringify(newRecipe));

    showLoadingSpinner(document.getElementById('create-form'));

    const createdRecipeId = await createRecipe(form);

    context.page.redirect(`/details-${createdRecipeId.recipeId}`);
    userIsAdministrator || userIsModerator ? notify(CREATED_RECIPE_SUCCESS) : notify(CREATED_RECIPE_SUCCESS_APPROVAL);

    await sendNotifications(
        { id: createdRecipeId.recipeId, recipeName: newRecipe.recipeName },
        POSTED_NEW_RECIPE,
        NEW_RECIPE
    );

    hideLoadingSpinner();
}

async function checkForExistingName(e) {
    const nameField = e.target;
    const nameFieldValue = nameField.value;
    const invalidNameClass = '.invalid-input-text.non-unique-name';

    hideInvalidFieldMessage(nameField, invalidNameClass);

    if (nameFieldValue.trim() !== '') {
        const data = await recipeExistsByName(nameFieldValue);

        if (data.nameExists) {
            cancelValidFieldDecorationAndSetAsInvalid(nameField, invalidNameClass);
        }
    }
}

async function checkForExistingPicture(e) {
    const pictureField = e.target;
    const pictureFieldValue = pictureField.value;
    const invalidPictureClass = '.invalid-input-text.non-unique-picture';

    cancelInvalidFieldDecoration(pictureField);
    hideInvalidFieldMessage(pictureField, invalidPictureClass);

    if (pictureFieldValue.trim() !== '') {
        const data = await recipeExistsByPicture(pictureFieldValue);

        if (data.pictureExists) {
            cancelValidFieldDecorationAndSetAsInvalid(pictureField, invalidPictureClass);
        }
    }
}

function cancelInvalidFieldDecoration(field) {
    field.parentNode.classList.remove('invalid-input');
    field.parentNode.querySelector('.warning-icon').style.display = 'none';
}

function cancelValidFieldDecorationAndSetAsInvalid(field, invalidMessageClass) {
    field.parentNode.classList.remove('valid-input');
    field.parentNode.querySelector('.check-icon').style.display = 'none';

    field.parentNode.classList.add('invalid-input');
    field.parentNode.querySelector('.warning-icon').style.display = 'block';
    field.parentNode.parentNode.querySelector(invalidMessageClass).style.display = 'block';
}

function hideInvalidFieldMessage(field, invalidFieldClass) {
    field.parentNode.parentNode.querySelector(invalidFieldClass).style.display = 'none';
}