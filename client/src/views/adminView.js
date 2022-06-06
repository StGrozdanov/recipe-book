import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { mainRootElement } from "../middlewares/setUpMidware.js";
import { drawVisitationsChart } from "../utils/visitationsChart.js";

const adminPanelTemplate = (greeting, username, avatar, coverPhoto, recipesCount=12) => html`
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
                        <i class="fa-solid fa-magnifying-glass"></i>
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
                <main class="admin-panel-content-main">
                    
                    <article class="stats-card">
                        <i class="fa-solid fa-file-circle-plus"></i>
                        <h5>ПУБЛИКАЦИИ</h5>
                        <h4>19</h4>
                    </article>
                    
                    <article class="stats-card">
                        <i class="fa-solid fa-users"></i>
                        <h5>ПОТРЕБИТЕЛИ</h5>
                        <h4>5</h4>
                    </article>
                    
                    <article class="stats-card">
                        <i class="fa-solid fa-comments"></i>
                        <h5>КОМЕНТАРИ</h5>
                        <h4>12</h4>
                    </article>
                    
                    <article class="stats-card">
                        <i class="fa-regular fa-eye"></i>
                        <h5>ПОСЕЩЕНИЯТА ДНЕС</h5>
                        <h4>121</h4>
                    </article>

                    <article class="most-active-user">

                    <article class="user-profile-article">
        <header class="user-profile-header">
            <h5>Най-активен потребител:</h5>
            <h4>shushan</h4>
        </header>
        <div class="user-profile-avatar-container">
            <img alt="user-profile" class="user-profile-avatar" src=${
                                                                !avatar || avatar.includes('undefined')
                                                                ? "../../static/images/Avatar.png"
                                                                : avatar
                                                                    }
            >
        </div>
        <main class="user-profile-article-info">
            <h4 class="username-header">16 публикации</h4>
            <p><i class="fa-solid fa-bowl-rice"></i> ${recipesCount} рецепти</p>
            <p><i class="fa-solid fa-comment-dots"></i> 4 коментара</p>
        </main>
    </article>
                    </article>

                    <article class="stats-graph">
                        <div class="chart">
                            <canvas class="visitations-chart"></canvas>
                        </div>
                    </article>
                </main>
            </article>
        </section>
    </section>
`;

const timeParts = {
    "Добро утро": [3, 4, 5, 6, 7, 8, 9, 10, 11],
    "Добър ден": [12, 13, 14, 15, 16, 17, 18],
    "Добър вечер": [19, 20, 21, 22, 23, 0, 1, 2]
}

export async function adminPanelPage() {
    resetBaseStyleArchitecture();

    const currentHour = new Date(Date.now()).getHours();

    let greeting;

    Object.entries(timeParts).forEach(timePart => {
        const timePartKey = timePart[0];
        const timePartValues = timePart[1];

        if (timePartValues.some(hour => hour === currentHour)) {
            greeting = timePartKey;
            return;
        }
    });

    const username = sessionStorage.getItem('username');
    const avatar = sessionStorage.getItem('avatar');

    render(adminPanelTemplate(greeting, username, avatar), mainRootElement);
    drawVisitationsChart();
}

function resetBaseStyleArchitecture() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('body').style.width = '100%';
    document.querySelector('footer').style.display = 'none';
}