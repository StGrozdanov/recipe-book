import { html } from "../../../node_modules/lit-html/lit-html.js";

const pageButtonTemplate = (pageNumber) => html`
    <a href="?page=${pageNumber}" class="button warning page-btn"}>${pageNumber}</a>
`
export const paginationTemplate = ({ first, last, totalPages, number }, pages) => html`
    <section id="pagination-section">
        <div class="page-div"}>
            <a href=${first ? 'javascript:void[0]' : `?page=${number}`} class="button warning page-btn"> < </a>
                ${
                    totalPages > 4
                        ? pages.pageData.slice(number, number + 4).length === 3 
                            ? pages.pageData.slice(number, number + 4)
                            : pages.pageData.slice(number - 1, number + 3)
                        : pages.pageData
                } 
            <a href=${last ? 'javascript:void[0]' : `?page=${number + 2}`} class="button warning page-btn"> > </a>
        </div>
    </section>
`;

export function buildPagination(data) {
    const pageData = [];

    for (let i = 1; i <= data.totalPages; i++) {
        pageData.push(pageButtonTemplate(i));
    }
    
    return { pageData: pageData }
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