import { html } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../io/requests.js';
import { notify } from './common/notificationTemplate.js';

const createTemplate = (ctx) => html`
<section id="create-page" class="create formData">
    <form id="create-form" action="" method="">
        <fieldset>
            <legend>Нова рецепта</legend>
            <p class="field">
                <label for="title">Наименование</label>
                <span class="input">
                    <input type="text" name="name" id="title" placeholder="Име на рецепта">
                </span>
            </p>
            <p class="field">
                <label for="description">Продукти</label>
                <span class="input">
                    <textarea name="products" id="description"
                        placeholder="Продукти и грамаж, всеки на нов ред"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="description">Стъпки за приготвяне</label>
                <span class="input">
                    <textarea name="steps" id="description"
                        placeholder="Стъпки за приготвяне, всяка на нов ред"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Картинка</label>
                <span class="input">
                    <input type="text" name="img" id="image" placeholder="Адрес на изображение">
                </span>
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
            <input @click=${(e)=> createHandler(e, ctx)} class="button submit" type="submit" value="Създай рецепта">
        </fieldset>
    </form>
</section>
`;

export function createPage(context) {
    if (sessionStorage.getItem('authToken') != null) {
        context.render(createTemplate(context))
    } else {
        notify('Единствено регистрираните потребители могат да създават рецепти.');
    }
}

async function createHandler(e, context) {
    e.preventDefault();

    const form = new FormData(document.getElementById('create-form'));
    let name = form.get('name');
    const products = form.get('products').split('\n').map(content => content.trim());
    const steps = form.get('steps').split('\n').map(content => content.trim());
    const img = form.get('img');
    const category = form.get('category');

    if (name == '' || products.length === 0 || steps.length === 0 || img == '' || category == '') {
        return notify('Моля попълнете всички полета.');
    }

    const createRecipe = {
        name: name.toLowerCase(),
        products: products,
        steps: steps,
        img: img,
        category: category
    }
    notify('Успешно създадохте рецептата си! При нужда можете да я редактирате от бутончетата.');
    const createdRecipe = await create(createRecipe);
    context.page.redirect(`/details/${createdRecipe.objectId}`);
}