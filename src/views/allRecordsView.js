import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { filterByCategory, getAll, getRecepiesCount, RECEPIES_PER_PAGE, searchByName } from '../io/requests.js';
import { loaderTemplate } from './common/loadingTemplate.js';
import { notify } from './common/notificationTemplate.js';

const pageTemplate = (count) => html`
    <a href="?page=${count}" class="button warning page-btn">${count}</a>
`

const paginationTemplate = (pages, currentPage, totalPagesCount) => html`
<div class="page-div">
    <a href=${currentPage - 1> 0 ? `?page=${currentPage - 1 > 0 ? currentPage - 1 : 1}` : "javascript:void[0]"}
        class="button warning page-btn"> < </a> ${pages} <a href=${currentPage + 1 <=totalPagesCount ?
            `?page=${currentPage + 1 < totalPagesCount ? currentPage + 1 : totalPagesCount}` : 'javascript:void[0]' }
            class="button warning page-btn"> > </a>
</div>
`;

const noRecordsTemplate = () => html`
<p class="no-books">Все още няма такива рецепти. Ако желаете да добавите първата, кликнете <a href="add-recipe">тук</a>
    или върнете нормалния изглед от <a href="/">тук</a></p>
`;

const allRecordsTemplate = (recepies, currentPage, totalPagesCount, pages, ctx) => html`
<section id="dasahboard-page" class="dashboard">
    <span class="input">
        <form style="float:right; margin-left: -65px;">
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
    </span>
    <form @submit=${() => search(ctx)}>
        <img @click=${() => search(ctx)} id="find-img"
        src="../../static/images/istockphoto-1068237878-170667a-removebg-preview.png"> <input type="text" id="myInput"
            placeholder="Търсете по име на рецептата...">
    </form>
    <div id="cards">
    <div id="cards-content">
        ${paginationTemplate(pages, currentPage, totalPagesCount)}
        <ul class="other-books-list">
            ${recepies ? recepies : noRecordsTemplate()}
        </ul>
    </div>
    </div>
</section>
`;

const singleRecordTemplate = (data) => html`
        <li class="otherBooks"><a href='/details/${data.objectId}'>
                <h3 style="color: #c28a44;">${data.name}</h3>
                <p class="img"><img src=${data.img}></p>
            </a></li>
`;

const multiRecordTemplate = (recepies, currentPage, totalPagesCount, pages) => html`
${paginationTemplate(pages, currentPage, totalPagesCount)}
<ul class="other-books-list">
    ${recepies ? recepies : noRecordsTemplate()}
</ul>
`;

export async function viewAllPage(ctx) {
    ctx.render(loaderTemplate());
    const currentPage = Number(ctx.querystring.split('=')[1] || 1);

    let data = await getAll(currentPage);
    addUppercase(data);

    const singleRecords = data.results.map(singleRecordTemplate);

    const totalRecepies = await getRecepiesCount();
    const PAGE_SIZE = RECEPIES_PER_PAGE;
    const totalPagesCount = Math.ceil(totalRecepies.count / PAGE_SIZE);

    const pageData = [];

    for (let i = 1; i <= totalPagesCount; i++) {
        pageData.push(pageTemplate(i));
    }

    const allRecords = allRecordsTemplate(singleRecords, currentPage, totalPagesCount, pageData, ctx);
    ctx.render(allRecords);
}

async function search(ctx) {
    const inputField = document.getElementById('myInput');

    let query = inputField.value.toLowerCase();

    if (query.trim() !== '') {

        ctx.render(loaderTemplate());

        const currentPage = Number(ctx.querystring.split('=')[1] || 1);

        const data = await searchByName(currentPage, query);

        if (data.results.length > 0) {
            addUppercase(data);

            const singleRecords = data.results.map(singleRecordTemplate);

            const totalRecepies = data.results.length;
            const PAGE_SIZE = RECEPIES_PER_PAGE;
            const totalPagesCount = Math.ceil(totalRecepies.count / PAGE_SIZE);

            const pageData = [];

            for (let i = 1; i <= totalPagesCount; i++) {
                pageData.push(pageTemplate(i));
            }

            const allRecords = allRecordsTemplate(singleRecords, currentPage, totalPagesCount, pageData, ctx);
            ctx.render(allRecords);
        } else {
            ctx.render(noRecordsTemplate());
        }
    } else {
        notify('Добър опит! Сега пробвайте да въведете и буквички.')
    }
}

export function addUppercase(arr) {
    arr.results.map(obj => obj.name = obj.name[0].toUpperCase() + obj.name.substring(1, obj.name.length));
}

let expanded = false;

function showCheckboxes() {
    const checkboxes = document.getElementById("checkboxes");

    if (!expanded) {
        checkboxes.style.display = "block";
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

    if (e.target.checked && category != 'Всички') {
        query.add(category);
    } else if (!e.target.checked && category != 'Всички') {
        query.delete(category);
    }

    const currentPage = Number(ctx.querystring.split('=')[1] || 1);
    console.log(ctx.querystring)

    const data = await filterByCategory(currentPage, query);
    addUppercase(data);

    const singleRecords = data.results.map(singleRecordTemplate);

    const totalRecepies = data.results.length;
    const PAGE_SIZE = RECEPIES_PER_PAGE;
    const totalPagesCount = Math.ceil(totalRecepies.count / PAGE_SIZE);

    const pageData = [];

    for (let i = 1; i <= totalPagesCount; i++) {
        pageData.push(pageTemplate(i));
    }
    const newContent = multiRecordTemplate(singleRecords, currentPage, totalPagesCount, pageData);
    render(newContent, document.getElementById('cards'));
}