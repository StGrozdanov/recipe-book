import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { navigateHandler } from '../../landingView.js';

export const latestCommentsTemplate = (comment) => html`
    <article class="landing-latest-recepies-article latest-comments-article">
        <header @click=${()=> navigateHandler(`/user-${comment.owner.id}`, true)}
            class="landing-latest-recepies-article-picture-container"
        >
            <img src=${
                !comment.owner.avatarUrl
                    ? "../../static/images/Avatar.png"
                    : comment.owner.avatarUrl
                } alt="profile-image" />
        </header>
        <section class="landing-comment-section">
            <p>${comment.owner.username}</p>
            <p>${comment.createdAt.replace('T', ', ')}</p>
            <a @click=${()=> navigateHandler(`/details-${comment.recipe.id}`, true)}
                href="javascript:void[0]"
                class="recipe-name"
            >
                ${comment.recipe.recipeName}
            </a>
        </section>
    </article>
    <p>${comment.content}</p>
`;