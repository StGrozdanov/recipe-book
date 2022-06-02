import { html, nothing, render } from '../../../node_modules/lit-html/lit-html.js';
import { commentRecipe, editComment, getCommentsForRecipe, removeComment } from '../../services/commentService.js';
import { showModal } from '../../utils/modalDialogue.js';
import { notify } from '../../utils/notification.js';
import { getCurrentUser } from '../../services/userService.js'
import { socket } from '../../services/socketioService.js';
import { getSingleRecipe } from '../../services/recipeService.js';

const ownerCommentTemplate = (comment) => html`
    <i 
    @click=${deleteCommentHandler} 
    class="fa-solid fa-trash-can" 
    style="float: right; font-size: 100%; cursor: pointer;"
    ></i>
    <i 
    @click=${toggleEditCommentHandler} 
    class="fa-solid fa-pen-to-square" 
    style="float: right; margin-right: 5px; font-size: 100%; cursor: pointer;"
    ></i>
    <i 
    @click=${cancelEditCommentHandler} 
    class="fa-solid fa-xmark" 
    style="float: right; font-size: 110%; display: none; color: darkred; cursor: pointer;"
    ></i>
    <form @submit=${editCommentHandler}>
        <button type="submit" style="margin: 0; border: none; background-color: inherit; float: right; font-size: 85%; padding: 0;">
        <i 
        class="fa-solid fa-check" 
        style="float: right; font-size: 110%; margin-right: 8px; display: none; margin-bottom: 5px; color: #62ff00; cursor: pointer;"
        ></i>
        </button>
        <p class="comment-content">${comment.content}</p>
        <input 
        style="display: none;" 
        type="text" 
        name="edit-comment" 
        value=${comment.content} 
        class="edit-comment" 
        />
    </form>
`;

const unauthorizedCommentTemplate = (comment) => html`
    <p class="comment-content">${comment.content}</p>
`; 

const commentLoadingTemplate = () => html`
    <div id="loading-comments" class="comment-loading-container">
        <img src="../../../static/images/loading-spinner.gif" alt="Loading..." class="comment-loading"/>
    </div>
`;

export const commentsTemplate = (data, ctx) => html`
<div id="comments-container">
    <button @click=${(e) => toggleComments(e, ctx)} class="button warning">Покажи коментарите</button>
    <div style="display: none;" class="details-comments">
        <h2>Коментари:</h2>
        <ul>
            ${
                data !== null && data.length > 0
                ? data.map(comment => html`
                    <li id=${comment.objectId} class="comment">
                        <p>
                            <a 
                            @click=${() => ctx.page.redirect(`/user-${comment.owner.objectId}`)} 
                            href='javascript: void[0]'
                            >
                                ${comment.owner.username}
                            </a> 
                            ${new Date(comment.createdAt).toLocaleString()}
                        </p>
                        ${ 
                            getCurrentUser() === comment.owner.objectId 
                            ? ownerCommentTemplate(comment)
                            : unauthorizedCommentTemplate(comment)
                        }
                    </li>`) 
                : data !== null ? html`<p class="no-comments">Все още няма коментари за тази рецепта</p>` : nothing
            }
        </ul>
    </div>
    <article style="display: none;" class="create-comment">
        <label>Добави коментар:</label>
        <form id="add-comment-form" class="form">
            <textarea id="comment-text" name="comment" placeholder="Коментар......"> </textarea>
            <input @click=${(e) => addCommentHandler(e, ctx)} class="comment-btn" type="submit" value="Коментирай">
        </form>
    </article>
</div>
`;

async function toggleComments(e, ctx) {
    const comments = e.target.parentNode.querySelector('.details-comments');
    const addCommentForm = e.target.parentNode.querySelector('.create-comment');

    if (comments.style.display == 'none' && addCommentForm.style.display == 'none') {
        comments.style.display = 'flex';
        addCommentForm.style.display = 'flex';
        e.target.textContent = 'Скрий коментарите';
        
        render(commentLoadingTemplate(), comments);
        refreshCommentSection(ctx)
    } else {
        comments.style.display = 'none';
        addCommentForm.style.display = 'none';
        e.target.textContent = 'Покажи коментарите';
    }
}

async function addCommentHandler(e, ctx) {
    e.preventDefault();

    const commentField = document.querySelector('#comment-text');
    const comment = commentField.value;

    if (comment.trim() == '') {
        return notify('Коментарът ви не трябва да е празен.');
    }

    const response = await commentRecipe(ctx.params.id, { content: comment });

    if (response.code == 209) {
        notify('Трябва да сте регистриран потребител в сайта, за да можете да коментирате.');
        notify('Ако не сте регистриран потребител можете да се регистрирате тук', {
            ctx: ctx,
            location: 'register',
            comment: comment
        });

        return notify('Ако вече сте регистриран потребител можете да влезнете в сайта от тук',
            {
                ctx: ctx,
                location: 'login',
                comment: comment
            });
    }
    commentField.value = '';
    refreshCommentSection(ctx);

    const targetRecipe = await getSingleRecipe(ctx.params.id);
    const recipeOwner = targetRecipe.owner.objectId;

    socket.emit("sendNewMessageNotification", {
        senderName: sessionStorage.getItem('username'),
        senderAvatar: sessionStorage.getItem('avatar'),
        senderId: sessionStorage.getItem('id'),
        receiverId: recipeOwner,
    });
}

async function refreshCommentSection(ctx) {
    const refreshedCommentData = await getCommentsForRecipe(ctx.params.id);

    const commentContainer = document.getElementById('comment-container');

    const oldComment = document.getElementById('comments-container');
    oldComment.textContent = '';

    render(commentsTemplate(refreshedCommentData.results, ctx), commentContainer);

    const comments = document.querySelector('.details-comments');
    comments.style.display = 'block';

    const addCommentForm = document.querySelector('.create-comment');
    addCommentForm.style.display = 'block';

    const button = document.querySelector('#comments-container button');
    button.textContent = 'Скрий коментарите';

    let commentLoader = document.getElementById('loading-comments');

    commentLoader ? commentLoader.textContent = '' : nothing;
}

async function deleteCommentHandler(e) {
    showModal('Сигурни ли сте, че искате да изтриете този коментар?', onSelect);
    const targetComment = e.currentTarget.parentNode;

    async function onSelect(choice) {
        if (choice) {
            await removeComment(targetComment.id);
            targetComment.remove();
            notify('Успешно изтрихте коментара!');
        }
    }
}

function toggleEditCommentHandler(e) {
    const targetComment = e.currentTarget.parentNode;
    let targetCommentContent = targetComment.querySelector('.comment-content');
    targetCommentContent.style.display = 'none';

    const editCommentInput = targetComment.querySelector('.edit-comment');
    editCommentInput.style.display = 'block';

    const editIcon = targetComment.querySelector('.fa-pen-to-square');
    const deleteIcon = targetComment.querySelector('.fa-trash-can');

    editIcon.style.display = 'none';
    deleteIcon.style.display = 'none';

    const confirmEditIcon = targetComment.querySelector('.fa-check');
    const cancelEditIcon = targetComment.querySelector('.fa-xmark');

    confirmEditIcon.style.display = 'block';
    cancelEditIcon.style.display = 'block';
}

function cancelEditCommentHandler(e) {
    const targetComment = e.currentTarget.parentNode;
    let targetCommentContent = targetComment.querySelector('.comment-content');
    targetCommentContent.style.display = 'block';

    const editCommentInput = targetComment.querySelector('.edit-comment');
    editCommentInput.style.display = 'none';

    const editIcon = targetComment.querySelector('.fa-pen-to-square');
    const deleteIcon = targetComment.querySelector('.fa-trash-can');

    editIcon.style.display = 'block';
    deleteIcon.style.display = 'block';

    const confirmEditIcon = targetComment.querySelector('.fa-check');
    const cancelEditIcon = targetComment.querySelector('.fa-xmark');

    confirmEditIcon.style.display = 'none';
    cancelEditIcon.style.display = 'none';
}

async function editCommentHandler(e) {
    e.preventDefault();

    const targetComment = e.currentTarget.parentNode;

    let targetCommentContent = targetComment.querySelector('.comment-content');

    const editCommentInput = targetComment.querySelector('.edit-comment');

    const editIcon = targetComment.querySelector('.fa-pen-to-square');
    const deleteIcon = targetComment.querySelector('.fa-trash-can');

    const confirmEditIcon = targetComment.querySelector('.fa-check');
    const cancelEditIcon = targetComment.querySelector('.fa-xmark');

    const formData = new FormData(e.target);
    const editedCommentValue = formData.get('edit-comment');

    if (editedCommentValue.trim() !== '') {
        await editComment(editedCommentValue, targetComment.id);
        
        targetCommentContent.textContent = editedCommentValue;
        targetCommentContent.style.display = 'block';

        editCommentInput.style.display = 'none';
        editIcon.style.display = 'block';
        deleteIcon.style.display = 'block';
        confirmEditIcon.style.display = 'none';
        cancelEditIcon.style.display = 'none';

        notify('Успешно редактирахте коментара си.');
    } else {
        return notify('Коментарът ви не трябва да бъде празен!');
    }
}