import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/authenticationService.js';
import { formContainsEmptyFields } from '../utils/formDataValidator.js';
import { notify } from '../utils/notification.js';
import { commentLoadingTemplate } from './templates/commentTemplate.js'

const loginTemplate = (ctx) => html`
<section id="login-page" class="login formData">
    <form @submit=${(e)=> loginHandler(e, ctx)} id="login-form" action="" method="" class="login-form">
        <fieldset>
            <legend>Форма за вход</legend>
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
        return notify('Всички полета са задължителни!');
    }

    const loginData = {
        username: formData.get('username'),
        password: formData.get('password')
    }

    showLoadingSpinner(loginForm);

    const loginResponse = await login(loginData);

    if (loginResponse.ok) {
        if (sessionStorage.getItem('redirect') !== null) {
            ctx.page.redirect(`/details-${sessionStorage.getItem('redirect')}`);
        } else {
            ctx.page.redirect('/my-profile');
        }
        notify(`Добре дошли, ${sessionStorage.getItem('username')}! Приятно прекарване!`);
    } else {
        const loginResponseData = await loginResponse.json();
        notify(loginResponseData.message);
        hideLoadingSpinner();
    }


}

function showLoadingSpinner(element) {
    render(commentLoadingTemplate(), element);
    document.getElementById('loading-comments').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loading-comments').style.display = 'none';
}