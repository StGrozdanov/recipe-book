import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { filterByCategory } from '../services/filtrationService.js';
import { notify } from '../utils/notification.js';
import { addUppercase } from '../utils/capitalizator.js';
import { recipeTemplate } from './templates/recipeTemplate.js';
import { categoryDropdownTemplate } from './templates/categoryDropdownTemplate.js';
import { searchTemplate } from './templates/searchTemplate.js';

const filterByCategoryTemplate = (ctx, recepies) => html`
<section id="filtration-section" class="dashboard">
    ${searchTemplate(ctx)}
    ${categoryDropdownTemplate(ctx)}
</section>
<section id="cards-section">
    <div id="cards">
        <h2 class="filtration-heading">Рецепти от категория: ${ctx.pathname.split('=')[1].replaceAll('&', ', ')}</h2>
        <div id="cards-content">
            <ul class="recipe-card-list">
                ${recepies.length > 0 ? recepies :  html`<li><h3>Все още няма рецепти от тази категория</h3></li>`}
            </ul>
        </div>
    </div>
</section>
`;

let query = new Set();

export async function categorizationPage(ctx) {
    const params = ctx.pathname.split('=')[1].split('&') || '';

    if (params && params.length <= 4) {
        params.forEach(param => query.add(param));

        const data = await filterByCategory(query);
        addUppercase(data);

        const recipes = data.results.map(recipeTemplate);

        renderCategorizationResults(recipes, query, ctx);
    }
}

function renderCategorizationResults(recipes, params, ctx) {
        const newContent = filterByCategoryTemplate(ctx, recipes);
        render(newContent, document.querySelector('.container'));

        expandCheckboxWithSelectedCategories(params);
}

export async function categorize(e, ctx) {
    selectHandler(e);

    let category = e.target.value;
    if (e.target.checked && query.size <= 4) {
        query.add(category);
    } else if (!e.target.checked) {
        query.delete(category);
    }

    clearSearchField();

    if (query.size > 0 && !query.has('Всички')) {
        ctx.page.redirect(`/categorize=${Array.from(query).join('&')}`);
    } else if (query.size === 0 || query.has('Всички')) {
        ctx.page.redirect('/');
        query.clear();
    }
}

function selectHandler(e) {
    const checks = document.querySelectorAll('[type=checkbox]');
    const checkedBoxesCount = Array.from(checks).filter(c => c.checked).length;

    if (checkedBoxesCount <= 4 && e.target.id !== 'all-categories') {
        //if 'all' checbox is checked uncheck everything
        if (e.target.id === 'all-categories') {
            checks[0].checked = true;

            checks.forEach((c, index) => {
                if (index > 0) {
                    c.checked = false;
                }
            });
        }
        //if something else is checked 'all' checkbox is unchecked
        let selected = true;

        checks.forEach((c, index) => {
            if (index > 0) {
                c.checked === true ? selected = false : ''
            }
        });
        selected ? checks[0].checked = true : checks[0].checked = false;
    } else {
        if (e.target.id !== 'all-categories') {
            e.target.checked = false;
            notify('Можете да филтрирате до 4 категории рецепти.');
        } else {
            checks[0].checked = true;

            checks.forEach((c, index) => {
                if (index > 0) {
                    c.checked = false;
                }
            });
        }
    }
}

function expandCheckboxWithSelectedCategories(params) {
    const checks = document.querySelectorAll('[type=checkbox]');

    Array.from(checks).filter(c => params.has(c.defaultValue)).map(element => element.checked = true);

    document.getElementById('all-categories').checked = false;

    document.getElementById("checkboxes").style.display = 'flex';
}

function clearSearchField() {
    document.getElementById('myInput').value = '';
}