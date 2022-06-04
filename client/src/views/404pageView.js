import { html, render } from '../../node_modules/lit-html/lit-html.js';

const template404 = (ctx) => html`
    <div class="div-404">
        <h1 class="message-404">Попаднахте в космоса!</h1>
        <h2 class="back-to-earth-404">Обратно към земята -></h2>
        <div @click=${() => backToEarthHandler(ctx)} class="earth-container-404">
            <img class="earth-404" src="../static/images/BackToEarth.gif" alt="back-to-earth" />
        </div>
        <img class="picture-404" src="../static/images/404.jpg" alt="ERROR" />
    </div>
`;

const mainRootElement = document.querySelector('.container');

export function page404(ctx) {
    render(template404(ctx), mainRootElement);
}

function backToEarthHandler(ctx) {
    ctx.page.redirect('/catalogue');
}