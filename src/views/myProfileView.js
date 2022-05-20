import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublications } from '../services/recipeService.js';
import { noSuchRecipesTemplate } from './templates/noRecepiesFoundTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';

const myPublicationsTemplate = (recepies) => html`
<section class="user-profile">
    <article class="user-profile-article">
        <div class="user-profile-avatar-container">
            <img alt="user-profile" class="user-profile-avatar" src=${
                                                                sessionStorage.getItem('avatar').includes('undefined')
                                                                ? '../../static/images/Avatar.png'
                                                                : sessionStorage.getItem('avatar')
                                                                    }
            >
        </div>
        <div class="user-profile-article-info">
            <p>Username: ${sessionStorage.getItem('username')}</p>
            <p>Email: ${sessionStorage.getItem('email')}</p>
            <p>Брой Добавени Рецепти: ${recepies.length}</p>
        </div>
    </article>
</section>
<section id="cards-section">
    <div id="cards">
        <h1 class="user-recepies-heading">Моите Рецепти</h1>
        <div id="cards-content">
            <ul class="recipe-card-list">
                ${recepies.length > 0 ? recepies : noSuchRecipesTemplate()}
            </ul>
        </div>
    </div>
</section>
`;

export async function myProfilePage(ctx) {
    const data = await getMyPublications(sessionStorage.getItem('id'));

    const recipes = data.results.map(recipeTemplate);

    const myRecepies = myPublicationsTemplate(recipes);

    ctx.render(myRecepies);
}