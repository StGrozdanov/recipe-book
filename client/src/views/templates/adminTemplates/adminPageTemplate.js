import { html } from "../../../../node_modules/lit-html/lit-html.js";
import page from '../../../../node_modules/page/page.mjs';

export const adminPanelTemplate = (greeting, username, avatar) => html`
    <section class="admin-panel-section">
        <nav class="admin-panel-nav">
            <img @click=${panelNavigateHandler} class="home admin-panel-nav-logo" src="../static/images/cooking.png" alt="" />
            <ul class="admin-panel-nav-ul">
                <li class="admin-panel-nav-li">
                    <i @click=${(e) => panelNavigateHandler(e)} class="administrate-dashboard fa-solid fa-chart-simple nav-icon admin-icon-selected"></i>
                </li>
                <li class="admin-panel-nav-li">
                    <i @click=${(e) => panelNavigateHandler(e)} class="administrate/users fa-solid fa-user-large nav-icon"></i>
                </li>
                <li class="admin-panel-nav-li">
                    <i @click=${(e) => panelNavigateHandler(e)} class="administrate/recipes fa-solid fa-bowl-rice nav-icon"></i>
                </li>
                <li class="admin-panel-nav-li">
                    <i @click=${(e) => panelNavigateHandler(e)} class="administrate/comments fa-solid fa-comment-dots nav-icon"></i>
                </li>
            </ul>
            <i @click=${(e) => panelNavigateHandler(e)} class="administrate/settings fa-solid fa-gear nav-icon"></i>
        </nav>
        <section class="admin-panel-section-wrapper">
            <article class="admin-panel-content">
                <header class="admin-panel-content-header">
                    <article class="admin-panel-content-header-greeting-article">
                        <h2>${greeting}, ${username}</h2>
                        <p id="page-message">Статистически данни за сайта</p>
                    </article>
                    <article class="admin-panel-content-header-nav-article">
                        <form class="admin-panel-search-form">
                            <input class="admin-panel-search-input slideFadeInUp" type="search" autocomplete="off">
                        </form>
                        <i @click=${toggleSearchInputHandler} class="fa-solid fa-magnifying-glass"></i>
                        <i class="fa-regular fa-bell"></i>
                        <div class="admin-avatar-container">
                            <img 
                                src=${
                                    !avatar || avatar.includes('undefined')
                                    ? "../../static/images/Avatar.png"
                                    : avatar
                                    } 
                                alt="" 
                                onerror="this.onerror=null;this.src='../../static/images/Avatar.png';" 
                            />
                        </div>
                    </article>
                </header>
                <main id="admin-root" class="admin-panel-content-main"></main>
            </article>
        </section>
    </section>
`;

function toggleSearchInputHandler(e) {
    const adminNav = e.target.parentNode.querySelector('.admin-panel-search-input');

    adminNav.style.display == 'none' ? adminNav.style.display = 'block' : adminNav.style.display = 'none';
}

function panelNavigateHandler(e) {
    if (e.target.classList[0] == 'home') {
        page.redirect('/'); 
        document.querySelector('footer').style.display = 'flex';
        return;
    } 
    page.redirect(`/${e.target.classList[0]}`);
}