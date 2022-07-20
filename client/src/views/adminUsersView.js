import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getCurrentUser } from "../services/authenticationService.js";
import { socket } from "../services/socketioService.js";
import { getAllUsers, searchUsersByUsername } from "../services/userService.js";
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
    const query = ctx.canonicalPath.split('=')[1];

    let data;

    if (ctx.canonicalPath.includes('search')) {
        data = await searchUsersByUsername(currentPage, query);
    } else {
        data = await getAllUsers(currentPage);
    }

    const users = data.content.map(data => userRowTemplate(ctx, data));

    render(applicationUsersTemplate(users, data), document.getElementById('admin-root'));

    socket.emit("checkForOnlineUsers", getCurrentUser());
}

socket.on('connectedUsers', data => {
    data.forEach(user => {
        console.log(user.userId);
        const userStatusSpan = document.querySelector(`.status-container-${user.userId}`);

        userStatusSpan.textContent = 'Online';
        userStatusSpan.classList.remove('user-status-offline');
        userStatusSpan.classList.add('user-status-online');
    });
});