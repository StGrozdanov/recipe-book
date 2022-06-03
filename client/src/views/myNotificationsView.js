import { html } from '../../node_modules/lit-html/lit-html.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { userNotifications } from './navigationView.js';

const notificationTemplate = (notification, ctx) => html`
    <article @click=${() => notificationRedirectHandler(ctx, notification.locationId)} class="notification-article">
        <header class="notification-article-header">
            <img class="notification-article-header-image" src=${notification.senderAvatar} alt="broken-avatar" />
        </header>
        <main>
            <p><b>${notification.senderName}</b> публикува нов ${notification.action} в</p>
            <p>${notification.locationName}</p>
            <p>${notification.createdAt}</p>
        </main>
    </article>
`;

const myProfileNotificationsTemplate = (notifications) => html`
    <section class="my-profile-section">
        ${myProfileTemplate()}
        ${notifications.length > 0 ? notifications : html`<h2 class="user-recepies-heading">Нямате нови известия</h2>`}
    </section>
`;

export function myProfileNotificationsPage(ctx) {
    ctx.render(loaderTemplate());

    const notifications = userNotifications.results.map(notification => notificationTemplate(notification, ctx));

    ctx.render(myProfileNotificationsTemplate(notifications));

    trackActiveLink(ctx);
}

function notificationRedirectHandler(ctx, locationId) {
    sessionStorage.setItem('redirect', '');
    sessionStorage.setItem('comment', '');

    ctx.page.redirect(`/details-${locationId}`);
}