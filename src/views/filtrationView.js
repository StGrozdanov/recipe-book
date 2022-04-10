import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { filterByCategory, RECEPIES_PER_PAGE, searchByName } from '../io/requests.js';
import { notify } from './templates/notificationTemplate.js';
import { addUppercase, singleRecordTemplate, pageTemplate, paginationTemplate, noRecordsTemplate, viewAllPage } from './allRecordsView.js';

export const filtrationTemplate = (ctx) => html`
<section id="filtration-section" class="dashboard">
    <form @submit=${(e) => search(e, ctx)}>
        <img @click=${(e) => search(e, ctx)} id="find-img"
        src="../../static/images/istockphoto-1068237878-170667a-removebg-preview.png"> <input type="text" id="myInput"
            placeholder="Търсете по име на рецептата...">
    </form>
    <form>
        <div class="multiselect">
            <div @click=${showCheckboxes} class="selectBox dropdown-toggle">
                <select style="border: none;">
                    <option>Категории...</option>
                </select>
                <div class="overSelect"></div>
            </div>
            <div @change=${(e)=> categorize(e, ctx)} id="checkboxes">
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
</section>
`;

const multiRecordTemplate = (recepies) => html`
<ul class="other-books-list" style="display: flex;">
    ${recepies ? recepies : noRecordsTemplate()}
</ul>
`;

async function search(e, ctx) {
    e.preventDefault();
    const inputField = document.getElementById('myInput');

    let query = inputField.value.toLowerCase();

    if (query.trim() !== '') {
        const data = await searchByName(query);

        if (data.results.length > 0) {
            addUppercase(data);

            const singleRecords = data.results.map(singleRecordTemplate);

            let oldContent = document.getElementById('cards-content');
            oldContent.textContent = ''

            hidePagination();

            const newContent = multiRecordTemplate(singleRecords);
            render(newContent, document.getElementById('cards'));
        } else {
            ctx.render(noRecordsTemplate());
        }
    } else {
        notify('Добър опит! Сега пробвайте да въведете и буквички.')
    }
}

export async function searchPage(ctx) {
    const params = ctx.pathname.split('=')[1] || '';

    if (params) {
        let query = params.toLowerCase();
        const data = await searchByName(query);

        if (data.results.length > 0) {
            addUppercase(data);

            const singleRecords = data.results.map(singleRecordTemplate);

            const newContent = multiRecordTemplate(singleRecords);

            render(newContent, document.querySelector('.container'));
        } else {
            ctx.render(noRecordsTemplate());
        }
    }
}

function hidePagination() {
    const pagination = document.querySelector('.page-div');
    pagination.style.display = 'none';
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
    const checks = document.querySelectorAll('[type=checkbox]');
    checks.forEach(c => c.addEventListener('click', selectHandler));
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

let query = new Set();

async function categorize(e, ctx) {
    let oldContent = document.getElementById('cards-content');
    oldContent.textContent = ''
    let category = e.target.value;

    if (e.target.checked) {
        query.add(category);
    } else if (!e.target.checked) {
        query.delete(category);
    }

    document.getElementById('myInput').value = '';

    if (Array.from(query).length > 0 && !query.has('Всички')) {
        const data = await filterByCategory(query);
        addUppercase(data);

        const singleRecords = data.results.map(singleRecordTemplate);

        const newContent = multiRecordTemplate(singleRecords);

        hidePagination();

        render(newContent, document.getElementById('cards'));
    } else if (Array.from(query).length === 0 || query.has('Всички')) {
        ctx.page.redirect('/');
        query.clear();
    }
}