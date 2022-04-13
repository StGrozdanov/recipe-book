import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSingleRecipe, updateRecipe } from '../services/recipeService.js';
import { notify } from './templates/notificationTemplate.js';

const editTemplate = (data, ctx) => html`
<section id="edit-page" class="edit formData">
    <form id="edit-form" action="#" method="">
        <fieldset>
            <legend>Редактирай Рецепта</legend>
            <p class="field">
                <label for="title">Наименование</label>
                <span class="input">
                    <input type="text" name="name" id="title" placeholder="Име на рецепта" value=${data.name}>
                </span>
            </p>
            <p class="field">
                <label for="description">Продукти</label>
                <span class="input">
                    <textarea name="products" id="description" placeholder="Продукти и грамаж, всеки на нов ред">${data.products.join('\n')}</textarea>
                </span>
            </p>
            <p class="field">
                <label for="description">Стъпки за приготвяне</label>
                <span class="input">
                    <textarea name="steps" id="description" placeholder="Стъпки за приготвяне, всяка на нов ред">${data.steps.join('\n')}</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Картинка</label>
                <span class="input">
                    <input type="text" name="img" id="image" placeholder="Адрес на изображение" value=${data.img}>
                </span>
            </p>
            <p class="field">
                <label for="type">Категория</label>
                <span class="input">
                    <select id="type" name="category" .value=${data.category}>
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
            <input @click=${(e) => editHandler(e, ctx)} class="button submit" type="submit" value="Редактирай">
        </fieldset>
    </form>
</section>
`;

export async function editPage(context) {
    const data = await getSingleRecipe(context.params.id);
    data.name = data.name[0].toUpperCase() + data.name.substring(1, data.name.length);
    context.render(editTemplate(data, context));
}

async function editHandler(e, context) {
    e.preventDefault();

    const form = new FormData(document.getElementById('edit-form'));
    const name = form.get('name');
    const products = form.get('products').split('\n').map(content => content.trim());
    const steps = form.get('steps').split('\n').map(content => content.trim());
    const img = form.get('img');
    const category = form.get('category');

    if (name == '' || products.length === 0 || steps.length === 0 || img == '' || category == '') {
        return notify('All fields are required!');
    } 
    const editRecipe = {
        name: name.toLowerCase(),
        products: products,
        steps: steps,
        img: img,
        category: category
    }
    await updateRecipe(editRecipe, context.params.id);
    context.page.redirect(`/details/${context.params.id}`);
}