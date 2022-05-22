import { html, nothing } from '../../../../node_modules/lit-html/lit-html.js';

export const userProfileTemplate = ({coverPhoto, avatar, username, email}, recipesCount) => html`
    <article class="user-profile-article">
        <header class="user-profile-header">
            <img class="user-profile-header-picture" src=${
                                                                !coverPhoto || coverPhoto.includes('undefined')
                                                                ? "../../static/images/user-profile-header.jpeg"
                                                                : coverPhoto
                                                                    }
            >
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
            <h3 class="username-header">${username}</h3>
            <p><i class="fa-solid fa-bowl-rice"></i> ${recipesCount} created</p>
            <p>
                <a href=${email ? "mailto:${email}" : nothing}>
                    <i class="fa-solid fa-envelope"></i> 
                    ${email ? email : '(видим за потребители)'}
                </a>
            </p>
        </main>
    </article>
`; 