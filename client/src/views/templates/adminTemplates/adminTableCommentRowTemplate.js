import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { ARE_YOU_SURE_DELETE_COMMENT } from '../../../constants/notificationMessages.js';
import { removeComment } from '../../../services/commentService.js';
import { showModal } from '../../../utils/modalDialogue.js';
import { navigateDownHandler, resolvePageStyleArchitecture } from '../../landingView.js';

export const commentRowTemplate = ({ id, content, ownerId, ownerAvatarUrl, targetRecipeId }, ctx) => html`
    <tr>
        <td>${id}</td>
        <td>
        <div class="user-table-profile-avatar-container">
                <img 
                    alt="recipe image" 
                    class="user-profile-avatar" 
                    src=${
                        !ownerAvatarUrl || ownerAvatarUrl === 'null'
                            ? "../../static/images/Avatar.png"
                            : ownerAvatarUrl
                    } 
                    onerror="this.onerror=null;this.src='../../static/images/Avatar.png';" 
                />
            </div>
            <div style="margin-left: 18%">
                ${content}
            </div>
        </td>
        <td><i @click=${() => redirectToOwnerHandler(ownerId, ctx)} class="fa-solid fa-share-from-square" style="cursor: pointer;"></i></td>
        <td><i @click=${() => redirectToRecipeHandler(targetRecipeId, ctx)} class="fa-solid fa-location-arrow" style="cursor: pointer;"></i></td>
        <td><span @click=${() => deleteHandler(id, ctx)} class="user-action-delete">Изтрий</span></td>
    </tr>
`;

function redirectToOwnerHandler(ownerId, ctx) {
    ctx.page.redirect(`/administrate/users/edit-${ownerId}`);
}

function redirectToRecipeHandler(recipeId, ctx) {
    sessionStorage.setItem('redirect', '');
    sessionStorage.setItem('comment', '')
    ctx.page.redirect(`/details-${recipeId}`);
    resolvePageStyleArchitecture();
    document.querySelector('footer').style.display = 'flex';
}

async function deleteHandler(commentId, ctx) {
    showModal(ARE_YOU_SURE_DELETE_COMMENT, onSelect, 'admin');

    async function onSelect(choice) {
        if (choice) {
            await removeComment(commentId);
            ctx.page.redirect(ctx.canonicalPath);
        }
    }
}