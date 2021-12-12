import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../io/requests.js';

const noRecordsTemplate = () => html`
<p class="no-books">Все още няма рецепти. Ако желаете да добавите първата, кликнете <a href="add-recipe">тук</a></p>
`;

const allRecordsTemplate = (recepies) => html`
<section id="dasahboard-page" class="dashboard">
<ul class="other-books-list">
    ${recepies ? recepies : noRecordsTemplate()}
</ul>
</section>
`;

const singleRecordTemplate = (data) => html`
        <li class="otherBooks"><a href='/details/${data.objectId}'>
             <h3>${data.name}</h3>
             <p class="img"><img src=${data.img}></p>
         </a></li>
`;

export async function viewAllPage(ctx) {
    let data = await getAll();
    const singleRecords = data.results.map(singleRecordTemplate);
    const allRecords = allRecordsTemplate(singleRecords);

    ctx.render(allRecords);
}