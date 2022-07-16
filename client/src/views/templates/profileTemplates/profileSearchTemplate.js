import { html } from "../../../../node_modules/lit-html/lit-html.js";
import { CREATED_RECIPES } from '../../../constants/web.js';
import { searchInUserCreatedRecipesByRecipeName, searchByNameOfFavouriteRecipe } from '../../../services/filtrationService.js';
import { recipeTemplate } from "../recipeTemplate.js";
import { myRecepiesCollectionTemplate as createdRecipesTemplate } from "../../myRecepiesView.js";
import { myRecepiesCollectionTemplate as favouriteRecipesTemplate } from "../../myFavouritesView.js";

export const profileSearchTemplate = (ctx, userCollectionSearch) => html`
    <form @input=${(e)=> search(e, ctx, userCollectionSearch)}>
        <img @click=${(e)=> search(e, ctx, userCollectionSearch)} id="find-img"
        src="../../static/images/istockphoto-1068237878-170667a-removebg-preview.png">
        <input type="search" id="myInput" placeholder="Търсете по име на рецептата..." autocomplete="off">
    </form>
`;

async function search(e, ctx, userCollectionSearch) {
    e.preventDefault();

    const inputField = document.getElementById('myInput');
    let query = inputField.value;

    if (query.trim() !== '') {
        query = query.toLowerCase();
        const currentUserId = sessionStorage.getItem('id');

        let recipes;

        if (userCollectionSearch.request == CREATED_RECIPES) {
            window.history.replaceState('smh', 'smhmore', `created-recepies?search=${query}`);

            const data = await searchInUserCreatedRecipesByRecipeName(query, currentUserId);
            recipes = data.map(recipeTemplate);
            ctx.render(createdRecipesTemplate(recipes, ctx));
        } else {
            window.history.replaceState('smh', 'smhmore', `favourite-recepies?search=${query}`);

            const data = await searchByNameOfFavouriteRecipe(query, currentUserId);
            recipes = data.map(recipeTemplate);
            ctx.render(favouriteRecipesTemplate(recipes, ctx));
        }
    } else {
        userCollectionSearch.request == CREATED_RECIPES
            ? ctx.page.redirect(`/my-profile/created-recepies?search=${query}`)
            : ctx.page.redirect(`/my-profile/favourite-recepies?search=${query}`);
    }
}

export function focusSearchField() {
    document.getElementById('myInput').focus();
}