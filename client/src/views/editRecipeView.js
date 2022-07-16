import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSingleRecipe, otherRecipeExistsByName, otherRecipeExistsByPicture, updateRecipe } from '../services/recipeService.js';
import { notify } from '../utils/notification.js';
import * as formDataValidator from '../utils/formDataValidator.js';
import { getCurrentUser } from '../services/authenticationService.js';
import { EDIT_RECIPE_SUCCESS, THERE_ARE_EMPTY_FIELDS_LEFT, THERE_ARE_INVALID_FIELDS_LEFT } from '../constants/notificationMessages.js';
import { sendNotifications } from './templates/commentTemplate.js';
import { EDITED_RECIPE, NEW_RECIPE } from '../constants/userActions.js';
import { hideLoadingSpinner, showLoadingSpinner } from '../utils/loadingSpinner.js';

const editRecipeTemplate = (data, ctx) => html`
<section id="edit-page" class="edit formData">
    <form 
        @submit=${(e) => editHandler(e, ctx)} 
        id="edit-form" 
        autocomplete="off"
        enctype='multipart/form-data'
        style="position: relative;"
    >
        <fieldset>
            <legend>Редактирай Рецепта</legend>
            <p class="field">
                <label for="title">Наименование</label>
                <span class="input">
                    <i class="fa-solid fa-bowl-rice"></i>
                    <input 
                        @input=${formDataValidator.inputValidateHandler} 
                        @blur=${(e) => checkForOtherExistingName(e, data.recipeName)}
                        type="text" 
                        name="name" 
                        id="title" 
                        placeholder="Име на рецепта" 
                        value=${data.recipeName}
                    >
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">
                    Името трябва да е на български, минимум 4 букви, без символи.
                </span>
                <span class="invalid-input-text non-unique-name" style="display: none;">
                    Вече съществува рецепта с това име.
                </span>
            </p>
            <p class="field">
                <label for="description">Продукти</label>
                <span class="input edit-products-field">
                    <i class="fa-solid fa-book-open"></i>
                    <textarea @input=${formDataValidator.inputValidateHandler} name="products" id="description"
                        placeholder="Продукти и грамаж, всеки на нов ред">
                        ${
                            data.products.length > 1
                                ? data.products.unshift('') && data.products.join('\n')
                                : data.products.map(product => {                                    
                                    return product.split(',').join('\n');
                                }) 
                        }
                    </textarea>
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">Минимум 3 продукта</span>
            </p>
            <p class="field">
                <label for="description">Стъпки за приготвяне</label>
                <span class="input edit-steps-field">
                    <i class="fa-solid fa-shoe-prints"></i>
                    <textarea @input=${formDataValidator.inputValidateHandler} name="steps" id="description"
                        placeholder="Стъпки за приготвяне, всяка на нов ред">
                        ${
                            data.steps.length > 1
                                ? data.steps.unshift('') && data.steps.join('\n')
                                : data.steps.map(step => {                                    
                                    return step.split(',').join('\n');
                                })
                        }
                    </textarea>
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">Минимум 3 стъпки</span>
            </p>
            <p class="field">
                <label for="image">Картинка</label>
                <span class="input">
                    <i class="fa-solid fa-utensils"></i>
                    <input 
                        @blur=${(e) => checkForOtherExistingPicture(e, data.imageUrl)}
                        type="text" 
                        name="img" 
                        id="image" 
                        placeholder="Адрес на изображение" 
                        value=${data.imageUrl}
                    >
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <input type="file" name="fileImg" id="fileImgEdit" />
                <span class="invalid-input-text non-unique-picture" style="display: none;">
                    Вече съществува рецепта с тази картинка.
                </span>
            </p>
            <p class="field">
                <label for="type">Категория</label>
                <span class="input">
                    <select id="type" name="category" .value=${data.categoryName}>
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
            <input class="button submit" type="submit" value="Редактирай">
        </fieldset>
    </form>
</section>
`;

export async function editPage(context) {
    const data = await getSingleRecipe(context.params.id);

    if (getCurrentUser() !== data.ownerId) {
        context.page.redirect('/catalogue');
        return notify('Тази рецепта не е ваша!');
    }

    context.render(editRecipeTemplate(data, context));
}

async function editHandler(e, context) {
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get('name');
    const products = form.get('products').split('\n').map(content => content.trim());
    const steps = form.get('steps').split('\n').map(content => content.trim());
    const img = form.get('img');
    const category = form.get('category');
    const fileImg = form.get('fileImg');

    const thereAreEmptyFieldsLeft = formDataValidator.recipeFormContainsEmptyFields(fileImg, img, name, products, steps, category);

    if (thereAreEmptyFieldsLeft) {
        return notify(THERE_ARE_EMPTY_FIELDS_LEFT);
    } else if (formDataValidator.formContainsInvalidInput(e.target)) {
        return notify(THERE_ARE_INVALID_FIELDS_LEFT);
    }

    const editRecipe = {
        recipeName: name,
        products: products,
        steps: steps,
        imageUrl: img,
        category: category
    }

    form.append('file', fileImg);
    form.append('data', JSON.stringify(editRecipe));

    showLoadingSpinner(document.getElementById('edit-form'));

    await updateRecipe(form, context.params.id);

    notify(EDIT_RECIPE_SUCCESS);
    context.page.redirect(`/details-${context.params.id}`);

    await sendNotifications(
        { id: context.params.id, recipeName: editRecipe.recipeName }, 
        EDITED_RECIPE, 
        NEW_RECIPE
    );

    hideLoadingSpinner();
}

async function checkForOtherExistingName(e, originalRecipeName) {
    const nameField = e.target;
    const nameFieldValue = nameField.value;
    const invalidNameClass = '.invalid-input-text.non-unique-name';

    hideInvalidFieldMessage(nameField, invalidNameClass);

    if (nameFieldValue.trim() !== '') {
        const data = await otherRecipeExistsByName(nameFieldValue, originalRecipeName);
        
        if (data.nameExists) {
            cancelValidFieldDecorationAndSetAsInvalid(nameField, invalidNameClass);
        }
    }
}

async function checkForOtherExistingPicture(e, originalRecipePicture) {
    const pictureField = e.target;
    const pictureFieldValue = pictureField.value;
    const invalidPictureClass = '.invalid-input-text.non-unique-picture';

    cancelInvalidFieldDecoration(pictureField);
    hideInvalidFieldMessage(pictureField, invalidPictureClass);

    if (pictureFieldValue.trim() !== '') {
        const data = await otherRecipeExistsByPicture(pictureFieldValue, originalRecipePicture);
        
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