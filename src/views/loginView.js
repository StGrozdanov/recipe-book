import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/registryService.js';
import { notify } from '../utils/notification.js';

const loginTemplate = (ctx) => html`
<section id="login-page" class="login formData">
    <form id="login-form" action="" method="">
        <fieldset>
            <legend>Форма за вход</legend>
            <p class="field">
                <label for="username">Потребителско име</label>
                <span class="input">
                    <i class="fa-solid fa-user"></i>
                    <input type="text" name="username" id="username" placeholder="Username">
                </span>
            </p>
            <p class="field">
                <label for="password">Парола</label>
                <span class="input">
                    <i class="fa-solid fa-key"></i>
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input @click=${(e) => loginHandler(e, ctx)} class="button submit" type="submit" value="Вход">
        </fieldset>
    </form>
</section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(ctx));
}

async function loginHandler(e, ctx) {
    e.preventDefault();

    const form = new FormData(document.getElementById('login-form'));
    const username = form.get('username');
    const password = form.get('password');

    if (username != '' && password != '') {
        await login(username, password);
        
        if (sessionStorage.getItem('redirect') !== null) {
            ctx.page.redirect(`/details/${sessionStorage.getItem('redirect')}`);
            sessionStorage.removeItem('redirect');
        } else {
            ctx.page.redirect('/');
        }
        notify(`Добре дошли, ${sessionStorage.getItem('username')}! Приятно прекарване!`)
        const navigationHomeButton = document.querySelector('#catalogLink');
        navigationHomeButton.classList.add('active');
    } else {
        return notify('All fields are required!');
    }
}