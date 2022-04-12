import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { searchByName } from '../io/requests.js';
import { notify } from './templates/notificationTemplate.js';
import { addUppercase, singleRecordTemplate, noRecordsTemplate, allRecordsTemplate } from './allRecordsView.js';

export const filtrationTemplate = (ctx) => html`
    <form @submit=${(e) => search(e, ctx)}>
        <img @click=${(e) => search(e, ctx)} id="find-img"
        src="../../static/images/istockphoto-1068237878-170667a-removebg-preview.png"> <input type="text" id="myInput"
            placeholder="Търсете по име на рецептата...">
    </form>
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

        const singleRecords = data.results.map(singleRecordTemplate);

        renderSearchResults(data, singleRecords, params, ctx);
    }
}

export function renderSearchResults(data, singleRecords, params, ctx) {
    if (data.results.length > 0) {
        addUppercase(data);

        const newContent = allRecordsTemplate(singleRecords, null, null, null, ctx);

        render(newContent, document.querySelector('.container'));
        hidePagination();
        document.getElementById('myInput').value = params;
    } else {
        render(allRecordsTemplate(singleRecords, null, null, null, ctx), document.querySelector('.container'));
        hidePagination();
        document.getElementById('myInput').value = params;
        notify('Все още няма такива рецепти :)')
    }
}

export function hidePagination() {
    const pagination = document.querySelector('.page-div');
    pagination.style.display = 'none';
}