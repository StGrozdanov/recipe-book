import { html, render } from '../../../../node_modules/lit-html/lit-html.js';
import { otherUserExistsByEmail, otherUserExistsByUsername, getUser, updateAsAdmin } from '../../../services/userService.js';
import { notify } from '../../../utils/notification.js';
import { showModal } from '../../../utils/modalDialogue.js';
import * as formDataValidator from '../../../utils/formDataValidator.js';
import { refreshToken } from '../../../services/authenticationService.js';
import { ARE_YOU_SURE_PROFILE_EDIT, PROFILE_EDIT_SUCCESS, THERE_ARE_EMPTY_FIELDS_LEFT, THERE_ARE_INVALID_FIELDS_LEFT } from '../../../constants/notificationMessages.js';
import { COULD_NOT_EDIT_USER } from '../../../constants/errorMessages.js';
import { loaderTemplate } from './adminLoadingTemplate.js';

export const usedEditTemplate = (ctx, { recipesCount, coverPhotoUrl, avatarUrl, username, email }) => html`
    <article class="user-profile-article" style="height: 90%; margin-top: 20px">
        <form @submit=${(e) => editProfileHandler(e, ctx)}
            class="edit-profile-form"
            enctype='multipart/form-data'
            >
            <i @click=${() => goBackHandler(ctx)}
                class="fa-solid fa-address-book"
                style="position: absolute; bottom: 33%; right: 5%; font-size: 160%; cursor: pointer;"
                >
            </i>
            <input name="cover-img" type="text" id="cover-input"
                style="display: none; margin-top: -300px; z-index: 2; position: absolute;" placeholder="Адрес на картинка"
                value=${coverPhotoUrl} autocomplete="off" />
            <div class="element" style="position: absolute; top: 0; display: none;" id="upload-cover">
                <i class="fas fa-file-upload" style="margin: 10px; cursor: pointer; font-size: 175%;" id="cover-button">
                </i>
                <input type="file" name="coverUpload" id="cover-upload" style="display:none;">
            </div>
            <header @click=${pictureChangeHandler} id="user-profile-cover" class="user-profile-header">
                <img class="user-profile-header-picture" style="max-height: 100%" src=${coverPhotoUrl} alt=""
                    onerror="this.onerror=null;this.src='../../static/images/user-profile-header.jpeg';">
            </header>
            <div @click=${pictureChangeHandler} id="user-profile-avatar" class="user-profile-avatar-container">
                <img class="user-profile-avatar" src=${avatarUrl} alt=""
                    onerror="this.onerror=null;this.src='../../static/images/Avatar.png';">
            </div>
            <div class="element" style="position: absolute; top: 24%; display: none;" id="upload-avatar">
                <i class="fas fa-file-upload" style="margin: 10px; cursor: pointer; font-size: 175%;" id="avatar-button">
                </i>
                <input type="file" name="avatarUpload" id="avatar-upload" style="display:none;">
            </div>
            <input name="avatar" type="text" id="avatar-input" style="display: none; margin-top: -10px; z-index: 2"
                placeholder="Адрес на снимка" value=${avatarUrl} autocomplete="off" />
            <main class="user-profile-article-info" style="height: 155px">
                <span class="profile-edit-username-container" style="margin-top: 30px">
                    <i class="fa-solid fa-triangle-exclamation warning-icon profile-warning" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon profile-check" style="display: none;"></i>
                    <input 
                    @input=${formDataValidator.profileEditValidateHandler} 
                    @blur=${(e) => checkForExistingUsername(e, username)}
                    type="text"
                    placeholder="username"
                    name="username"
                    class="user-profile-edit-username"
                    value=${username}
                    autocomplete="off"
                    />
                    <span class="invalid-input-text profile-edit-text" style="display: none;">
                        Потребителското име трябва да е между 3 и 10 символа.
                    </span>
                    <span class="invalid-input-text profile-edit-text non-unique-username" style="display: none;">
                        Потребителското име е заето.
                    </span>
                </span>
                <p>
                    <i class="fa-solid fa-bowl-rice"></i> ${recipesCount} created
                </p>
                <p>
                    <i class="fa-solid fa-envelope"></i>
                    <span class="profile-edit-email-container">
                        <i class="fa-solid fa-triangle-exclamation warning-icon profile-warning second-warning"
                            style="display: none;"></i>
                        <i class="fa-solid fa-square-check check-icon second-check profile-check"
                            style="display: none;"></i>
                        <input 
                        @input=${formDataValidator.profileEditValidateHandler} 
                        @blur=${(e) => checkForExistingEmail(e, email)}
                        type="text"
                        placeholder="email"
                        name="email"
                        value=${email}
                        autocomplete="off"
                        />
                        <span class="invalid-input-text email-edit-msg" style="display: none;">
                            Имейлът е невалиден
                        </span>
                        <span class="invalid-input-text profile-edit-text non-unique-email" style="display: none;">
                            Имейлът е зает
                        </span>
                    </span>
                </p>
            </main>
            <button type="submit" style="position: absolute; bottom: 33%; left: 5%; border: none; cursor: pointer;">
                <i class="fa-solid fa-person-circle-check"
                    style="color: green; font-size: 200%; position: absolute; bottom: 33%;"></i>
            </button>
        </form>
    </article>
`;

export async function userEditPage(ctx) {
    render(loaderTemplate(), document.getElementById('admin-root'));

    const data = await getUser(ctx.params.id);

    const myPublications = usedEditTemplate(ctx, data);

    render(myPublications, document.getElementById('admin-root'));

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
            const editedProfile = {
                username: username,
                email: email,
                avatarUrl: avatar,
                coverPhotoUrl: coverImage,
            }

            formData.append('profileImageFile', avatarUpload);
            formData.append('coverImageFile', coverUpload);
            formData.append('data', JSON.stringify(editedProfile));

            render(loaderTemplate(), document.getElementById('admin-root'));

            const response = await updateAsAdmin(ctx.params.id, formData);

            if (response.ok) {
                ctx.page.redirect('/administrate/users');
                notify(PROFILE_EDIT_SUCCESS);
            } else {
                await handleProfileUpdateError(response, ctx, formData);
            }
        }
    }
}

async function handleProfileUpdateError(response, ctx, formData) {
    if (response.status === 403) {
        await refreshToken();
        const response = await updateAsAdmin(ctx.params.id, formData);
        if (response.ok) {
            ctx.page.redirect('/administrate/users');
            return notify(PROFILE_EDIT_SUCCESS);
        }
        notify(COULD_NOT_EDIT_USER);
    }
    notify(COULD_NOT_EDIT_USER);
}

function addEventListenersToUploadImageIcons() {
    document.getElementById('cover-button').addEventListener('click', () => {
        document.getElementById('cover-upload').click();
    });
    document.getElementById('avatar-button').addEventListener('click', () => {
        document.getElementById('avatar-upload').click();
    });
}

async function checkForExistingEmail(e, currentUserEmail) {
    const emailField = e.target;
    const emailFieldValue = emailField.value;
    const invalidEmailClass = '.invalid-input-text.non-unique-email';

    hideInvalidFieldMessage(emailField, invalidEmailClass);

    if (emailFieldValue.trim() !== '') {
        const data = await otherUserExistsByEmail(emailFieldValue, currentUserEmail);

        if (data.emailExists) {
            cancelValidFieldDecorationAndSetAsInvalid(emailField, invalidEmailClass);
        }
    }
}

async function checkForExistingUsername(e, currentUserUsername) {
    const usernameField = e.target;
    const usernameFieldValue = usernameField.value;
    const invalidUsernameClass = '.invalid-input-text.non-unique-username';

    hideInvalidFieldMessage(usernameField, invalidUsernameClass);

    if (usernameFieldValue.trim() !== '') {
        const data = await otherUserExistsByUsername(usernameFieldValue, currentUserUsername);

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

function goBackHandler(ctx) {
    ctx.page.redirect('/administrate/users');
}