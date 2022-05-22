import { html } from '../../../../node_modules/lit-html/lit-html.js';

export const myProfileTemplate = () => html`
<section class="user-profile">
    <a href="/my-profile/notifications" class="profile-navigation-button">
        <i class="fa-solid fa-comment-dots"></i> Известия
    </a>
    <a href="/my-profile/created-recepies" class="profile-navigation-button">
        <i class="fa-solid fa-utensils"></i> Моите рецепти
    </a>
    <a href="/my-profile/favourite-recepies" class="profile-navigation-button">
        <i class="fa-regular fa-star"></i> Любими рецепти
    </a>
    <a href="/my-profile/edit" class="profile-navigation-button">
        <i class="fa-solid fa-user-pen"></i> Редактирай профила
    </a>
</section>
`;

export function trackActiveLink(ctx) {
    const currentPage = ctx.path;

    const navLinks = document.querySelectorAll('.profile-navigation-button');

    navLinks.forEach(navLink => navLink.classList.remove('active'));

    const activeLink = Array.from(navLinks).find(navLink => navLink.attributes.href.value === currentPage);

    if (activeLink !== undefined) {
        activeLink.classList.add('active');
    }
}