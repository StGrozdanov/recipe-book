import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../services/userService.js'

const container = document.getElementById('nav-container');

const guestViewTemplate = () => html`
            <div id="guest">
                <a id="loginLink" href="/login">Вход</a>
                <a id="registerLink" href="/register">Регистрация</a>
            </div>
            `;

const userViewTemplate = (ctx) => html`
            <div id="user">
                <a id="createLink" href="/add-recipe">Създай рецепта</a>
                <a id="createLink" href='/my-profile'>Моят профил</a>
                <a @click=${() => logoutHandler(ctx)} id="logoutBtn" href="javascript:void(0)">Изход</a>
            </div>
            `;

const navigationTemplate = (ctx) => html`
        <nav>
            <a id="catalogLink" href="/" class="active">Всички рецепти</a>
            ${
                userIsLoggedIn()
                        ? userViewTemplate(ctx)
                        : guestViewTemplate()
            }
        </nav>
        <div><img src="/static/images/nav-image.jpg" alt="broken img"></div> 
            `;

export function renderNavigation(ctx) {
    render(navigationTemplate(ctx), container);
    trackActiveLink(ctx);
}

async function logoutHandler(ctx) {
    await logout();
    ctx.page.redirect('/');
}

function trackActiveLink(ctx) {
    const currentPage = ctx.path;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(navLink => navLink.classList.remove('active'));

    const activeLink = Array.from(navLinks).find(navLink => navLink.attributes.href.value === currentPage);
    
    if (activeLink !== undefined) {
        activeLink.classList.add('active');
    } else {
        navLinks[0].classList.add('active');
    }
}

function userIsLoggedIn() {
    return sessionStorage.getItem('authToken') !== null;
}