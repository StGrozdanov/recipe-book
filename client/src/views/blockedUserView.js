import { html, render } from '../../node_modules/lit-html/lit-html.js';

const blockedUserTemplate = () => html`
    <div class="div-404" style="position: relative;">
        <h1 class="blocked-user-heading">Нямате достъп до уебсайта!</h1>
        <h3 class="blocked-user-reason-heading">Причина:</h3>
        <img class="picture-404" src="../static/images/blocked.jpg" alt="ERROR" />
        <div class="blocked-user-reason">
            <h4 style="text-align: center;">Голям сте тъпанар..</h4>
        </div>
    </div>
`;

const mainRootElement = document.querySelector('.container');

export function blockedUserPage(ctx) {
    render(blockedUserTemplate(), mainRootElement);
}