import { html } from '../../node_modules/lit-html/lit-html.js';
import { THERE_ARE_EMPTY_FIELDS_LEFT, WELCOME } from '../constants/notificationMessages.js';
import { getCurrentUserUsername, login } from '../services/authenticationService.js';
import { formContainsEmptyFields } from '../utils/formDataValidator.js';
import { hideLoadingSpinner, showLoadingSpinner } from '../utils/loadingSpinner.js';
import { notify } from '../utils/notification.js';

const loginTemplate = (ctx) => html`
<section id="login-page" class="login formData">
    <form @submit=${(e)=> loginHandler(e, ctx)} id="login-form" class="login-form" style="position: relative;">
        <fieldset>
            <legend>Форма за вход</legend>
            <p class="invalid-credentials">
                <i class="fa-solid fa-triangle-exclamation"></i> Невалидно потребителско име или парола.
            </p>
            <p class="field">
                <label for="username">Потребителско име</label>
                <span class="input">
                    <i class="fa-solid fa-user"></i>
                    <input type="text" name="username" id="username" placeholder="Username" autocomplete="off">
                </span>
            </p>
            <p class="field">
                <label for="password">Парола</label>
                <span class="input">
                    <i class="fa-solid fa-key"></i>
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Вход">
        </fieldset>
    </form>
</section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(ctx));
}

async function loginHandler(e, ctx) {
    e.preventDefault();

    const loginForm = e.target;
    const formData = new FormData(loginForm);

    if (formContainsEmptyFields(formData)) {
        return notify(THERE_ARE_EMPTY_FIELDS_LEFT);
    }

    const loginData = {
        username: formData.get('username'),
        password: formData.get('password')
    }

    showLoadingSpinner(loginForm);
    hideInvalidCredentialsMessage();

    const loginResponse = await login(loginData);

    if (loginResponse.ok) {
        if (sessionStorage.getItem('redirect') !== null) {
            ctx.page.redirect(`/details-${sessionStorage.getItem('redirect')}`);
        } else {
            ctx.page.redirect('/my-profile');
        }
        notify(WELCOME(getCurrentUserUsername()));
    } else {
        hideLoadingSpinner();
        showInvalidCredentialsMessage();
    }
}

function showInvalidCredentialsMessage() {
    document.querySelector('.invalid-credentials').style.display = 'block';
}

function hideInvalidCredentialsMessage() {
    document.querySelector('.invalid-credentials').style.display = 'none';
}