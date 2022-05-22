import { html } from "../../../../node_modules/lit-html/lit-html.js";
import { noSuchRecipesTemplate } from "../noRecepiesFoundTemplate.js";

export const myRecepiesTemplate = (recepies) => html`
<section id="cards-section">
    <div id="cards">
        <h1 class="user-recepies-heading">Моите Рецепти</h1>
        <div id="cards-content">
            <ul class="recipe-card-list">
                ${recepies.length > 0 ? recepies : noSuchRecipesTemplate()}
            </ul>
        </div>
    </div>
</section>
`;