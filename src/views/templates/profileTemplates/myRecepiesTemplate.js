import { html } from "../../../../node_modules/lit-html/lit-html.js";
import { searchTemplate } from "../searchTemplate.js";

export const myRecepiesTemplate = (recepies, heading, ctx) => html`
<section class="user-recepies-section">
    ${searchTemplate(ctx, { request: heading })}
    <section id="cards-section">
        <div id="cards">
            <h2 class="user-recepies-heading">${heading}:</h2>
            <div id="cards-content">
                <ul class="recipe-card-list">
                    ${recepies.length > 0 ? recepies : html`<h4>Все още не сте добавили ${heading}.</h4>`}
                </ul>
            </div>
        </div>
    </section>
</section>
`;