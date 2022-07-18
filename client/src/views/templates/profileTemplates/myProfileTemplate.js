import { html, nothing } from '../../../../node_modules/lit-html/lit-html.js';
import { COULD_NOT_EDIT_USER_WRONG_CREDENTIALS } from '../../../constants/errorMessages.js';
import { checkCredentials, getCurrentUser, logout, refreshToken, userIsAdministrator } from '../../../services/authenticationService.js';
import { modalPassword, showPasswordModal } from '../../../utils/passwordModalDialogue.js';
import { showLoadingSpinner } from '../../../utils/loadingSpinner.js';
import { notify } from '../../../utils/notification.js';

const adminButtonTemplate = (ctx) => html`
    <a @click=${(e)=> adminPanelRedirectHandler(e, ctx)}
        href="javascript:void[0]"
        class="profile-navigation-button"
        >
        <i class="fa-solid fa-chart-column"></i>
    </a>
`;

export const myProfileTemplate = (ctx) => html`
<section class="user-profile">
    ${userIsAdministrator() ? adminButtonTemplate(ctx) : nothing}
    <a @click=${checkNotificationHandler} href="/my-profile/notifications" class="profile-navigation-button"
        style="position: relative;">
        <i class="fa-solid fa-comment-dots"></i>
        <span id="myProfileNavNotificationCounter" class="counter">0</span>
        Известия
    </a>
    <a href="/my-profile/created-recepies" class="profile-navigation-button">
        <i class="fa-solid fa-utensils"></i>
        Моите рецепти
    </a>
    <a href="/my-profile/favourite-recepies" class="profile-navigation-button">
        <i class="fa-regular fa-star"></i>
        Любими рецепти
    </a>
    <a href="/my-profile/edit" class="profile-navigation-button">
        <i class="fa-solid fa-user-pen"></i>
        Редактирай профила
    </a>
</section>
`;

export function trackActiveLink(ctx) {
    const currentPage = ctx.path;

    const mainNavLinks = document.querySelectorAll('nav a');
    const navLinks = document.querySelectorAll('.profile-navigation-button');

    removeActiveLinks(mainNavLinks);
    removeActiveLinks(navLinks);

    const activeLink = Array.from(navLinks).find(navLink => navLink.attributes.href.value === currentPage);

    if (activeLink !== undefined) {
        activeLink.classList.add('active');
    }
}

function removeActiveLinks(target) {
    target.forEach(navLink => {
        if (navLink.attributes.href.value !== '/my-profile')
            navLink.classList.remove('active')
    });
}

function checkNotificationHandler() {
    document.getElementById('myProfileLinkNotificationIcon').style.display = 'none';
}

function adminPanelRedirectHandler(e, ctx) {
    e.preventDefault();

    showPasswordModal(onInput);

    async function onInput() {
        showLoadingSpinner(e.target);
    
        const response = await checkCredentials(getCurrentUser(), { password: modalPassword });
    
        if (response.ok) {
            ctx.page.redirect('/administrate-dashboard');
        } else {
            if (response.status === 403) {
                await refreshToken();
                const response = await checkCredentials(getCurrentUser(), { password: modalPassword });
                if (!response.ok) {
                    await logout();
                    ctx.page.redirect('/login');
                    return notify(COULD_NOT_EDIT_USER_WRONG_CREDENTIALS);
                }
                ctx.page.redirect('/administrate-dashboard');
            } else {
                await logout();
                notify(COULD_NOT_EDIT_USER_WRONG_CREDENTIALS);
                ctx.page.redirect('/login');
            }
        }
    }
}


