import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { navigateHandler } from '../../landingView.js';

export const latestRecepieTemplate = (recipe) => html`
    <article class="landing-latest-recepies-article">
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
        <main>
            <h4 class="recipe-name">${recipe.recipeName}</h4>
        </main>
        <footer class="landing-latest-recepies-article-footer">
            ${recipe.category}
        </footer>
    </article>
`;