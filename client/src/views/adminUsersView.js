import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getAllUsers } from "../services/userService.js";
import { loaderTemplate } from "./templates/adminTemplates/adminLoadingTemplate.js";
import { adminPaginationTemplate } from "./templates/adminTemplates/adminPaginationTemplate.js";
import { userRowTemplate } from "./templates/adminTemplates/adminTableUserRowTemplate.js";

const applicationUsersTemplate = (users, data) => html`
<div class="wrapper-table-wrapper" style="position: relative;">
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Потребител</th>
                    <th>Роля</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                ${users}
            </tbody>
        </table>
    </div>
</div>
${adminPaginationTemplate(data)}
`;

export async function adminPanelUsersPage(ctx) {
    render(loaderTemplate(), document.getElementById('admin-root'));

    const currentPage = Number(ctx.querystring.split('=')[1] || 1);

    let data = await getAllUsers(currentPage);

    const users = data.content.map(userRowTemplate);

    render(applicationUsersTemplate(users, data), document.getElementById('admin-root'));
}