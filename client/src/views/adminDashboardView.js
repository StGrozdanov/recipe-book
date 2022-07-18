import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getTotalCommentsCount } from "../services/commentService.js";
import { findTheMostActiveUser, getRecepiesCount } from "../services/recipeService.js";
import { getTotalUsersCount } from "../services/userService.js";
import { getVisitationsToday } from "../services/visitationsService.js";
import { drawVisitationsChart } from "../utils/visitationsChart.js";
import { loaderTemplate } from "./templates/adminLoadingTemplate.js";

const dashboardTemplate = (totalRecipes, totalComments, totalUsers, visitationsToday, mostActiveUser) => html`
                    <article class="stats-card">
                        <i class="fa-solid fa-file-circle-plus"></i>
                        <h5>ПУБЛИКАЦИИ</h5>
                        <h4>${totalRecipes.recipesCount}</h4>
                    </article>
                    
                    <article class="stats-card">
                        <i class="fa-solid fa-users"></i>
                        <h5>ПОТРЕБИТЕЛИ</h5>
                        <h4>${totalUsers.usersCount}</h4>
                    </article>
                    
                    <article class="stats-card">
                        <i class="fa-solid fa-comments"></i>
                        <h5>КОМЕНТАРИ</h5>
                        <h4>${totalComments.count}</h4>
                    </article>
                    
                    <article class="stats-card">
                        <i class="fa-regular fa-eye"></i>
                        <h5>ПОСЕЩЕНИЯТА ДНЕС</h5>
                        <h4>${visitationsToday.visitationsCount}</h4>
                    </article>

                    <article class="most-active-user">

                    <article class="user-profile-article">
        <header class="user-profile-header">
            <h5>Най-активен потребител:</h5>
            <h4>${mostActiveUser.username}</h4>
        </header>
        <div class="user-profile-avatar-container">
        <img 
            alt="user-profile" 
            class="user-profile-avatar" 
            src=${mostActiveUser.avatarUrl}
            onerror="this.onerror=null;this.src='../../static/images/Avatar.png';" 
        >
        </div>
        <main class="user-profile-article-info">
            <h4 class="username-header">${mostActiveUser.totalPublicationsCount} публикации</h4>
            <p><i class="fa-solid fa-bowl-rice"></i>${mostActiveUser.recipesCount} рецепти</p>
            <p><i class="fa-solid fa-comment-dots"></i>${mostActiveUser.commentsCount} коментара</p>
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

    const totalRecipesData = getRecepiesCount();
    const totalCommentsData = getTotalCommentsCount();
    const totalUsersData = getTotalUsersCount();
    const visitationsTodayData = getVisitationsToday();
    const mostActiveUserData = findTheMostActiveUser();

    const [totalRecipes, totalComments, totalUsers, visitationsToday, mostActiveUser] = await Promise.all([
        totalRecipesData,
        totalCommentsData,
        totalUsersData,
        visitationsTodayData,
        mostActiveUserData,
    ]);

    console.log(mostActiveUser);

    render(dashboardTemplate(totalRecipes, totalComments, totalUsers, visitationsToday, mostActiveUser), document.getElementById('admin-root'));

    drawVisitationsChart();
}