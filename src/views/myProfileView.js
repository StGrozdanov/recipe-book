import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublications } from '../services/recipeService.js';
import { noSuchRecipesTemplate } from './templates/noRecepiesFoundTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';

const myPublicationsTemplate = (recepies) => html`
<section class="user-profile">
    <button class="profile-navigation-button"><i class="fa-solid fa-comment-dots"></i> Известия</button>
    <button class="profile-navigation-button"><i class="fa-solid fa-utensils"></i> Моите рецепти</button>
    <button class="profile-navigation-button"><i class="fa-regular fa-star"></i> Любими рецепти</button>
    <button class="profile-navigation-button"><i class="fa-solid fa-user-pen"></i> Редактирай профила</button>
    <article class="user-profile-article">
        <header class="user-profile-header">
            <img class="user-profile-header-picture" src=${
                                                                sessionStorage.getItem('cover-photo').includes('undefined')
                                                                ? "../../static/images/user-profile-header.jpeg"
                                                                : sessionStorage.getItem('cover-photo')
                                                                    }
            >
        </header>
        <div class="user-profile-avatar-container">
            <img alt="user-profile" class="user-profile-avatar" src=${
                                                                sessionStorage.getItem('avatar').includes('undefined')
                                                                ? '../../static/images/Avatar.png'
                                                                : sessionStorage.getItem('avatar')
                                                                    }
            >
        </div>
        <main class="user-profile-article-info">
            <h3 class="username-header">${sessionStorage.getItem('username')}</h3>
            <p><i class="fa-solid fa-bowl-rice"></i> ${recepies.length} created</p>
            <p>
                <a href="mailto:${sessionStorage.getItem('email')}">
                    <i class="fa-solid fa-envelope"></i> ${sessionStorage.getItem('email')}
                </a>
            </p>
        </main>
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