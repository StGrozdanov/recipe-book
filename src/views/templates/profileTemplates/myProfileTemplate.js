import { html } from '../../../../node_modules/lit-html/lit-html.js';

export const myProfileTemplate = () => html`
<section class="user-profile">
    <button class="profile-navigation-button"><i class="fa-solid fa-comment-dots"></i> Известия</button>
    <button class="profile-navigation-button"><i class="fa-solid fa-utensils"></i> Моите рецепти</button>
    <button class="profile-navigation-button"><i class="fa-regular fa-star"></i> Любими рецепти</button>
    <button class="profile-navigation-button"><i class="fa-solid fa-user-pen"></i> Редактирай профила</button>
</section>
`; 