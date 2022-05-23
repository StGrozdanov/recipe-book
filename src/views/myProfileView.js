import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublicationsCount } from '../services/recipeService.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { userProfileTemplate } from './templates/profileTemplates/userProfileTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
 
const myPublicationsTemplate = (recepiesCount) => html`
    ${myProfileTemplate()}
    ${userProfileTemplate(sessionStorage, recepiesCount)}
`;

export async function myProfilePage(ctx) {
    ctx.render(loaderTemplate());
    const myRecepies = await getMyPublicationsCount(sessionStorage.getItem('id'));

    const myPublications = myPublicationsTemplate(myRecepies.count);

    ctx.render(myPublications);

    trackActiveLink(ctx);
}