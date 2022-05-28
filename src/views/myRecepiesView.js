import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublications } from '../services/recipeService.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { myRecepiesTemplate } from './templates/profileTemplates/myRecepiesTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { getCurrentUser } from '../services/userService.js';


export const myRecepiesCollectionTemplate = (recepies, ctx) => html`
<section class="my-profile-section">
    ${myProfileTemplate()}
    ${myRecepiesTemplate(recepies, "Създадени рецепти", ctx)}
</section>
`;

export async function myRecepiesPage(ctx) {
    ctx.render(loaderTemplate());
    const data = await getMyPublications(getCurrentUser());

    const myRecepies = data.results.map(recipeTemplate);

    ctx.render(myRecepiesCollectionTemplate(myRecepies, ctx));

    trackActiveLink(ctx);
}