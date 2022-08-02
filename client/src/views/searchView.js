import { html, nothing, render } from '../../node_modules/lit-html/lit-html.js';
import { searchByRecipeName } from '../services/filtrationService.js';
import { noSuchRecipesTemplate } from './templates/noRecepiesFoundTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';
import { searchTemplate } from './templates/searchTemplate.js';

const searchPageTemplate = (recepies, ctx, query) => html`
    <section id="filtration-section" class="dashboard">
        ${searchTemplate(ctx)}
    </section>
    <section id="cards-section">
        <div id="cards">
            ${
                recepies.length > 0 
                    ? html`<a class="return-anker" style="font-weight: bold;" href="/catalogue"></a>` 
                    : nothing
            }
            <h2 class="filtration-heading">Рецепти, съдържащи "${query}" в името си:</h2>
            <img class="search-img" src="../static/images/istockphoto-1209388288-612x612-removebg-preview.png">
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
    const query = params.toLowerCase();

    if (params) {
        const data = await searchByRecipeName(query);

        const recipes = data.map(recipeTemplate);

        renderSearchResults(recipes, params, ctx);
    }
}

export function renderSearchResults(recipes, params, ctx) {
        const newContent = searchPageTemplate(recipes, ctx, params);

        render(newContent, document.querySelector('.container'));

        document.getElementById('myInput').value = params;
}