import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublicationsCount } from '../services/recipeService.js';
import { update, otherUserExistsByEmail, otherUserExistsByUsername, changeUserPassword } from '../services/userService.js';
import { notify } from '../utils/notification.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { showModal } from '../utils/modalDialogue.js';
import * as formDataValidator from '../utils/formDataValidator.js';
import { getCurrentUser, logout, refreshToken, saveUserData } from '../services/authenticationService.js';
import { ARE_YOU_SURE_PROFILE_EDIT, PASSWORD_EDIT_CONFIRM, PASSWORD_EDIT_SUCCESS, PROFILE_EDIT_SUCCESS, THERE_ARE_EMPTY_FIELDS_LEFT, THERE_ARE_INVALID_FIELDS_LEFT } from '../constants/notificationMessages.js';
import { hideLoadingSpinner, showLoadingSpinner } from '../utils/loadingSpinner.js';
import { modalPassword, showPasswordModal } from '../utils/passwordModalDialogue.js';
import { COULD_NOT_EDIT_USER, COULD_NOT_EDIT_USER_WRONG_CREDENTIALS } from '../constants/errorMessages.js';
import { newPassword, oldPassword, showChangePasswordModal } from '../utils/changePasswordModalDialogue.js';

const myPublicationsTemplate = (recepiesCount, ctx) => html`
<section class="my-profile-section">
    ${myProfileTemplate()}
<section class="profile-edit-section">
    <article class="user-profile-article">
    <form @submit=${(e) => editProfileHandler(e, ctx)} class="edit-profile-form" enctype='multipart/form-data'>
        <i @click=${(e) => passwordEditHandler(e, ctx)} class="fa-solid fa-key edit-icon password-icon"></i>
        <i @click=${settingsEditHandler} class="fa-solid fa-gears edit-icon settings-icon"></i>
        <input
            name="cover-img" 
            type="text" 
            id="cover-input" 
            style="display: none; margin-top: -300px; z-index: 2; position: absolute;" 
            placeholder="Адрес на картинка"
            value=${
                sessionStorage.getItem('coverPhotoUrl') === 'null'
                    ? nothing 
                    : sessionStorage.getItem('coverPhotoUrl')} 
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
            <span class="profile-edit-username-container">
                <i class="fa-solid fa-triangle-exclamation warning-icon profile-warning" style="display: none;"></i>
                <i class="fa-solid fa-square-check check-icon profile-check" style="display: none;"></i>
                <input
                    @input=${formDataValidator.profileEditValidateHandler}
                    @blur=${checkForExistingUsername}
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    class="user-profile-edit-username" 
                    value=${sessionStorage.getItem('username')} 
                    autocomplete="off"
                />
                <span class="invalid-input-text profile-edit-text" style="display: none;">
                    Потребителското ви име трябва да е между 3 и 10 символа.
                </span>
                <span class="invalid-input-text profile-edit-text non-unique-username" style="display: none;">
                    Потребителското име е заето.
                </span>
            </span>
                <p>
                    <i class="fa-solid fa-bowl-rice"></i> ${recepiesCount.recipesCount} created
                </p>
                <p>
                    <i class="fa-solid fa-envelope"></i>
                    <span class="profile-edit-email-container">
                        <i class="fa-solid fa-triangle-exclamation warning-icon profile-warning second-warning" style="display: none;"></i>
                        <i class="fa-solid fa-square-check check-icon second-check profile-check" style="display: none;"></i>
                        <input 
                            @input=${formDataValidator.profileEditValidateHandler} 
                            @blur=${checkForExistingEmail}
                            type="text" 
                            placeholder="email" 
                            name="email" 
                            value=${sessionStorage.getItem('email')}
                            autocomplete="off"
                        />
                        <span class="invalid-input-text email-edit-msg" style="display: none;">
                            Имейлът ви е невалиден
                        </span>
                        <span class="invalid-input-text profile-edit-text non-unique-email" style="display: none;">
                            Имейлът е зает
                        </span>
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

    const coverImage = formData.get('cover-img');
    const avatar = formData.get('avatar');
    const username = formData.get('username');
    const email = formData.get('email');
    const coverUpload = formData.get('coverUpload');
    const avatarUpload = formData.get('avatarUpload');

    if (email == '' || username == '') {
        return notify(THERE_ARE_EMPTY_FIELDS_LEFT);
    } else if (formDataValidator.profileFormContainsInvalidInput(e.currentTarget)) {
        return notify(THERE_ARE_INVALID_FIELDS_LEFT);
    }

    showModal(ARE_YOU_SURE_PROFILE_EDIT, onSelect);

    async function onSelect(choice) {
        if (choice) {
            showPasswordModal(onInput);

            async function onInput() {
                const editedProfile = {
                    username: username,
                    email: email,
                    avatarUrl: avatar,
                    coverPhotoUrl: coverImage,
                    password: modalPassword
                }
    
                formData.append('profileImageFile', avatarUpload);
                formData.append('coverImageFile', coverUpload);
                formData.append('data', JSON.stringify(editedProfile));
    
                showLoadingSpinner(e.target);
                
                const response = await update(getCurrentUser(), formData);
                const data = await response.json();

                if (response.ok) {
                    handleProfileUpdate(data, ctx);
                } else {
                    await handleProfileUpdateError(response, ctx, formData);
                }
                hideLoadingSpinner();
            }
        }
    }
}

function handleProfileUpdate(data, ctx) {
    saveUserData(data);
    ctx.page.redirect('/my-profile/edit');
    notify(PROFILE_EDIT_SUCCESS);
}

async function handleProfileUpdateError(response, ctx, formData) {
    if (response.status === 401) {
        notify(COULD_NOT_EDIT_USER_WRONG_CREDENTIALS);
        await logout();
        ctx.page.redirect('/login');
    } else if (response.status === 403) {
        await refreshToken();
        const response = await update(getCurrentUser(), formData);
        const data = await response.json();
        handleProfileUpdate(data, ctx);
    } else {
        notify(COULD_NOT_EDIT_USER);
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

async function checkForExistingEmail(e) {
    const emailField = e.target;
    const emailFieldValue = emailField.value;
    const invalidEmailClass = '.invalid-input-text.non-unique-email';

    hideInvalidFieldMessage(emailField, invalidEmailClass);

    if (emailFieldValue.trim() !== '') {
        const data = await otherUserExistsByEmail(emailFieldValue);
        
        if (data.emailExists) {
            cancelValidFieldDecorationAndSetAsInvalid(emailField, invalidEmailClass);
        }
    }
}

async function checkForExistingUsername(e) {
    const usernameField = e.target;
    const usernameFieldValue = usernameField.value;
    const invalidUsernameClass = '.invalid-input-text.non-unique-username';

    hideInvalidFieldMessage(usernameField, invalidUsernameClass);

    if (usernameFieldValue.trim() !== '') {
        const data = await otherUserExistsByUsername(usernameFieldValue);
        
        if (data.usernameExists) {
            cancelValidFieldDecorationAndSetAsInvalid(usernameField, invalidUsernameClass);
        }
    }
}

function cancelValidFieldDecorationAndSetAsInvalid(field, invalidMessageClass) {
    field.classList.remove('valid-input');
    field.parentNode.querySelector('.check-icon').style.display = 'none';
    
    field.classList.add('invalid-input');
    field.parentNode.querySelector('.warning-icon').style.display = 'block';
    field.parentNode.parentNode.querySelector(invalidMessageClass).style.display = 'block';
}

function hideInvalidFieldMessage(field, invalidFieldClass) {
    field.parentNode.parentNode.querySelector(invalidFieldClass).style.display = 'none';
}

function passwordEditHandler(e, ctx) {
    showModal(PASSWORD_EDIT_CONFIRM, onSelect);

    async function onSelect(choice) {
        if (choice) {
            showChangePasswordModal(onInput);

            async function onInput() {
                showLoadingSpinner(e.target);

                const response = await changeUserPassword({ oldPassword, newPassword });
                await response.json();

                if (response.ok) {
                    notify(PASSWORD_EDIT_SUCCESS);
                    await logout();
                    ctx.page.redirect('/login');
                } else {
                    if (response.status === 403) {
                        await refreshToken();
                        const response = await changeUserPassword({ oldPassword, newPassword });
                        await response.json();
                        notify(PASSWORD_EDIT_SUCCESS);
                        await logout();
                        ctx.page.redirect('/login');
                    } else {
                        notify(COULD_NOT_EDIT_USER_WRONG_CREDENTIALS);
                        await logout();
                        ctx.page.redirect('/login');
                    }
                }
            }
        }
    }
}

function settingsEditHandler() {
    console.log(settings);    
}