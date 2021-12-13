import { html } from '../../node_modules/lit-html/lit-html.js';
import { commentRecipe, getCommentsForRecipe, getSingle, removeRecipe } from '../io/requests.js';
import { showModal } from './common/modalDialogue.js';
import { notify } from './common/notificationTemplate.js';

const ownerTemplate = (id, ctx) => html`
    <a class="button warning" href="/edit/${id}">Редактирай</a>
    <button @click=${() => deleteHandler(id, ctx)} class="button danger">Изтрий</button>
`;

const commentsTemplate = (data, ctx) => html`
<div id="comments-container">
    <button @click=${(e) => toggleComments(e)} style="margin-right: 60px;" class="button warning">Покажи
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
    <section id="meme-details">
        <h1>Ястие: ${data.name}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${data.img}>
                ${commentsTemplate(commentData, ctx)}
            </div>
            <div class="meme-description">
                <h2>Съставки:</h2>
                <ul>
                    ${data.products.map(product => html`<li>${product}</li>`)}
                </ul>
    
                <h2>Начин на приготвяне:</h2>
                <ul>
                    ${data.steps.map(step => html`<li>${step}</li>`)}
                </ul>
    
                ${sessionStorage.getItem('id') === data.owner.objectId ? ownerTemplate(data.objectId, ctx) : ''}
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const data = await getSingle(ctx.params.id);
    const commentData = await getCommentsForRecipe(ctx.params.id);
    ctx.render(detailsTemplate(data, ctx, commentData.results));
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

    if (comments.style.display == 'none' && addCommentForm.style.display == 'none') {
        comments.style.display = 'block';
        addCommentForm.style.display = 'block';
        e.target.textContent = 'Скрий коментарите';
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

    if (response.code === 209) {
        notify('Трябва да сте регистриран потребител в сайта, за да можете да коментирате.');
        notify('Ако не сте регистриран потребител можете да се регистрирате тук', { ctx: ctx, location: 'register' });
        return notify('Ако вече сте регистриран потребител можете да влезнете в сайта от тук', { ctx: ctx, location: 'login' });
    }

    commentField.value = '';
    ctx.page.redirect(`/details/${ctx.params.id}`);
}