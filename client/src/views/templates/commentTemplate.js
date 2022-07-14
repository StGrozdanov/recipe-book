import { html, nothing, render } from '../../../node_modules/lit-html/lit-html.js';
import { commentRecipe, editComment, getCommentsForRecipe, removeComment } from '../../services/commentService.js';
import { showModal } from '../../utils/modalDialogue.js';
import { notify } from '../../utils/notification.js';
import { getCurrentUser, getCurrentUserAvatar, getCurrentUserUsername } from '../../services/authenticationService.js'
import { socket } from '../../services/socketioService.js';
import { createNotification } from '../../services/notificationService.js';
import { createMobilePushNotification } from '../../services/mobilePushNotificationService.js';
import { AUTHENTICATE_FIRST } from '../../constants/errorMessages.js';
import { ARE_YOU_SURE_DELETE_COMMENT, DELETE_COMMENT_SUCCESS, EDIT_COMMENT_SUCCESS, IF_YOU_ARE_NOT_REGISTERED, IF_YOU_ARE_REGISTERED, YOUR_COMMENT_SHOULD_NOT_BE_EMPTY, YOU_HAVE_TO_BE_REGISTERED } from '../../constants/notificationMessages.js';
import { NEW_COMMENT, POSTED_NEW_COMMENT } from '../../constants/userActions.js';

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

export const commentLoadingTemplate = () => html`
    <div id="loading-comments" class="comment-loading-container">
        <img src="../../../static/images/loading-spinner.gif" alt="Loading..." class="comment-loading"/>
    </div>
`;

export const commentsTemplate = (commentData, ctx, recipeData) => html`
<div id="comments-container">
    <button 
        @click=${(e) => toggleComments(e, ctx, recipeData)} 
        class="button warning"
    >
        Покажи коментарите
    </button>
    <div style="display: none;" class="details-comments">
        <h2>Коментари:</h2>
        <ul>
            ${
                commentData !== null && commentData.length > 0
                ? commentData.map(comment => html`
                    <li id=${comment.id} class="comment">
                        <p>
                            <a 
                            @click=${() => ctx.page.redirect(`/user-${comment.owner.id}`)} 
                            href='javascript: void[0]'
                            >
                                ${comment.owner.username}
                            </a> 
                            ${comment.createdAt.replace('T', ', ').substring(0, 17)}
                        </p>
                        ${ 
                            getCurrentUser() === comment.owner.id 
                            ? ownerCommentTemplate(comment)
                            : unauthorizedCommentTemplate(comment)
                        }
                    </li>`) 
                : commentData !== null ? html`<p class="no-comments">Все още няма коментари за тази рецепта</p>` : nothing
            }
        </ul>
    </div>
    <article style="display: none;" class="create-comment">
        <label>Добави коментар:</label>
        <form id="add-comment-form" class="form">
            <textarea id="comment-text" name="comment" placeholder="Коментар......"> </textarea>
            <input 
                @click=${(e) => addCommentHandler(e, ctx, recipeData)} 
                class="comment-btn" 
                type="submit" 
                value="Коментирай"
            >
        </form>
    </article>
</div>
`;

async function toggleComments(e, ctx, recipeData) {
    const comments = e.target.parentNode.querySelector('.details-comments');
    const addCommentForm = e.target.parentNode.querySelector('.create-comment');

    if (comments.style.display == 'none' && addCommentForm.style.display == 'none') {
        showComments(comments, addCommentForm, e, ctx, recipeData);
    } else {
        hideComments(comments, addCommentForm, e);
    }
}

async function addCommentHandler(e, ctx, recipeData) {
    e.preventDefault();

    const commentField = document.querySelector('#comment-text');
    const commentContent = commentField.value;

    if (commentContent.trim() == '') {
        return notify(YOUR_COMMENT_SHOULD_NOT_BE_EMPTY);
    }

    const createdComment = {
        content: commentContent,
        ownerName: getCurrentUserUsername(),
        ownerAvatar: getCurrentUserAvatar(),
        recipeName: recipeData.recipeName
    }

    const response = await commentRecipe(recipeData.id, createdComment);

    if (response === AUTHENTICATE_FIRST) {
        notify(YOU_HAVE_TO_BE_REGISTERED);
        notify(IF_YOU_ARE_NOT_REGISTERED, {
            ctx: ctx,
            location: 'register',
            comment: commentContent
        });

        return notify(IF_YOU_ARE_REGISTERED,
            {
                ctx: ctx,
                location: 'login',
                comment: commentContent
            });
    }

    commentField.value = '';
    await refreshCommentSection(ctx, recipeData);
    sendNewCommentNotifications(recipeData);
}

async function sendNewCommentNotifications(recipeData) {
    const notificationData = {
        senderUsername: getCurrentUserUsername(),
        senderAvatar: getCurrentUserAvatar(),
        senderId: getCurrentUser(),
        sendedOn: new Date(Date.now()).toLocaleString(),
        locationId: recipeData.id,
        locationName: recipeData.recipeName,
        action: POSTED_NEW_COMMENT,
    }

    const pushNotification = createMobilePushNotification(NEW_COMMENT, `${notificationData.senderUsername} ${POSTED_NEW_COMMENT}`);

    const regularNotification = createNotification(notificationData);

    const [mobileNotification, userNotification] = await Promise.all([pushNotification, regularNotification]);

    const notifications = createSocketNotifications(userNotification, recipeData);

    socket.emit("sendNewMessageNotification", notifications);
}

function createSocketNotifications(createdNotification, recipeData) {
    const notifications = [];

    createdNotification.receiverIds.forEach((receiverId, index) => {
        let notificationData = {
            senderUsername: getCurrentUserUsername(),
            senderAvatar: getCurrentUserAvatar(),
            senderId: getCurrentUser(),
            sendedOn: new Date(Date.now()).toLocaleString(),
            locationId: recipeData.id,
            locationName: recipeData.recipeName,
            action: POSTED_NEW_COMMENT,
            receiverId: receiverId,
            id: createdNotification.notificationIds[index]
        }
        notifications.push(notificationData);
    });

    return notifications;
}

async function refreshCommentSection(ctx, recipeData) {
    const refreshedCommentData = await getCommentsForRecipe(ctx.params.id);

    const commentContainer = document.getElementById('comment-container');

    const oldComment = document.getElementById('comments-container');
    oldComment.textContent = '';

    render(commentsTemplate(refreshedCommentData, ctx, recipeData), commentContainer);

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
    showModal(ARE_YOU_SURE_DELETE_COMMENT, onSelect);
    const targetComment = e.currentTarget.parentNode;

    async function onSelect(choice) {
        if (choice) {
            await removeComment(targetComment.id);
            targetComment.remove();
            notify(DELETE_COMMENT_SUCCESS);
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

        notify(EDIT_COMMENT_SUCCESS);
    } else {
        return notify(YOUR_COMMENT_SHOULD_NOT_BE_EMPTY);
    }
}

async function showComments(comments, addCommentForm, e, ctx, recipeData) {
    comments.style.display = 'flex';
    addCommentForm.style.display = 'flex';
    e.target.textContent = 'Скрий коментарите';
    
    render(commentLoadingTemplate(), comments);
    await refreshCommentSection(ctx, recipeData)
}

function hideComments(comments, addCommentForm, e) {
    comments.style.display = 'none';
    addCommentForm.style.display = 'none';
    e.target.textContent = 'Покажи коментарите';
}