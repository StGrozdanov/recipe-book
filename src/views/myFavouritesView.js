import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyFavouriteRecepies } from '../services/recipeService.js';
import { addUppercase } from '../utils/capitalizator.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { myRecepiesTemplate } from './templates/profileTemplates/myRecepiesTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';


const myRecepiesCollectionTemplate = (recepies) => html`
    ${myProfileTemplate()}
    ${myRecepiesTemplate(recepies, "Любими рецепти")}
`;

export async function myFavouriteRecepiesPage(ctx) {
    const data = await getMyFavouriteRecepies(sessionStorage.getItem('id'));

    addUppercase(data);

    const myFavouriteRecepies = data.results.map(recipeTemplate);

    ctx.render(myRecepiesCollectionTemplate(myFavouriteRecepies));
    
    trackActiveLink(ctx);
}