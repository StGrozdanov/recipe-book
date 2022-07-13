import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublications } from '../services/recipeService.js';
import { getUser } from '../services/userService.js';
import { userProfileTemplate } from './templates/profileTemplates/userProfileTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { navigateDownHandler } from './landingView.js';

const browseUserProfileTemplate = (user, recipes) => html`
<section class="user-section">
    <section id="cards-section">
        <div id="cards">
            <div id="cards-content">
                <ul class="recipe-card-list">
                    ${recipes.length > 0 ? recipes : html`<h4>Потребителят не е добавил рецепти.</h4>`}
                </ul>
            </div>
        </div>
    </section>
    <section class="user-section-profile">
        ${userProfileTemplate(user, user.recipesCount)}
    </section>
</section>
`;

export async function userProfilePage(ctx) {
    ctx.render(loaderTemplate());
    const user = getUser(ctx.params.id);
    const data = getMyPublications(ctx.params.id);

    const[currentUser, publicationsData] = await Promise.all([user, data]);

    const recipes = publicationsData.map(recipeTemplate);

    const userData = browseUserProfileTemplate(currentUser, recipes);

    ctx.render(userData);

    if (sessionStorage.getItem('landingRedirect')) {
        sessionStorage.removeItem('landingRedirect');
        navigateDownHandler();
    }
}