import { html } from '../../../../node_modules/lit-html/lit-html.js';

export const userRowTemplate = (ctx, { id, avatarUrl, username, primaryRole }) => html`
    <tr>
        <td>${id}</td>
        <td>
            <div class="user-table-profile-avatar-container">
                <img 
                    alt="user-profile" 
                    class="user-profile-avatar" 
                    src=${
                        !avatarUrl || avatarUrl === 'null'
                            ? "../../static/images/Avatar.png"
                            : avatarUrl
                    } 
                    onerror="this.onerror=null;this.src='../../static/images/Avatar.png';" 
                />
            </div>
            ${username}
        </td>
        <td>${primaryRole}</td>
        <td>
            <span class=${`user-status-offline status-container-${id}`}>Offline</span>
        </td>
        <td>
            <span @click=${() => userEditHandler(id, ctx)} class="user-action-edit">Редактирай</span> 
            <span class="user-action-block">Блокирай</span> 
            <span class="user-action-delete">Изтрий</span>
        </td>
    </tr>
`;

function userEditHandler(userId, ctx) {
    ctx.page.redirect(`/administrate/users/edit-${userId}`);
}