import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { navigateHandler } from '../../landingView.js';

export const latestCommentsTemplate = (comment) => html`
    <article class="landing-latest-recepies-article latest-comments-article">
        <header @click=${()=> navigateHandler(`/user-${comment.owner.objectId}`, true)}
            class="landing-latest-recepies-article-picture-container"
        >
            <img src=${comment.owner.avatar} alt="profile-image" />
        </header>
        <section class="landing-comment-section">
            <p>${comment.owner.username}</p>
            <p>${new Date(comment.createdAt).toLocaleString()}</p>
            <a @click=${()=> navigateHandler(`/details-${comment.recipe.objectId}`, true)}
                href="javascript:void[0]"
                class="recipe-name"
            >
                ${comment.recipe.name}
            </a>
        </section>
    </article>
    <p>${comment.content}</p>
`;