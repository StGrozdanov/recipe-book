import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublications } from '../services/recipeService.js';
import { getUser } from '../services/userService.js';
import { userProfileTemplate } from './templates/profileTemplates/userProfileTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';
import { addUppercase } from '../utils/capitalizator.js';
import { loaderTemplate } from './templates/loadingTemplate.js';

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
        ${userProfileTemplate(user, recipes.length)}
    </section>
</section>
`;

export async function userProfilePage(ctx) {
    ctx.render(loaderTemplate());
    const user = await getUser(ctx.params.id);
    const data = await getMyPublications(ctx.params.id);

    addUppercase(data);

    const recipes = data.results.map(recipeTemplate);

    const userData = browseUserProfileTemplate(user, recipes);

    ctx.render(userData);
}