import { html } from '../../node_modules/lit-html/lit-html.js';
import { createRecipe } from '../services/recipeService.js';
import { notify } from '../utils/notification.js';
import * as formDataValidator from '../utils/formDataValidator.js';
import multiLineInputProcessor from '../utils/multiLineInputProcessor.js';
import { getUserToken } from '../services/userService.js';

const createRecipeTemplate = (ctx) => html`
<section id="create-page" class="create formData">
    <form @submit=${(e)=> createHandler(e, ctx)}
        id="create-form"
        action=""
        method=""
        autocomplete="off"
        enctype='multipart/form-data'
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
        notify('Единствено регистрираните потребители могат да създават рецепти.');
    }
}

async function createHandler(e, context) {
    e.preventDefault();

    const form = new FormData(e.target);

    let name = form.get('name');
    const products = multiLineInputProcessor.process(form.get('products'));
    const steps = multiLineInputProcessor.process(form.get('steps'));
    const img = form.get('img');
    const category = form.get('category');
    const fileImg = form.get('fileImg');

    form.append('file', fileImg);
    
    TODO: //IMAGE VALIDATION
    if (name.trim() == '' || products.length === 0 || steps.length === 0 || category.trim() == '') {
        return notify('Моля попълнете всички полета.');
    } else if (formDataValidator.formContainsInvalidInput(e.target)) {
        return notify('Поправете невалидните полета.');
    }

    const newRecipe = {
        recipeName: name.toLowerCase(),
        products: products,
        steps: steps,
        imageUrl: img,
        category: category,
        ownerId: 1
    }

    form.append('data', JSON.stringify(newRecipe));

    notify('Успешно създадохте рецептата си! При нужда можете да я редактирате от бутончетата.');

    const createdRecipe = await createRecipe(form);
    // const createdRecipe = await createRecipe(newRecipe);
    context.page.redirect(`/details-${createdRecipe.objectId}`);
}