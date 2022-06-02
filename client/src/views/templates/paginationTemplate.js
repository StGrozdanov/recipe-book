import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getRecepiesCount, RECEPIES_PER_PAGE } from "../../services/recipeService.js";

const pageButtonTemplate = (pageNumber) => html`
    <a href="?page=${pageNumber}" class="button warning page-btn"}>${pageNumber}</a>
`
export const paginationTemplate = (pages, currentPage, totalPagesCount) => html`
    <section id="pagination-section">
        <div class="page-div"}>
            <a href=${
                currentPage - 1 > 0 
                            ? `?page=${currentPage - 1 > 0 ? currentPage - 1 : 1}` 
                            : "javascript:void[0]"
            }
            class="button warning page-btn"> < </a> ${pages} <a href=${
            currentPage + 1 <= totalPagesCount 
                            ?`?page=${currentPage + 1 < totalPagesCount ? currentPage + 1 : totalPagesCount}` 
                            : 'javascript:void[0]'
            } 
            class="button warning page-btn"> > </a>
        </div>
    </section>
`;

export async function buildPagination() {
    const totalRecepies = await getRecepiesCount();
    const PAGE_SIZE = RECEPIES_PER_PAGE;
    const totalPagesCount = Math.ceil(totalRecepies.count / PAGE_SIZE);

    const pageData = [];

    for (let i = 1; i <= totalPagesCount; i++) {
        pageData.push(pageButtonTemplate(i));
    }
    
    return { pageData: pageData, totalPagesCount: totalPagesCount }
}

export function lightUpActivePaginationButton(ctx) {
    const pageButtons = document.querySelectorAll('#pagination-section div a');

    const currentPage = ctx.querystring.split('=')[1];

    const targetButton = Array.from(pageButtons).find(button => button.textContent == currentPage);

    if (targetButton) {
        targetButton.classList.add('active-btn');
    } else {
        pageButtons[1].classList.add('active-btn');
    }
}