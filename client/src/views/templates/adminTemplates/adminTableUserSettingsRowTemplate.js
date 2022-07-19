import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { changeUserRole } from '../../../services/userService.js';

export const userSettingsRowTemplate = (ctx, { id, avatarUrl, username, primaryRole, blocked }) => html`
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
            <span class=${`user-status-offline status-container-${id}`}>${blocked ? 'Блокиран' : 'Offline'}</span>
        </td>
        <td @click=${(e) => changeRoleHandler(e, id, ctx)}>
            <span class="${primaryRole == 'Потребител' ? 'active-role' : 'possible-role'}">Потребител</span> 
            <span class="${primaryRole == 'Модератор' ? 'active-role' : 'possible-role'}">Модератор</span>
            <span class="${primaryRole == 'Администратор' ? 'active-role' : 'possible-role'}">Администратор</span>
        </td>
    </tr>
`;

async function changeRoleHandler(e, userId, ctx) {
    const clickedSpan = e.target;
    
    if (clickedSpan.classList.contains('active-role')) {
        return;
    }

    const role = clickedSpan.textContent;

    await changeUserRole(userId, role);

    ctx.page.redirect(ctx.canonicalPath);
}