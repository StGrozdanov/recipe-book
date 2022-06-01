import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { navigateHandler } from '../../landingView.js';

export const latestRecepieTemplate = (recepie) => html`
    <article class="landing-latest-recepies-article">
        <header 
            @click=${() => navigateHandler(`/details-${recepie.objectId}`, true)} 
            class="landing-latest-recepies-article-picture-container"
        >
            <img src=${recepie.img} alt="" />
        </header>
        <main>
            <h4 class="recipe-name">${recepie.name}</h4>
        </main>
        <footer class="landing-latest-recepies-article-footer">
            ${recepie.category}
        </footer>
    </article>
`;