import { html, nothing, render } from '../../node_modules/lit-html/lit-html.js';
import { getSingleRecipe, removeRecipe } from '../services/recipeService.js';
import { removeFromFavourites, addToFavourites, isFavouriteRecipe } from '../services/favouritesService.js';
import { getCommentsForRecipe } from '../services/commentService.js'
import { loaderTemplate } from './templates/loadingTemplate.js';
import { showModal } from '../utils/modalDialogue.js';
import { notify } from '../utils/notification.js';
import { buttonToTop } from '../utils/backToTopButton.js';
import { commentsTemplate } from './templates/commentTemplate.js';
import { userIsAuthenticated, userIsAdministrator, userIsModerator, userIsResourceOwner } from '../services/authenticationService.js'
import { navigateDownHandler } from './landingView.js';
import { ADD_TO_FAVOURITES_SUCCESS, ARE_YOU_SURE_DELETE_RECIPE, DELETE_RECIPE_SUCCESS, REMOVE_FROM_FAVOURITES_SUCCESS } from '../constants/notificationMessages.js';

const ownerTemplate = (id, ctx) => html`
    <a class="button warning" href="/edit-${id}">Редактирай</a>
    <button @click=${() => deleteHandler(id, ctx)} class="button danger">Изтрий</button>
`;

const moderatorTemplate = (id) => html`
    <a class="button warning" href="/edit-${id}">Редактирай</a>
`;

const recipeFavouritesTemplate = (ctx, data, isFavourite) => html`
    <i 
    @click=${(e) => addToFavouritesHandler(e, ctx, data.recipeName)} 
    class=${isFavourite ? "fa-solid fa-star" : "fa-regular fa-star"}
    ></i>
`;

const detailsTemplate = (data, ctx, commentData, isFavourite) => html`
    <section id="recipe-details">
        <h1 class="recipe-name">
            Ястие: 
            ${data.recipeName} 
            ${
                userIsAuthenticated()
                    ? recipeFavouritesTemplate(ctx, data, isFavourite)
                    : nothing                 
            }
        </h1>
        <div class="recipe-details-div">
            <div class="recipe-img">
                <img alt="recipe-alt" src=${data.imageUrl}>
                <div id="comment-container">
                    ${
                        userIsResourceOwner(data.ownerId) || userIsAdministrator()
                            ? ownerTemplate(data.id, ctx) 
                            : !userIsResourceOwner(data.ownerId) && userIsModerator() 
                                ? moderatorTemplate(data.id) 
                                : nothing
                    }
                    ${commentsTemplate(commentData, ctx, data)}
                </div>
            </div>
            <div class="recipe-description">
                <ul>
                    <h2>Съставки:</h2>
                    ${
                        data.products.length > 1 
                            ? data.products.map(product => html`<li>${product}</li>`)
                            : data.products.map(product => {
                                return product.split(',').map(splitProduct => html`<li>${splitProduct}</li>`);
                            })
                    }
                </ul>
    
                <ul>
                    <h2>Начин на приготвяне:</h2>
                    ${
                        data.steps.length > 1 
                            ? data.steps.map(step => html`<li>${step}</li>`)
                            : data.steps.map(step => {
                                return step.split(',').map(splitStep => html`<li>${splitStep}</li>`);
                            })
                    }
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
    let isFavourite = userIsAuthenticated() ? isFavouriteRecipe(ctx.params.id) : null;

    const[recipeData, favouriteRecipeData] = await Promise.all([data, isFavourite]);

    ctx.render(detailsTemplate(recipeData, ctx, null, favouriteRecipeData));

    if (sessionStorage.getItem('redirect') !== null) {
        const previousComment = sessionStorage.getItem('comment');
        refreshCommentSectionRedirect(ctx, previousComment, data);
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
    showModal(ARE_YOU_SURE_DELETE_RECIPE, onSelect);

    async function onSelect(choice) {
        if (choice) {
            await removeRecipe(id);
            ctx.page.redirect('/catalogue');
            notify(DELETE_RECIPE_SUCCESS);
        }
    }
}

async function addToFavouritesHandler(e, ctx, recipeName) {
    const recipeIsInUserFavorites = Array.from(e.target.classList).includes('fa-solid') 
    
    if (recipeIsInUserFavorites) {
        e.target.classList.remove('fa-solid');
        e.target.classList.add('fa-regular');
        await removeFromFavourites(ctx.params.id);
        notify(REMOVE_FROM_FAVOURITES_SUCCESS(recipeName));
    } else {
        e.target.classList.add('fa-solid');
        e.target.classList.remove('fa-regular');
        await addToFavourites(ctx.params.id);
        notify(ADD_TO_FAVOURITES_SUCCESS(recipeName));
    }
}

async function refreshCommentSectionRedirect(ctx, comment, recipeData) {
    const refreshedCommentData = await getCommentsForRecipe(ctx.params.id);

    const commentContainer = document.getElementById('comment-container');

    const oldComment = document.getElementById('comments-container');
    oldComment.textContent = '';

    render(commentsTemplate(refreshedCommentData, ctx, recipeData), commentContainer);

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