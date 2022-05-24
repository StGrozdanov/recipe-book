import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublicationsCount } from '../services/recipeService.js';
import { logout, update } from '../services/userService.js';
import { notify } from '../utils/notification.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { showModal } from '../utils/modalDialogue.js';

const myPublicationsTemplate = (recepiesCount, ctx) => html`
<section class="my-profile-section">
    ${myProfileTemplate()}
<section class="profile-edit-section">
    <article class="user-profile-article">
    <form @submit=${(e) => editProfileHandler(e, ctx)} class="edit-profile-form">
        <input
            name="cover-img" 
            type="text" 
            id="cover-input" 
            style="display: none; margin-top: -300px; z-index: 2; position: absolute;" 
            placeholder="Адрес на картинка"
            value=${sessionStorage.getItem('coverPhoto').includes('undefined') ? nothing : sessionStorage.getItem('coverPhoto')} 
            autocomplete="off"
        />
        <header @click=${pictureChangeHandler} id="user-profile-cover" class="user-profile-header">
            <img class="user-profile-header-picture" src=${
                                                                sessionStorage.getItem('coverPhoto').includes('undefined')
                                                                ? "../../static/images/user-profile-header.jpeg"
                                                                : sessionStorage.getItem('coverPhoto')
                                                                    }
            >
        </header>
        <div @click=${pictureChangeHandler} id="user-profile-avatar" class="user-profile-avatar-container">
            <img alt="user-profile" class="user-profile-avatar" src=${
                                                                sessionStorage.getItem('avatar').includes('undefined')
                                                                ? "../../static/images/Avatar.png"
                                                                : sessionStorage.getItem('avatar')
                                                                    }
            >
        </div>
        <input
            name="avatar"
            type="text" 
            id="avatar-input" 
            style="display: none; margin-top: -10px; z-index: 2" 
            placeholder="Адрес на снимка"
            value=${sessionStorage.getItem('avatar').includes('undefined') ? nothing : sessionStorage.getItem('avatar')} 
            autocomplete="off"
        />
        <main class="user-profile-article-info">
                <input 
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    class="user-profile-edit-username" 
                    value=${sessionStorage.getItem('username')} 
                    autocomplete="off"
                />
                <p>
                    <i class="fa-solid fa-bowl-rice"></i> ${recepiesCount} created
                </p>
                <p>
                    <i class="fa-solid fa-envelope"></i>
                    <input type="text" placeholder="email" name="email" value=${sessionStorage.getItem('email')} />
                </p>
        </main>
        <button type="submit" class="button submit-btn"><i class="fa-solid fa-user-check"></i> Редактирай данните</button>
      </form>
    </article>
</section>
</section>
`;

export async function myProfileEditPage(ctx) {
    ctx.render(loaderTemplate());
    const myRecepies = await getMyPublicationsCount(sessionStorage.getItem('id'));

    const myPublications = myPublicationsTemplate(myRecepies.count, ctx);

    ctx.render(myPublications);

    trackActiveLink(ctx);
}

function pictureChangeHandler(e) {
    let coverInputForm;
    
    if (e.currentTarget.id == 'user-profile-cover') {
        coverInputForm = document.getElementById('cover-input');
        toggleInput();
    } else if (e.currentTarget.id == 'user-profile-avatar') {
        coverInputForm = document.getElementById('avatar-input');
        toggleInput();
    }

    function toggleInput() {
        coverInputForm.style.display == 'none' 
            ? coverInputForm.style.display = 'inline-block' 
            : coverInputForm.style.display = 'none';
    }
}

async function editProfileHandler(e, ctx) {
    e.preventDefault();

    const formData = new FormData(e.target);

    let coverImage = formData.get('cover-img');
    let avatar = formData.get('avatar');
    const username = formData.get('username');
    const email = formData.get('email');

    if (coverImage.trim() == '') {
        coverImage = 'undefined';
    }
    if (avatar.trim() == '') {
        avatar = 'undefined';
    }

    if (email == '' || username == '') {
        return notify('Всички полета са задължителни!');
    }

    showModal('Сигурни ли сте, че искате да промените данните си?', onSelect);

    async function onSelect(choice) {
        if (choice) {
            ctx.render(loaderTemplate());
            await update(sessionStorage.getItem('id'), username, email, avatar, coverImage);
            notify("Успешно редактирахте профила си! Моля влезте наново, за да отразите промените.")
            await logout();
            ctx.page.redirect('/login');
        }
    }
}