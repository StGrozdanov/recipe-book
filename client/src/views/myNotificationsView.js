import { html } from '../../node_modules/lit-html/lit-html.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { getMyNotifications, markNotificationAsRead } from '../services/notificationService.js';
import { getCurrentUser } from '../services/authenticationService.js';
import { notify } from '../utils/notification.js';
import { MARKED_AS_READ } from '../constants/notificationMessages.js';

const notificationTemplate = (notification, ctx) => html`
    <article 
        id=${notification.id} 
        @click=${(e) => notificationRedirectHandler(e, ctx, notification.locationId)} 
        class="notification-article"
    >
        <header class="notification-article-header">
            <img 
                class="notification-article-header-image" 
                src=${
                    !notification.senderAvatar || notification.senderAvatar == 'null'
                        ? "../static/images/Avatar.png"
                        : notification.senderAvatar
                } 
                alt="" 
                onerror="this.onerror=null;this.src='../static/images/Avatar.png';" 
            />
        </header>
        <main>
            <p><b>${notification.senderUsername}</b> ${notification.action} в</p>
            <p>${notification.locationName}</p>
            <p>${notification.createdAt.replace('T', ', ').substring(0, 17)}</p>
        </main>
        <i @click=${checkNotificationHandler} class="fa-solid fa-xmark"></i>
    </article>
`;

const myProfileNotificationsTemplate = (notifications, ctx) => html`
    <section class="my-profile-section">
        ${myProfileTemplate(ctx)}
        ${notifications.length > 0 ? notifications : html`<h2 class="user-recepies-heading">Нямате нови известия</h2>`}
    </section>
`;

export async function myProfileNotificationsPage(ctx) {
    ctx.render(loaderTemplate());

    const notifications = await getMyNotifications(getCurrentUser());
    
    let notificationResults = notifications.map(notification => notificationTemplate(notification, ctx));

    ctx.render(myProfileNotificationsTemplate(notificationResults, ctx));

    trackActiveLink(ctx);
}

async function notificationRedirectHandler(e, ctx, locationId) {
    let notificationContainer = e.currentTarget;
    notificationContainer.style.display = 'none';

    await markNotificationAsRead(notificationContainer.id);

    sessionStorage.setItem('redirect', '');
    sessionStorage.setItem('comment', '');

    ctx.page.redirect(`/details-${locationId}`);
}

async function checkNotificationHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    let notificationContainer = e.currentTarget.parentNode;
    notificationContainer.style.display = 'none';

    await markNotificationAsRead(notificationContainer.id);

    notify(MARKED_AS_READ);
}