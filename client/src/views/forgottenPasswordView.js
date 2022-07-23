import { html } from '../../node_modules/lit-html/lit-html.js';
import { requestPasswordReset, resetPassword } from '../services/authenticationService.js'
import { notify } from '../utils/notification.js';
import * as formDataValidator from '../utils/formDataValidator.js'
import { hideLoadingSpinner, showLoadingSpinner } from '../utils/loadingSpinner.js';
import { INVALID_PASSWORD_CHANGE_LINK, PASSWORD_EDIT_SUCCESS, THERE_ARE_EMPTY_FIELDS_LEFT, THERE_ARE_INVALID_FIELDS_LEFT } from '../constants/notificationMessages.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { COULD_NOT_EDIT_USER } from '../constants/errorMessages.js';

const forgottenPasswordTemplate = (context) => html`
<section id="register-page" class="register formData">
    <form @submit=${(e) => changePasswordHandler(e, context)} id="register-form" style="position: relative;">
        <fieldset>
            <p class="field">
                <legend>Смяна на парола</legend>
                <label for="password">Нова парола</label>
                <span class="input">
                    <i class="fa-solid fa-key"></i>
                    <input @input=${formDataValidator.inputValidateHandler} @blur=${fireRepeatPassEvent} type="password"
                        name="password" id="password" placeholder="Password">
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">
                    Минималната дължина на паролата е 4 символа
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Повтори паролата</label>
                <span class="input">
                    <i class="fa-solid fa-repeat"></i>
                    <input @input=${formDataValidator.inputValidateHandler} type="password" name="confirm-pass"
                        id="repeat-pass" placeholder="Repeat Password">
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">Паролите ви не съвпадат</span>
            </p>
            <input class="button submit" type="submit" value="Потвърди">
        </fieldset>
    </form>
</section>
`;

export async function forgottenPasswordPage(context) {
    context.render(loaderTemplate);

    const response = await requestPasswordReset(context.params.id);

    if (response.ok) {
        context.render(forgottenPasswordTemplate(context));
    } else {
        context.page.redirect('/login');
        notify(INVALID_PASSWORD_CHANGE_LINK);
    }
}

async function changePasswordHandler(e, context) {
    e.preventDefault();

    const changePasswordForm = e.target;
    const formData = new FormData(changePasswordForm);

    if (formDataValidator.formContainsEmptyFields(formData)) {
        return notify(THERE_ARE_EMPTY_FIELDS_LEFT);
    } else if (formDataValidator.formContainsInvalidInput(changePasswordForm)) {
        return notify(THERE_ARE_INVALID_FIELDS_LEFT);
    }

    const changePasswordData = {
        password: formData.get('password'),
        repeatPassword: formData.get('confirm-pass')
    }

    showLoadingSpinner(changePasswordForm);

    const response = await resetPassword(context.params.id, changePasswordData);

    hideLoadingSpinner();

    context.page.redirect('/login');

    if (response.ok) {
        notify(PASSWORD_EDIT_SUCCESS);
    } else {
        notify(COULD_NOT_EDIT_USER);
    }
}

function fireRepeatPassEvent(e) {
    const passwordField = e.target;
    const repeatPasswordField = document.getElementById('repeat-pass');
    const invalidMessageClass = '.invalid-input-text';

    if (passwordField.value !== repeatPasswordField.value) {
        cancelValidFieldDecorationAndSetAsInvalid(repeatPasswordField, invalidMessageClass);
    }
}

function cancelValidFieldDecorationAndSetAsInvalid(field, invalidMessageClass) {
    field.parentNode.classList.remove('valid-input');
    field.parentNode.querySelector('.check-icon').style.display = 'none';

    field.parentNode.classList.add('invalid-input');
    field.parentNode.querySelector('.warning-icon').style.display = 'block';
    field.parentNode.parentNode.querySelector(invalidMessageClass).style.display = 'block';
}