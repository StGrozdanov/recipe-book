import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { navigateHandler } from '../../landingView.js';

export const mostViewedRecepieTemplate = (recipe) => html`
    <article class="landing-latest-recepies-article">
        <h4 
            @click=${() => navigateHandler(`/details-${recipe.id}`, true)} 
            class="recipe-name"
        >
            ${recipe.recipeName}
        </h4>
        <header 
            @click=${() => navigateHandler(`/details-${recipe.id}`, true)} 
            class="landing-latest-recepies-article-picture-container"
        >
            <img 
                src=${recipe.imageUrl} 
                alt="" 
                onerror="this.onerror=null;this.src='../../../static/images/food.jpg';" 
            />
        </header>
    </article>
`;