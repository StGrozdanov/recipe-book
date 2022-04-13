import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { searchByName } from '../services/filtrationService.js';
import { addUppercase } from '../utils/capitalizator.js';
import { notify } from '../utils/notification.js';
import { noSuchRecipesTemplate } from './templates/noRecepiesFoundTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';

export const filtrationTemplate = (ctx) => html`
    <form @submit=${(e) => search(e, ctx)}>
        <img @click=${(e) => search(e, ctx)} id="find-img"
        src="../../static/images/istockphoto-1068237878-170667a-removebg-preview.png"> 
        <input type="text" id="myInput" placeholder="Търсете по име на рецептата...">
    </form>
`;

export const searchResultsTemplate = (recepies, ctx, query) => html`
<section id="filtration-section" class="dashboard">
    ${filtrationTemplate(ctx)}
</section>
    <section id="cards-section">
    <div id="cards">
        <h2 class="filtration-heading">Рецепти, съдържащи ${query} в името си:</h2>
        <div id="cards-content">
            <ul class="recipe-card-list">
                ${recepies.length > 0 ? recepies : noSuchRecipesTemplate()}
            </ul>
        </div>
    </div>
    </section>
`;

async function search(e, ctx) {
    e.preventDefault();
    const inputField = document.getElementById('myInput');

    let query = inputField.value;

    if (query.trim() !== '') {
        ctx.page.redirect(`/search=${query}`);
    } else {
        notify('Добър опит! Сега пробвайте да въведете и буквички.')
    }
}

export async function filtrationPage(ctx) {
    const params = ctx.pathname.split('=')[1] || '';

    if (params) {
        let query = params.toLowerCase();
        const data = await searchByName(query);
        addUppercase(data);

        const recipes = data.results.map(recipeTemplate);

        renderSearchResults(recipes, params, ctx);
    }
}

export function renderSearchResults(recipes, params, ctx) {
        const newContent = searchResultsTemplate(recipes, ctx, params);

        render(newContent, document.querySelector('.container'));

        document.getElementById('myInput').value = params;
}