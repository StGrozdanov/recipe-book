import { html } from "../../../node_modules/lit-html/lit-html.js";

export const adminPanelTemplate = (greeting, username, avatar) => html`
    <section class="admin-panel-section">
        <nav class="admin-panel-nav">
            <img class="admin-panel-nav-logo" src="../static/images/cooking.png" alt="" />
            <ul class="admin-panel-nav-ul">
                <li class="admin-panel-nav-li">
                    <i class="fa-solid fa-chart-simple admin-icon-selected"></i>
                </li>
                <li class="admin-panel-nav-li">
                    <i class="fa-solid fa-user-large"></i>
                </li>
                <li class="admin-panel-nav-li">
                    <i class="fa-solid fa-bowl-rice"></i>
                </li>
                <li class="admin-panel-nav-li">
                    <i class="fa-solid fa-comment-dots"></i>
                </li>
            </ul>
            <i class="fa-solid fa-gear"></i>
        </nav>
        <section class="admin-panel-section-wrapper">
            <article class="admin-panel-content">
                <header class="admin-panel-content-header">
                    <article class="admin-panel-content-header-greeting-article">
                        <h2>${greeting}, shushan</h2>
                        <p>Статистически данни за сайта</p>
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
                                    ? "../static/images/Avatar.png"
                                    : avatar
                                    } 
                                alt="" 
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