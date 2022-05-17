import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { commentRecipe, getCommentsForRecipe } from '../services/commentService.js';
import { getSingleRecipe, removeRecipe } from '../services/recipeService.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { showModal } from '../utils/modalDialogue.js';
import { notify } from '../utils/notification.js';
import { buttonToTop } from '../utils/backToTopButton.js';

const ownerTemplate = (id, ctx) => html`
    <a class="button warning" href="/edit-${id}">Редактирай</a>
    <button @click=${() => deleteHandler(id, ctx)} class="button danger">Изтрий</button>
`;

const commentsTemplate = (data, ctx) => html`
<div id="comments-container">
    <button @click=${(e) => toggleComments(e)} class="button warning">Покажи
        коментарите</button>
    <div style="display: none;" class="details-comments">
        <h2>Коментари:</h2>
        <ul>
            ${data.length > 0 ? data.map(comment => html`
            <li class="comment">
                <p><a href="#">${comment.owner.username}</a> ${new Date(comment.createdAt).toLocaleString()}
                </p>
                <p>${comment.content}</p>
            </li>`) : html`<p class="no-comments">Все още няма коментари за тази рецепта</p>`}
        </ul>

    </div>
    <article style="display: none;" class="create-comment">
        <label>Добави коментар:</label>
        <form id="add-comment-form" class="form">
            <textarea id="comment-text" name="comment" placeholder="Comment......"> </textarea>
            <input @click=${(e) => addCommentHandler(e, ctx)} class="comment-btn" type="submit" value="Коментирай">
        </form>
    </article>
</div>
`;

const detailsTemplate = (data, ctx, commentData) => html`
    <section id="recipe-details">
        <h1>Ястие: ${data.name}</h1>
        <div class="recipe-details-div">
            <div class="recipe-img">
                <img alt="recipe-alt" src=${data.img}>
                <div id="comment-container">
                    ${sessionStorage.getItem('id') === data.owner.objectId ? ownerTemplate(data.objectId, ctx) : ''}
                    ${commentsTemplate(commentData, ctx)}
                </div>
            </div>
            <div class="recipe-description">
                <ul>
                    <h2>Съставки:</h2>
                    ${data.products.map(product => html`<li>${product}</li>`)}
                </ul>
    
                <ul>
                    <h2>Начин на приготвяне:</h2>
                    ${data.steps.map(step => html`<li>${step}</li>`)}
                </ul>
            </div>
        </div>
        <a class='button-to-top'>
            <i class="fa-solid fa-angle-up"></i>
        </a>
    </section>
`;

export async function detailsPage(ctx) {
    ctx.render(loaderTemplate());
    const data = await getSingleRecipe(ctx.params.id);

    capitalize(data);

    const recipeComments = await getCommentsForRecipe(ctx.params.id);

    ctx.render(detailsTemplate(data, ctx, recipeComments.results));

    if (sessionStorage.getItem('redirect') !== null) {
        const previousComment = sessionStorage.getItem('comment');
        refreshCommentSectionRedirect(ctx, previousComment);
        sessionStorage.removeItem('redirect');
        sessionStorage.removeItem('comment');
    }    
    buttonToTop();
}

async function deleteHandler(id, ctx) {
    showModal('Сигурни ли сте, че искате да изтриете тази рецепта?', onSelect);

    async function onSelect(choice) {
        if (choice) {
            await removeRecipe(id);
            ctx.page.redirect('/');
            notify('Успешно изтрихте рецептата!');
        }
    }
}

function toggleComments(e) {
    const comments = e.target.parentNode.querySelector('.details-comments');
    const addCommentForm = e.target.parentNode.querySelector('.create-comment');
    const showCommentsButton = document.querySelector('#comments-container button');

    if (comments.style.display == 'none' && addCommentForm.style.display == 'none') {
        comments.style.display = 'flex';
        addCommentForm.style.display = 'flex';
        e.target.textContent = 'Скрий коментарите';
        showCommentsButton.style.marginLeft = '0px';
    } else {
        comments.style.display = 'none';
        addCommentForm.style.display = 'none';
        e.target.textContent = 'Покажи коментарите';
        showCommentsButton.style.marginLeft = '20px';
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
}

function capitalize(data) {
    data.name = data.name[0].toUpperCase() + data.name.substring(1, data.name.length);
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
}

async function refreshCommentSectionRedirect(ctx, comment) {
    const refreshedCommentData = await getCommentsForRecipe(ctx.params.id);

    const commentContainer = document.getElementById('comment-container');

    const oldComment = document.getElementById('comments-container');
    oldComment.textContent = '';

    render(commentsTemplate(refreshedCommentData.results, ctx), commentContainer);

    const commentTextField = document.getElementById('comment-text');
    commentTextField.textContent = comment;

    const comments = document.querySelector('.details-comments');
    comments.style.display = 'block';

    const addCommentForm = document.querySelector('.create-comment');
    addCommentForm.style.display = 'block';

    const button = document.querySelector('#comments-container button');
    button.textContent = 'Скрий коментарите';
}