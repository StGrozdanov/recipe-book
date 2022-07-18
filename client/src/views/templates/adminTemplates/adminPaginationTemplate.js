import { html } from "../../../../node_modules/lit-html/lit-html.js";

export const adminPaginationTemplate = ({ first, last, totalPages, number }) => html`
        <div class="pagination-container">
            <a href=${first ? 'javascript:void[0]' : `?page=${number}`} class="pagination-btn"> < </a>
                ${`${number + 1} от ${totalPages}`}
            <a href=${last ? 'javascript:void[0]' : `?page=${number + 2}`} class="pagination-btn"> > </a>
        </div>
`;