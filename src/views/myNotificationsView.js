import { html } from '../../node_modules/lit-html/lit-html.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';

const myProfileNotificationsTemplate = (notifications) => html`
    ${myProfileTemplate()}
    ${notifications ? notifications : html`<h2 class="user-recepies-heading">Нямате нови известия</h2>`}
`;

export function myProfileNotificationsPage(ctx) {
    ctx.render(loaderTemplate());
    const notifications = null;

    ctx.render(myProfileNotificationsTemplate(notifications));
    
    trackActiveLink(ctx);
}