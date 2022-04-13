import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { searchByName } from '../services/filtrationService.js';
import { addUppercase } from '../utils/capitalizator.js';
import { notify } from '../utils/notification.js';
import { noSuchRecipesTemplate } from './templates/noRecepiesFoundTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';
import { searchTemplate } from './templates/searchTemplate.js';

const searchPageTemplate = (recepies, ctx, query) => html`
<section id="filtration-section" class="dashboard">
    ${searchTemplate(ctx)}
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

export async function searchPage(ctx) {
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
        const newContent = searchPageTemplate(recipes, ctx, params);

        render(newContent, document.querySelector('.container'));

        document.getElementById('myInput').value = params;
}