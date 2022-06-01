import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAllRecepies } from '../services/recipeService.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { buildPagination, lightUpActivePaginationButton, paginationTemplate } from './templates/paginationTemplate.js';
import { noSuchRecipesTemplate } from './templates/noRecepiesFoundTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';
import { categoryDropdownTemplate } from './templates/categoryDropdownTemplate.js';
import { searchTemplate } from './templates/searchTemplate.js';
import { navigateDownHandler } from './landingView.js';

const allRecordsTemplate = (recepies, currentPage, totalPagesCount, pages, ctx) => html`
    <section id="filtration-section" class="dashboard">
        ${searchTemplate(ctx)}
        ${categoryDropdownTemplate(ctx)}
    </section>
    ${paginationTemplate(pages, currentPage, totalPagesCount)}
    <section id="cards-section">
        <div id="cards">
            <div id="cards-content">
                <ul class="recipe-card-list">
                    ${recepies.length > 0 ? recepies : noSuchRecipesTemplate()}
                </ul>
            </div>
        </div>
    </section>
`;

export async function cataloguePage(ctx) {
    ctx.render(loaderTemplate());

    const currentPage = Number(ctx.querystring.split('=')[1] || 1);

    let data = getAllRecepies(currentPage);

    const pagination = buildPagination();

    const[recipeData, paginationData] = await Promise.all([data, pagination]);

    const recipes = recipeData.results.map(recipeTemplate);

    const allRecords = allRecordsTemplate(
        recipes,
        currentPage,
        paginationData.totalPagesCount,
        paginationData.pageData,
        ctx
    );

    ctx.render(allRecords);

    lightUpActivePaginationButton(ctx);

    if (sessionStorage.getItem('landingRedirect')) {
        sessionStorage.removeItem('landingRedirect');
        navigateDownHandler();
    }
}