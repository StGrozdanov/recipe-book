import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/authenticationService.js'
import { notify } from '../utils/notification.js';
import * as formDataValidator from '../utils/formDataValidator.js'
import { hideLoadingSpinner, showLoadingSpinner } from '../utils/loadingSpinner.js';
import { REGISTRATION_FAIL, REGISTRATION_SUCCESS, THERE_ARE_EMPTY_FIELDS_LEFT, THERE_ARE_INVALID_FIELDS_LEFT } from '../constants/notificationMessages.js';
import { userExistsByEmail, userExistsByUsername } from '../services/userService.js';

const registerTemplate = (context) => html`
<section id="register-page" class="register formData">
    <form @submit=${(e) => registerHandler(e, context)} id="register-form" style="position: relative;">
        <fieldset>
            <legend>Регистрация</legend>
            <p class="field">
                <label for="email">Имейл</label>
                <span class="input">
                    <i class="fa-solid fa-envelope"></i>
                    <input 
                        @input=${formDataValidator.inputValidateHandler} 
                        @blur=${checkForExistingEmail}
                        type="text" 
                        name="email" 
                        id="email"
                        placeholder="Email" 
                        autocomplete="off"
                    >
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">Имейлът трябва да е валиден</span>
                <span class="invalid-input-text non-unique-email" style="display: none;">
                    Вече съществува потребител със зададения имейл.
                </span>
            </p>
            <p class="field">
                <label for="username">Потребителско име</label>
                <span class="input">
                    <i class="fa-solid fa-user"></i>
                    <input 
                        @input=${formDataValidator.inputValidateHandler} 
                        @blur=${checkForExistingUsername}
                        type="text" 
                        name="username" 
                        id="username"
                        placeholder="Username" 
                        autocomplete="off"
                    >
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">
                    Потребителското ви име трябва да е между 3 и 10 символа
                </span>
                <span class="invalid-input-text non-unique-username" style="display: none;">
                    Потребителското име е заето, моля въведете друго.
                </span>
            </p>
            <p class="field">
                <label for="password">Парола</label>
                <span class="input">
                    <i class="fa-solid fa-key"></i>
                    <input 
                        @input=${formDataValidator.inputValidateHandler}
                        @blur=${fireRepeatPassEvent}
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password"
                    >
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
                    <input 
                        @input=${formDataValidator.inputValidateHandler} 
                        type="password" 
                        name="confirm-pass"
                        id="repeat-pass" 
                        placeholder="Repeat Password"
                    >
                    <i class="fa-solid fa-triangle-exclamation warning-icon validate-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon validate-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">Паролите ви не съвпадат</span>
            </p>
            <input class="button submit" type="submit" value="Регистрирай">
        </fieldset>
    </form>
</section>
`;

export function registerPage(context) {
    context.render(registerTemplate(context));
}

async function registerHandler(e, context) {
    e.preventDefault();

    const registerForm = e.target;
    const formData = new FormData(registerForm);

    if (formDataValidator.formContainsEmptyFields(formData)) {
        return notify(THERE_ARE_EMPTY_FIELDS_LEFT);
    } else if (formDataValidator.formContainsInvalidInput(registerForm)) {
        return notify(THERE_ARE_INVALID_FIELDS_LEFT);
    }

    const registerData = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        repeatPassword: formData.get('confirm-pass')
    }

    showLoadingSpinner(registerForm);

    const registerResponse = await register(registerData);

    if (registerResponse.ok) {
        if (sessionStorage.getItem('redirect') !== null) {
            context.page.redirect(`/details-${sessionStorage.getItem('redirect')}`);
        } else {
            context.page.redirect('/my-profile');
        }
        notify(REGISTRATION_SUCCESS);
    } else {
        notify(REGISTRATION_FAIL);
        hideLoadingSpinner();
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

async function checkForExistingEmail(e) {
    const emailField = e.target;
    const emailFieldValue = emailField.value;
    const invalidEmailClass = '.invalid-input-text.non-unique-email';

    hideInvalidFieldMessage(emailField, invalidEmailClass);

    if (emailFieldValue.trim() !== '') {
        const data = await userExistsByEmail(emailFieldValue);
        
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
        const data = await userExistsByUsername(usernameFieldValue);
        
        if (data.usernameExists) {
            cancelValidFieldDecorationAndSetAsInvalid(usernameField, invalidUsernameClass);
        }
    }
}

function cancelValidFieldDecorationAndSetAsInvalid(field, invalidMessageClass) {
    field.parentNode.classList.remove('valid-input');
    field.parentNode.querySelector('.check-icon').style.display = 'none';
    
    field.parentNode.classList.add('invalid-input');
    field.parentNode.querySelector('.warning-icon').style.display = 'block';
    field.parentNode.parentNode.querySelector(invalidMessageClass).style.display = 'block';
}

function hideInvalidFieldMessage(field, invalidFieldClass) {
    field.parentNode.parentNode.querySelector(invalidFieldClass).style.display = 'none';
}