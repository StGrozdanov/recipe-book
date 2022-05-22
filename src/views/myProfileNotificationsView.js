import { html } from '../../node_modules/lit-html/lit-html.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';

const myProfileNotificationsTemplate = (notifications) => html`
    ${myProfileTemplate()}
    ${notifications ? notifications : html`<h3 style="text-align: center;">Нямате нови известия</h3>`}
`;

export function myProfileNotificationsPage(ctx) {
    const notifications = null;

    ctx.render(myProfileNotificationsTemplate(notifications));
    
    trackActiveLink(ctx);
}