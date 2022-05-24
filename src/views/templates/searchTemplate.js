import { html } from "../../../node_modules/lit-html/lit-html.js";
import { searchByNameOfFavouriteRecipe, searchByRecipeNameAndOwner } from "../../services/filtrationService.js";
import { addUppercase } from "../../utils/capitalizator.js";
import { notify } from "../../utils/notification.js"
import { myRecepiesCollectionTemplate as createdRecipesTemplate } from "../myRecepiesView.js";
import { myRecepiesCollectionTemplate as favouriteRecipesTemplate } from "../myFavouritesView.js";
import { recipeTemplate } from "./recipeTemplate.js";

export const searchTemplate = (ctx, userCollectionSearch) => html`
    <form @submit=${(e)=> search(e, ctx, userCollectionSearch)}>
        <img @click=${(e)=> search(e, ctx, userCollectionSearch)} id="find-img"
        src="../../static/images/istockphoto-1068237878-170667a-removebg-preview.png">
        <input type="search" id="myInput" placeholder="Търсете по име на рецептата..." autocomplete="off">
    </form>
`;

async function search(e, ctx, userCollectionSearch) {
    e.preventDefault();

    const inputField = document.getElementById('myInput');
    let query = inputField.value;

    if (userCollectionSearch && userCollectionSearch.request) {
        if (query.trim() !== '') {
            query = query.toLowerCase();
            const currentUserId = sessionStorage.getItem('id');

            let recipes;

            if (userCollectionSearch.request == 'Създадени рецепти') {
                const data = await searchByRecipeNameAndOwner(query, currentUserId);
                addUppercase(data);
                recipes = data.results.map(recipeTemplate);
                ctx.render(createdRecipesTemplate(recipes, ctx));
            } else {
                const data = await searchByNameOfFavouriteRecipe(query, currentUserId);
                recipes = data.map(recipeTemplate);
                ctx.render(favouriteRecipesTemplate(recipes, ctx));
            }

        } else {
            userCollectionSearch.request == 'Създадени рецепти' 
                ? ctx.page.redirect('/my-profile/created-recepies')
                : ctx.page.redirect('/my-profile/favourite-recepies');
        }
    } else {
        if (query.trim() !== '') {
            ctx.page.redirect(`/search=${query}`);
        } else {
            notify('Добър опит! Сега пробвайте да въведете и буквички.')
        }
    }
}