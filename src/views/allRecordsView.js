import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll, getRecepiesCount, RECEPIES_PER_PAGE } from '../io/requests.js';

const pageTemplate = (count) => html`
    <a href="?page=${count}" class="button warning page-btn">${count}</a>
`

const paginationTemplate = (pages, currentPage, totalPagesCount) => html`
<div class="page-div">
    <a href=${currentPage - 1 > 0 ? `?page=${currentPage - 1 > 0 ? currentPage - 1 : 1}` : "javascript:void[0]"} class="button warning page-btn"> < </a> 
    
    ${pages} 
    
    <a href=${currentPage + 1 <= totalPagesCount ? `?page=${currentPage + 1 < totalPagesCount ? currentPage + 1 : totalPagesCount}` : 'javascript:void[0]'} class="button warning page-btn"> > </a>
</div>
`;

const noRecordsTemplate = () => html`
<p class="no-books">Все още няма рецепти. Ако желаете да добавите първата, кликнете <a href="add-recipe">тук</a></p>
`;

const allRecordsTemplate = (recepies, currentPage, totalPagesCount, pages) => html`
<section id="dasahboard-page" class="dashboard">
    ${paginationTemplate(pages, currentPage, totalPagesCount)}
<ul class="other-books-list">
    ${recepies ? recepies : noRecordsTemplate()}
</ul>


</section>
`;

const singleRecordTemplate = (data) => html`
        <li class="otherBooks"><a href='/details/${data.objectId}'>
             <h3 style="color: #c28a44;">${data.name}</h3>
             <p class="img"><img src=${data.img}></p>
         </a></li>
`;

export async function viewAllPage(ctx) {

    const currentPage = Number(ctx.querystring.split('=')[1] || 1);

    let data = await getAll(currentPage);
    const singleRecords = data.results.map(singleRecordTemplate);
    
    const totalRecepies = await getRecepiesCount();
    const PAGE_SIZE = RECEPIES_PER_PAGE;
    const totalPagesCount = Math.ceil(totalRecepies.count / PAGE_SIZE);
    
    const pageData = [];
    
    for (let i = 1; i <= totalPagesCount; i++) {
        pageData.push(pageTemplate(i));
    }
    
    const allRecords = allRecordsTemplate(singleRecords, currentPage, totalPagesCount, pageData);
    ctx.render(allRecords);
}