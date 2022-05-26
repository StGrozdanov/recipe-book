import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/userService.js'
import { notify } from '../utils/notification.js';
import * as formDataValidator from '../utils/formDataValidator.js'

const registerTemplate = (context) => html`
<section id="register-page" class="register formData">
    <form @submit=${(e)=> registerHandler(e, context)} id="register-form" action="" method="">
        <fieldset>
            <legend>Регистрация</legend>
            <p class="field">
                <label for="email">Имейл</label>
                <span class="input">
                    <i class="fa-solid fa-envelope"></i>
                    <input 
                    @input=${formDataValidator.inputValidateHandler} 
                    type="text" 
                    name="email" 
                    id="email" 
                    placeholder="Email"
                    autocomplete="off"
                    >
                    <i class="fa-solid fa-triangle-exclamation warning-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">Имейлът ви е невалиден</span>
            </p>
            <p class="field">
                <label for="username">Потребителско име</label>
                <span class="input">
                    <i class="fa-solid fa-user"></i>
                    <input @input=${formDataValidator.inputValidateHandler} type="text" name="username" id="username"
                        placeholder="Username" autocomplete="off">
                    <i class="fa-solid fa-triangle-exclamation warning-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">
                    Потребителското ви име трябва да е между 3 и 10 символа
                </span>
            </p>
            <p class="field">
                <label for="password">Парола</label>
                <span class="input">
                    <i class="fa-solid fa-key"></i>
                    <input @input=${formDataValidator.inputValidateHandler} type="password" name="password" id="password"
                        placeholder="Password">
                    <i class="fa-solid fa-triangle-exclamation warning-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon" style="display: none;"></i>
                </span>
                <span class="invalid-input-text" style="display: none;">
                    Минималната дължина на паролата е 4 символа
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Повтори паролата</label>
                <span class="input">
                    <i class="fa-solid fa-repeat"></i>
                    <input @input=${formDataValidator.inputValidateHandler} type="password" name="confirm-pass" id="repeat-pass"
                        placeholder="Repeat Password">
                    <i class="fa-solid fa-triangle-exclamation warning-icon" style="display: none;"></i>
                    <i class="fa-solid fa-square-check check-icon" style="display: none;"></i>
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
        return notify('Всички полета са задължителни.');
    } else if (formDataValidator.formContainsInvalidInput(registerForm)) {
        return notify('Поправете невалидните полета.');
    }

    await register(Object.fromEntries(formData));

    if (sessionStorage.getItem('redirect') !== null) {
        context.page.redirect(`/details-${sessionStorage.getItem('redirect')}`);
    } else {
        context.page.redirect('/my-profile');
    }
    notify('Регистрирахте се успешно!');
}