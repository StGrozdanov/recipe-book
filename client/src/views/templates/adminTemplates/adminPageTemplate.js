import { html, render } from "../../../../node_modules/lit-html/lit-html.js";
import page from '../../../../node_modules/page/page.mjs';
import { globalSearchAdmin } from "../../../services/filtrationService.js";

export const adminPanelTemplate = (greeting, username, avatar, ctx) => html`
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
                        <form
                            @input=${(e)=> search(e, ctx)} 
                            class="admin-panel-search-form slideFadeInUp"
                            style="z-index: 5"
                        >
                            <input class="admin-panel-search-input" type="search" autocomplete="off">
                        </form>
                        <i @click=${(e) => toggleSearchInputHandler(e)} class="fa-solid fa-magnifying-glass"></i>
                        <div style="position: relative;">
                            <i @click=${panelNavigateHandler} class="administrate/notifications fa-regular fa-bell"></i>
                            <span id="myProfileNavNotificationCounter" class="admin-counter">0</span>
                        </div>
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
    const searchInput = e.target.parentNode.querySelector('.admin-panel-search-form');
    
    if (searchInput.style.display == 'block') {
        searchInput.style.display = 'none';
    } else {
        searchInput.style.display = 'block';
    }
}

function panelNavigateHandler(e) {
    if (e.target.classList[0] == 'home') {
        page.redirect('/'); 
        document.querySelector('footer').style.display = 'flex';
        return;
    } 
    page.redirect(`/${e.target.classList[0]}`);
}

function search(e, ctx) {
    e.preventDefault();
    if (ctx.canonicalPath.includes('dashboard')) {
        handleGlobalSearch(e, ctx);
    } else {
        if (e.target.value !== '') {
            ctx.page.redirect(ctx.canonicalPath.split('/search')[0] + `/search=${e.target.value}`); 
        } else {
            ctx.page.redirect(ctx.canonicalPath.split('/search')[0]);
        }
    }   
}

async function handleGlobalSearch(e, ctx) {
    if (e.target.value !== '') {
        const query = e.target.value;

        let data = await globalSearchAdmin(query);

        const results = data.map(data => globalSearchDropdownOptionTemplate(data, ctx));

        render(globalSearchDropdownTemplate(results), document.querySelector('.admin-panel-search-form'));
        showDropdown();
    } else {
        hideDropdown();
    }
}

const globalSearchDropdownTemplate = (results) => html`
    <div id="search-dropdown" class="global-search-dropdown-container">
        ${results}
    </div>
`;

const globalSearchDropdownOptionTemplate = ({ imageUrl, resultTypeDefaultImage, name, resultType }, ctx) => html`
<div @click=${() => globalSearchRedirectHandler(ctx, resultType, name)} style="position: relative;">
    <option class="global-search-option" value=${name}>
        <div style="margin-left: 18%">
            ${name.length > 25 ? name.substring(0, 25) + '...' : name}
        </div>
    </option>
    <div class="user-table-profile-avatar-container" style="bottom: 14%; z-index: 5; left: 5%; width: 25px; height: 25px;">
            <img 
                alt="image" 
                class="user-profile-avatar" 
                src=${`../../static/images/${resultTypeDefaultImage}`}
                onerror="this.onerror=null;this.src='../../static/images/Avatar.png';"
            />
    </div>
</div>
`;

function hideDropdown() {
    document.querySelector('#search-dropdown').style.display = 'none';
}

function showDropdown() {
    document.querySelector('#search-dropdown').style.display = 'block';
}

function globalSearchRedirectHandler(ctx, resultType, name) {
    ctx.page.redirect(`/administrate/${resultType}/search=${name.includes('/') 
                                                                ? name.replaceAll('/', '').substring(0, 5)
                                                                : name}`);
    hideDropdown();
}