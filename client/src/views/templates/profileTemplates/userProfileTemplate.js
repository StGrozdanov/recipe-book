import { html, nothing } from '../../../../node_modules/lit-html/lit-html.js';
import { userIsAuthenticated } from '../../../services/authenticationService.js';

export const userProfileTemplate = ({coverPhotoUrl, avatarUrl, username, email}, recipesCount) => html`
    <article class="user-profile-article">
        <header class="user-profile-header">
            <img 
                class="user-profile-header-picture" 
                src=${
                        !coverPhotoUrl || coverPhotoUrl == 'null'
                            ? "../../static/images/user-profile-header.jpeg"
                            : coverPhotoUrl
                    }
                alt=""
                onerror="this.onerror=null;this.src='../../static/images/user-profile-header.jpeg';" 
            >
        </header>
        <div class="user-profile-avatar-container">
            <img 
                class="user-profile-avatar" 
                src=${
                        !avatarUrl || avatarUrl == 'null'
                            ? "../../static/images/Avatar.png"
                            : avatarUrl
                }
                alt=""
                onerror="this.onerror=null;this.src='../../static/images/Avatar.png';" 
            >
        </div>
        <main class="user-profile-article-info">
            <h3 class="username-header">${username}</h3>
            <p><i class="fa-solid fa-bowl-rice"></i> ${recipesCount} рецепти</p>
            <p>
                <a href=${userIsAuthenticated() ? "mailto:${email}" : nothing}>
                    <i class="fa-solid fa-envelope"></i> 
                    ${userIsAuthenticated() ? email : '(видим за потребители)'}
                </a>
            </p>
        </main>
    </article>
`; 