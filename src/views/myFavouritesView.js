import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyFavouriteRecepies } from '../services/favouritesService.js';
import { addUppercase } from '../utils/capitalizator.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { myRecepiesTemplate } from './templates/profileTemplates/myRecepiesTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';


export const myRecepiesCollectionTemplate = (recepies, ctx) => html`
    ${myProfileTemplate()}
    ${myRecepiesTemplate(recepies, "Любими рецепти", ctx)}
`;

export async function myFavouriteRecepiesPage(ctx) {
    ctx.render(loaderTemplate());
    const data = await getMyFavouriteRecepies(sessionStorage.getItem('id'));

    addUppercase(data);

    const myFavouriteRecepies = data.results.map(recipeTemplate);

    ctx.render(myRecepiesCollectionTemplate(myFavouriteRecepies, ctx));
    
    trackActiveLink(ctx);
}