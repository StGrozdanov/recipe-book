import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublications } from '../services/recipeService.js';
import { getUser } from '../services/userService.js';
import { recipeTemplate } from './templates/recipeTemplate.js';

const userDoesNotHaveAnyRecepiesTemplate = () => html`
    <p class="no-recipes">Потребителят няма добавени рецепти.</p>
`;

const userProfileTemplate = (user, recepies) => html`
<section class="user-profile">
    <article class="user-profile-article">
        <div class="user-profile-avatar-container">
            <img alt="user-profile" class="user-profile-avatar" src=${
                                                                user.avatar
                                                                ? user.avatar
                                                                : '../../static/images/Avatar.png'
                                                                    }
            >
        </div>
        <div class="user-profile-article-info">
            <p>Username: ${user.username}</p>
            <p>Брой Добавени Рецепти: ${recepies.length}</p>
        </div>
    </article>
</section>
<section id="cards-section">
    <div id="cards">
        <h1 class="user-recepies-heading">Рецепти на потребителя</h1>
        <div id="cards-content">
            <ul class="recipe-card-list">
                ${recepies.length > 0 ? recepies : userDoesNotHaveAnyRecepiesTemplate()}
            </ul>
        </div>
    </div>
</section>
`;

export async function userProfilePage(ctx) {
    const user = await getUser(ctx.params.id);

    const data = await getMyPublications(ctx.params.id);
    const recipes = data.results.map(recipeTemplate);

    const myRecepies = userProfileTemplate(user, recipes);

    ctx.render(myRecepies);
}