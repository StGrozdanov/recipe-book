import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../io/registry.js'

const registerTemplate = (context) => html`
<section id="register-page" class="register formData">
    <form id="register-form" action="" method="">
        <fieldset>
            <legend>Регистрация</legend>
            <p class="field">
                <label for="email">Имейл</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="username">Потребителско име</label>
                <span class="input">
                    <input type="text" name="username" id="username" placeholder="Username">
                </span>
            </p>
            <p class="field">
                <label for="password">Парола</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Повтори паролата</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input @click=${(e) => registerHandler(e, context)} class="button submit" type="submit" value="Регистрирай">
        </fieldset>
    </form>
</section>
`;

export function registerPage(context) {
    context.render(registerTemplate(context));
}

async function registerHandler(e, context) {
    e.preventDefault();

    const form = new FormData(document.getElementById('register-form'));
    const username = form.get('username');
    const email = form.get('email');
    const password = form.get('password');
    const rePassword = form.get('confirm-pass');

    if (email == '' || password == '' || rePassword == '' || username == '') {
        return alert('All fields are required!');
    } else if (password !== rePassword) {
        return alert('Passwords don\'t match!')
    }
    await register(username, email, password);
    context.page.redirect('/');
    const navigationHomeButton = document.querySelector('#catalogLink');
    navigationHomeButton.classList.add('active');
}