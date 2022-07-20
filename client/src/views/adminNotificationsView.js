import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getMyNotifications, markNotificationAsRead } from '../services/notificationService.js';
import { getCurrentUser } from '../services/authenticationService.js';
import { loaderTemplate } from './templates/adminTemplates/adminLoadingTemplate.js';
import { resolvePageStyleArchitecture } from './landingView.js';

const notificationTemplate = (notification, ctx) => html`
    <article 
        id=${notification.id} 
        @click=${(e) => notificationRedirectHandler(e, ctx, notification.locationId)} 
        class="notification-article-admin"
    >
        <header class="notification-article-header-admin">
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
        <main style="margin: 0 10% 0 5%">
            <p class="notification-paragraph"><b>${notification.senderUsername}</b> ${notification.action} в</p>
            <p class="notification-paragraph">${notification.locationName}</p>
            <p class="notification-paragraph">${notification.createdAt.replace('T', ', ').substring(0, 17)}</p>
        </main>
        <i @click=${checkNotificationHandler} class="fa-solid fa-xmark"></i>
    </article>
`;

const myProfileNotificationsTemplate = (notifications) => html`
    <section class="my-profile-section">
        ${notifications.length > 0 ? notifications : html`<h2 class="user-recepies-heading">Нямате нови известия</h2>`}
    </section>
`;

export async function adminPanelNotificationsPage(ctx) {
    render(loaderTemplate(), document.getElementById('admin-root'));

    const notifications = await getMyNotifications(getCurrentUser());

    let notificationResults = notifications.map(notification => notificationTemplate(notification, ctx));

    render(myProfileNotificationsTemplate(notificationResults), document.getElementById('admin-root'));
    
    document.querySelector('.admin-counter').style.display = 'none';
}

async function notificationRedirectHandler(e, ctx, locationId) {
    let notificationContainer = e.currentTarget;
    notificationContainer.style.display = 'none';

    await markNotificationAsRead(notificationContainer.id);

    sessionStorage.setItem('redirect', '');
    sessionStorage.setItem('comment', '');

    ctx.page.redirect(`/details-${locationId}`);

    resolvePageStyleArchitecture();
}

async function checkNotificationHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    let notificationContainer = e.currentTarget.parentNode;
    notificationContainer.style.display = 'none';

    await markNotificationAsRead(notificationContainer.id);
}