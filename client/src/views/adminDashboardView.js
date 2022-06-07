import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { drawVisitationsChart } from "../utils/visitationsChart.js";
import { loaderTemplate } from "./templates/adminLoadingTemplate.js";

const dashboardTemplate = (avatar, recipesCount=12) => html`
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
`;

export async function adminPanelDashboardPage() {
    render(loaderTemplate(), document.getElementById('admin-root'));

    render(dashboardTemplate(undefined, 12), document.getElementById('admin-root'));

    drawVisitationsChart();
}