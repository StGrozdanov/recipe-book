import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { navigateHandler } from '../../landingView.js';

export const mostViewedRecepieTemplate = (recepie) => html`
    <article class="landing-latest-recepies-article">
        <h4 @click=${() => navigateHandler(`/details-${recepie.objectId}`, true)} class="recipe-name">${recepie.name}</h4>
        <header 
            @click=${() => navigateHandler(`/details-${recepie.objectId}`, true)} 
            class="landing-latest-recepies-article-picture-container"
        >
            <img src=${recepie.img} alt="" />
        </header>
    </article>
`;