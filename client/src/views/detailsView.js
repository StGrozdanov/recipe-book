import { html, nothing, render } from '../../node_modules/lit-html/lit-html.js';
import { getSingleRecipe, removeRecipe } from '../services/recipeService.js';
import { removeFromFavourites, addToFavourites, isFavouriteRecipe } from '../services/favouritesService.js';
import { getCommentsForRecipe } from '../services/commentService.js'
import { loaderTemplate } from './templates/loadingTemplate.js';
import { showModal } from '../utils/modalDialogue.js';
import { notify } from '../utils/notification.js';
import { buttonToTop } from '../utils/backToTopButton.js';
import { commentsTemplate } from './templates/commentTemplate.js';
import { getCurrentUser, userIsAuthenticated } from '../services/userService.js';
import { navigateDownHandler } from './landingView.js';

const ownerTemplate = (id, ctx) => html`
    <a class="button warning" href="/edit-${id}">Редактирай</a>
    <button @click=${() => deleteHandler(id, ctx)} class="button danger">Изтрий</button>
`;

const recipeFavouritesTemplate = (ctx, data, isFavourite) => html`
    <i 
    @click=${(e) => addToFavouritesHandler(e, ctx, data.name)} 
    class=${isFavourite ? "fa-solid fa-star" : "fa-regular fa-star"}
    ></i>
`;

const detailsTemplate = (data, ctx, commentData, isFavourite) => html`
    <section id="recipe-details">
        <h1 class="recipe-name">
            Ястие: 
            ${data.name} 
            ${
                userIsAuthenticated()
                ? recipeFavouritesTemplate(ctx, data, isFavourite)
                : nothing                 
            }
        </h1>
        <div class="recipe-details-div">
            <div class="recipe-img">
                <img alt="recipe-alt" src=${data.img}>
                <div id="comment-container">
                    ${getCurrentUser() === data.owner.objectId ? ownerTemplate(data.objectId, ctx) : ''}
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
    
    const data = getSingleRecipe(ctx.params.id);
    const isFavourite = isFavouriteRecipe(getCurrentUser(), ctx.params.id);

    const[recipeData, favouriteRecipeData] = await Promise.all([data, isFavourite]);

    ctx.render(detailsTemplate(recipeData, ctx, null, favouriteRecipeData));

    if (sessionStorage.getItem('redirect') !== null) {
        const previousComment = sessionStorage.getItem('comment');
        refreshCommentSectionRedirect(ctx, previousComment);
        sessionStorage.removeItem('redirect');
        sessionStorage.removeItem('comment');
    }   
    
    if (sessionStorage.getItem('landingRedirect')) {
        sessionStorage.removeItem('landingRedirect');
        navigateDownHandler();
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

async function addToFavouritesHandler(e, ctx, recipeName) {
    const recipeIsInUserFavorites = Array.from(e.target.classList).includes('fa-solid') 
    
    if (recipeIsInUserFavorites) {
        e.target.classList.remove('fa-solid');
        e.target.classList.add('fa-regular');
        await removeFromFavourites(ctx.params.id);
        notify(`Успешно премахнахте ${recipeName} от любимите ви рецепти.`);
    } else {
        e.target.classList.add('fa-solid');
        e.target.classList.remove('fa-regular');
        await addToFavourites(ctx.params.id);
        notify(`Успешно добавихте ${recipeName} към любимите ви рецепти.`);
    }
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

    navigateDownHandler();
}