import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getAllCommentsAdmin, searchComments } from "../services/commentService.js";
import { loaderTemplate } from "./templates/adminTemplates/adminLoadingTemplate.js";
import { adminPaginationTemplate } from "./templates/adminTemplates/adminPaginationTemplate.js";
import { commentRowTemplate } from "./templates/adminTemplates/adminTableCommentRowTemplate.js";

const applicationCommentsTemplate = (comments, data) => html`
<div class="wrapper-table-wrapper">
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th style="width: 45%">Коментар</th>
                    <th>Собственик</th>
                    <th>Локация</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                ${comments}
            </tbody>
        </table>
    </div>
</div>
${adminPaginationTemplate(data)}
`;

export async function adminPanelCommentsPage(ctx) {
    render(loaderTemplate(), document.getElementById('admin-root'));

    const currentPage = Number(ctx.querystring.split('=')[1] || 1);
    const query = ctx.canonicalPath.split('=')[1];

    let data;

    if (ctx.canonicalPath.includes('search')) {
        data = await searchComments(query, currentPage);
    } else {
        data = await getAllCommentsAdmin(currentPage);
    }

    const comments = data.content.map(data => commentRowTemplate(data, ctx));
    
    render(applicationCommentsTemplate(comments, data), document.getElementById('admin-root'));
}