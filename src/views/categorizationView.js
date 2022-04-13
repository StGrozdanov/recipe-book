import { html, render } from '../../node_modules/lit-html/lit-html.js';

import { filterByCategory } from '../services/filtrationService.js';
import { addUppercase, singleRecordTemplate } from './allRecordsView.js';
import { filtrationTemplate } from './filtrationView.js';
import { notify } from './templates/notificationTemplate.js';

export const categorizationTemplate = (ctx) => html`
<form>
    <div class="multiselect">
        <div @click=${showCheckboxes} class="selectBox dropdown-toggle">
            <i class="fa-solid fa-circle-chevron-down"></i>
            <select style="border: none;">
                <option>Категории</option>
            </select>
            <div class="overSelect"></div>
        </div>
        <div @change=${(e) => categorize(e, ctx)} id="checkboxes" style="display: none;">
            <label for="one">
                <input type="checkbox" id="one" value="Всички" checked /><span></span>Всички</label>
            <label for="two">
                <input type="checkbox" id="two" value="Пилешко" /><span></span>Пилешко</label>
            <label for="three">
                <input type="checkbox" id="three" value="Свинско" /><span></span>Свинско</label>
            <label>
                <input type="checkbox" value="Телешко" /><span></span>Телешко</label>
            <label>
                <input type="checkbox" value="Телешко\-свинско" /><span></span>Телешко-свинско</label>
            <label>
                <input type="checkbox" value="Риба" /><span></span>Риба</label>
            <label>
                <input type="checkbox" value="Други месни" /><span></span>Други месни</label>
            <label>
                <input type="checkbox" value="Вегитариански" /><span></span>Вегитариански</label>
            <label>
                <input type="checkbox" value="Салати" /><span></span>Салати</label>
            <label>
                <input type="checkbox" value="Тестени" /><span></span>Тестени</label>
            <label>
                <input type="checkbox" value="Десерти" /><span></span>Десерти</label>
            <label>
                <input type="checkbox" value="Други" /><span></span>Други</label>
        </div>
    </div>
</form>
`;

const filterByCategoryTemplate = (ctx, recepies) => html`
<section id="filtration-section" class="dashboard">
    ${filtrationTemplate(ctx)}
    ${categorizationTemplate(ctx)}
</section>
<section id="cards-section">
    <div id="cards">
        <h2 class="filtration-heading">Рецепти от категория: ${ctx.pathname.split('=')[1].replaceAll('&', ', ')}</h2>
        <div id="cards-content">
            <ul class="other-books-list">
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

        const singleRecords = data.results.map(singleRecordTemplate);

        renderCategorizationResults(singleRecords, query, ctx);
    }
}

export function renderCategorizationResults(singleRecords, params, ctx) {
        const newContent = filterByCategoryTemplate(ctx, singleRecords)

        render(newContent, document.querySelector('.container'));

        const checks = document.querySelectorAll('[type=checkbox]');

        Array.from(checks).filter(c => params.has(c.defaultValue)).map(element => element.checked = true);

        document.getElementById('one').checked = false;

        document.getElementById("checkboxes").style.display = 'flex';
}

export async function categorize(e, ctx) {
    selectHandler(e);

    let category = e.target.value;
    if (e.target.checked && query.size <= 4) {
        query.add(category);
    } else if (!e.target.checked) {
        query.delete(category);
    }

    document.getElementById('myInput').value = '';

    if (query.size > 0 && !query.has('Всички')) {
        ctx.page.redirect(`/categorize=${Array.from(query).join('&')}`);
    } else if (query.size === 0 || query.has('Всички')) {
        ctx.page.redirect('/');
        query.clear();
    }
}

let expanded = false;

function showCheckboxes() {
    const checkboxes = document.getElementById("checkboxes");

    if (!expanded) {
        checkboxes.style.display = "flex";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function selectHandler(e) {
    const checks = document.querySelectorAll('[type=checkbox]');
    const checkedBoxesCount = Array.from(checks).filter(c => c.checked).length;

    if (checkedBoxesCount <= 4 && e.target.id !== 'one') {

        //if 'all' checbox is checked uncheck everything
        if (e.target.id === 'one') {
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
        if (e.target.id !== 'one') {
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