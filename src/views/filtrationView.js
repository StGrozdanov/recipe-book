import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { searchByName } from '../services/filtrationService.js';
import { notify } from './templates/notificationTemplate.js';
import { addUppercase, singleRecordTemplate, noRecordsTemplate } from './allRecordsView.js';

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
            <ul class="other-books-list">
                ${recepies.length > 0 ? recepies : noRecordsTemplate()}
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

        const singleRecords = data.results.map(singleRecordTemplate);

        renderSearchResults(singleRecords, params, ctx);
    }
}

export function renderSearchResults(singleRecords, params, ctx) {
        const newContent = searchResultsTemplate(singleRecords, ctx, params);

        render(newContent, document.querySelector('.container'));

        document.getElementById('myInput').value = params;
}