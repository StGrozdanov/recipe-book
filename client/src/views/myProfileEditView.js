import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublicationsCount } from '../services/recipeService.js';
import { update } from '../services/userService.js';
import { notify } from '../utils/notification.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { showModal } from '../utils/modalDialogue.js';
import * as formDataValidator from '../utils/formDataValidator.js';
import { logout, getCurrentUser } from '../services/authenticationService.js';

const myPublicationsTemplate = (recepiesCount, ctx) => html`
<section class="my-profile-section">
    ${myProfileTemplate()}
<section class="profile-edit-section">
    <article class="user-profile-article">
    <form @submit=${(e) => editProfileHandler(e, ctx)} class="edit-profile-form" enctype='multipart/form-data'>
        <input
            name="cover-img" 
            type="text" 
            id="cover-input" 
            style="display: none; margin-top: -300px; z-index: 2; position: absolute;" 
            placeholder="Адрес на картинка"
            value=${
                sessionStorage.getItem('coverPhoto') === 'null'
                    ? nothing 
                    : sessionStorage.getItem('coverPhoto')} 
            autocomplete="off"
        />
        <div class="element" style="position: absolute; top: 0; display: none;" id="upload-cover">
            <i 
                class="fas fa-file-upload" 
                style="margin: 10px; cursor: pointer; font-size: 175%;"
                id="cover-button"
            >
            </i>
            <input type="file" name="coverUpload" id="cover-upload" style="display:none;">
        </div>
        <header @click=${pictureChangeHandler} id="user-profile-cover" class="user-profile-header">
            <img class="user-profile-header-picture" src=${
                                                                sessionStorage.getItem('coverPhotoUrl') === 'null'
                                                                    ? "../../static/images/user-profile-header.jpeg"
                                                                    : sessionStorage.getItem('coverPhotoUrl')
                                                                    }
            >
        </header>
        <div @click=${pictureChangeHandler} id="user-profile-avatar" class="user-profile-avatar-container">
            <img alt="user-profile" class="user-profile-avatar" src=${
                                                                sessionStorage.getItem('avatarUrl') === 'null'
                                                                    ? "../../static/images/Avatar.png"
                                                                    : sessionStorage.getItem('avatarUrl')
                                                                    }
            >
        </div>
        <div class="element" style="position: absolute; top: 24%; display: none;" id="upload-avatar">
            <i 
                class="fas fa-file-upload" 
                style="margin: 10px; cursor: pointer; font-size: 175%;"
                id="avatar-button"
            >
            </i>
            <input type="file" name="avatarUpload" id="avatar-upload" style="display:none;">
        </div>
        <input
            name="avatar"
            type="text" 
            id="avatar-input" 
            style="display: none; margin-top: -10px; z-index: 2" 
            placeholder="Адрес на снимка"
            value=${sessionStorage.getItem('avatarUrl') === 'null' ? nothing : sessionStorage.getItem('avatarUrl')} 
            autocomplete="off"
        />
        <main class="user-profile-article-info">
                <i class="fa-solid fa-triangle-exclamation warning-icon profile-warning" style="display: none;"></i>
                <i class="fa-solid fa-square-check check-icon profile-check" style="display: none;"></i>
                <input
                    @input=${formDataValidator.profileEditValidateHandler}
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    class="user-profile-edit-username" 
                    value=${sessionStorage.getItem('username')} 
                    autocomplete="off"
                />
                <span class="invalid-input-text" style="display: none;">
                    Потребителското ви име трябва да е между 3 и 10 символа
                </span>
                <p>
                    <i class="fa-solid fa-bowl-rice"></i> ${recepiesCount.recipesCount} created
                </p>
                <p>
                    <i class="fa-solid fa-envelope"></i>
                    <i class="fa-solid fa-triangle-exclamation second-warning warning-icon profile-warning" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon second-check profile-check" style="display: none;"></i>
                    <input 
                        @input=${formDataValidator.profileEditValidateHandler} 
                        type="text" 
                        placeholder="email" 
                        name="email" 
                        value=${sessionStorage.getItem('email')}
                        autocomplete="off"
                    />
                    <span class="invalid-input-text email-edit-msg" style="display: none;">
                    Имейлът ви е невалиден
                    </span>
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
    const myRecepies = await getMyPublicationsCount(getCurrentUser());

    const myPublications = myPublicationsTemplate(myRecepies, ctx);

    ctx.render(myPublications);

    trackActiveLink(ctx);
    addEventListenersToUploadImageIcons();
}

function pictureChangeHandler(e) {
    let coverInputForm;
    let uploadIcon;
    
    if (e.currentTarget.id == 'user-profile-cover') {
        coverInputForm = document.getElementById('cover-input');
        uploadIcon = document.getElementById('upload-cover');
        toggleInput();
    } else if (e.currentTarget.id == 'user-profile-avatar') {
        coverInputForm = document.getElementById('avatar-input');
        uploadIcon = document.getElementById('upload-avatar');
        toggleInput();
    }

    function toggleInput() {
        if (coverInputForm.style.display == 'none') {
            coverInputForm.style.display = 'inline-block'; 
            uploadIcon.style.display = 'inline-block';
        } else {
            coverInputForm.style.display = 'none';
            uploadIcon.style.display = 'none';
        } 
    }
}

async function editProfileHandler(e, ctx) {
    e.preventDefault();

    const formData = new FormData(e.target);

    let coverImage = formData.get('cover-img');
    let avatar = formData.get('avatar');
    const username = formData.get('username');
    const email = formData.get('email');
    const coverUpload = formData.get('coverUpload');
    const avatarUpload = formData.get('avatarUpload');

    TODO: //IMAGE VALIDATION
    if (email == '' || username == '') {
        return notify('Всички полета са задължителни!');
    } else if (formDataValidator.profileFormContainsInvalidInput(e.currentTarget)) {
        return notify('Поправете невалидните полета.')
    }

    showModal('Сигурни ли сте, че искате да промените данните си?', onSelect);

    formData.append('profileImageFile', avatarUpload);
    formData.append('coverImageFile', coverUpload);

    const editedProfile = {
        username: username,
        email: email,
        avatarUrl: avatar,
        coverPhotoUrl: coverImage,
    }

    formData.append('data', JSON.stringify(editedProfile));

    async function onSelect(choice) {
        if (choice) {
            ctx.render(loaderTemplate());
            await update(getCurrentUser(), formData);
            notify("Успешно редактирахте профила си! Моля влезте наново, за да отразите промените.")
            await logout();
            ctx.page.redirect('/login');
        }
    }
}

function addEventListenersToUploadImageIcons() {
    document.getElementById('cover-button').addEventListener('click', () => {
        document.getElementById('cover-upload').click();
    });
    document.getElementById('avatar-button').addEventListener('click', () => {
        document.getElementById('avatar-upload').click();
    });
}