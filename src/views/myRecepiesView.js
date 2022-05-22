import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublications } from '../services/recipeService.js';
import { addUppercase } from '../utils/capitalizator.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { myRecepiesTemplate } from './templates/profileTemplates/myRecepiesTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';


const myRecepiesCollectionTemplate = (recepies) => html`
    ${myProfileTemplate()}
    ${myRecepiesTemplate(recepies, "Създадени рецепти")}
`;

export async function myRecepiesPage(ctx) {
    const data = await getMyPublications(sessionStorage.getItem('id'));

    addUppercase(data);

    const myRecepies = data.results.map(recipeTemplate);

    ctx.render(myRecepiesCollectionTemplate(myRecepies));
    
    trackActiveLink(ctx);
}