import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublicationsCount } from '../services/recipeService.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { userProfileTemplate } from './templates/profileTemplates/userProfileTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { getCurrentUser } from '../services/userService.js';
import { userNotifications } from './navigationView.js';
import { socket } from '../services/socketioService.js';

const myPublicationsTemplate = (recepiesCount) => html`
    <section class="my-profile-section">
        ${myProfileTemplate()}
        ${userProfileTemplate(sessionStorage, recepiesCount)}
    </section>
`;

export async function myProfilePage(ctx) {
    ctx.render(loaderTemplate());
    const myRecepies = await getMyPublicationsCount(getCurrentUser());

    const myPublications = myPublicationsTemplate(myRecepies.count);

    ctx.render(myPublications);

    trackActiveLink(ctx);

    let notificationCounterContainer = document.getElementById('myProfileNavNotificationCounter')
    notificationCounterContainer.textContent = userNotifications.length;

    if (userNotifications.length > 0) {
        notificationCounterContainer.style.display = 'inline-block';
    }

    socket.on('receiveNotification', data => {
        let notificationIcon = document.getElementById('myProfileLinkNotificationIcon');
        notificationIcon.style.display = 'inline-block';

        notificationCounterContainer.style.display = 'inline-block';
        const counterValue = Number(notificationCounterContainer.textContent);
        const newCounterValue = counterValue + 1;
        notificationCounterContainer.textContent = newCounterValue;
    });
}

