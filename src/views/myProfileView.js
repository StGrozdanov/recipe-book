import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublicationsCount } from '../services/recipeService.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { userProfileTemplate } from './templates/profileTemplates/userProfileTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { getCurrentUser } from '../services/userService.js';
 
const myPublicationsTemplate = (recepiesCount) => html`
    <section class="my-profile-section">
    ${myProfileTemplate()}
    ${userProfileTemplate(sessionStorage, recepiesCount)}
    </section>
`;

export async function myProfilePage(ctx) {
    ctx.render(loaderTemplate());
    const myRecepies = await getMyPublicationsCount(getCurrentUser());

    const myPublications = myPublicationsTemplate(myRecepies.count);

    ctx.render(myPublications);

    trackActiveLink(ctx);
}