import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { USER_BLOCK_MESSAGE, USER_DELETE_MESSAGE } from '../../../constants/notificationMessages.js';
import { blockUser, remove, unblockUser } from '../../../services/userService.js';
import { showModal } from '../../../utils/modalDialogue.js';
import { reason, showReasonModalDialogue } from '../../../utils/reasoningModalDialogue.js';

const blockUserTemplate = (id, ctx) => html`
    <span @click=${() => blockUserHandler(id, ctx)} class="user-action-block">Блокирай</span> 
`;

const unblockUserTemplate = (id, ctx) => html`
    <span @click=${() => unblockUserHandler(id, ctx)} class="user-action-block">Отблокирай</span> 
`;

export const userRowTemplate = (ctx, { id, avatarUrl, username, primaryRole, blocked }) => html`
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
        <td>
            <span @click=${() => userEditHandler(id, ctx)} class="user-action-edit">Редактирай</span> 
            ${blocked ? unblockUserTemplate(id, ctx) : blockUserTemplate(id, ctx)}
            <span @click=${() => userDeleteHandler(id, ctx)} class="user-action-delete">Изтрий</span>
        </td>
    </tr>
`;

function userEditHandler(userId, ctx) {
    ctx.page.redirect(`/administrate/users/edit-${userId}`);
}

async function blockUserHandler(userId, ctx) {
    showModal(USER_BLOCK_MESSAGE, onSelect, 'admin');

    async function onSelect(choice) {
        if (choice) {
            showReasonModalDialogue(onInput)

            async function onInput() {
               await blockUser(userId, reason);
               ctx.page.redirect(`/administrate/users`);
            }
        }
    }   
}

async function unblockUserHandler(userId, ctx) {
    await unblockUser(userId);
    ctx.page.redirect('/administrate/users');
}

async function userDeleteHandler(userId, ctx) {
    showModal(USER_DELETE_MESSAGE, onSelect, 'admin');
    
    async function onSelect(choice) {
        if (choice) {
            await remove(userId);
            ctx.page.redirect('/administrate/users');
        }
    }
}