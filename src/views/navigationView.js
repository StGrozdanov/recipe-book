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
                <a id="createLink" href="/add-recipe" >Създай рецепта</a>
                <a @click=${() => logoutHandler(ctx)} id="logoutBtn" href="javascript:void(0)">Изход</a>
            </div>
`;

const navigationTemplate = (ctx) => html`
<nav @click=${trackActiveLink}>
            <a id="catalogLink" href="/" class="active">Списък с рецепти</a>
            ${userIsLoggedIn()
            ? userViewTemplate(ctx)
            : guestViewTemplate()}
</nav>
<div><img src="/static/images/nav-image.jpg" alt="broken img"></div> 
`;

export function renderNavigation(ctx) {
    render(navigationTemplate(ctx), container);
}

async function logoutHandler(ctx) {
    await logout();
    ctx.page.redirect('/');
    const navigationHomeButton = document.querySelector('#catalogLink');
    navigationHomeButton.classList.add('active');
}

function trackActiveLink(e) {
    if (e.path[0].localName == 'a') {
        const navAnkerTags = Array.from(e.currentTarget.getElementsByTagName('a'));
        
        navAnkerTags.forEach(tag => tag.classList.remove('active'));
        
        e.target.classList.add('active');
    }
}

function userIsLoggedIn() {
    return sessionStorage.getItem('authToken') !== null;
}