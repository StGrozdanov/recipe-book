import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPublicationsCount } from '../services/recipeService.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { userProfileTemplate } from './templates/profileTemplates/userProfileTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { getCurrentUser } from '../services/authenticationService.js';
import { getMyNotifications } from '../services/notificationService.js'

const myPublicationsTemplate = (recepiesCount, ctx) => html`
    <section class="my-profile-section">
        ${myProfileTemplate(ctx)}
        ${userProfileTemplate(sessionStorage, recepiesCount)}
    </section>
`;

export async function myProfilePage(ctx) {
    ctx.render(loaderTemplate());
    const createdRecepies = getMyPublicationsCount(getCurrentUser());
    let myNotifications = getMyNotifications(getCurrentUser());

    const [myRecepies, userNotifications] = await Promise.all([createdRecepies, myNotifications]);

    const myPublications = myPublicationsTemplate(myRecepies.recipesCount, ctx);

    ctx.render(myPublications);

    trackActiveLink(ctx);

    let notificationCounterContainer = document.getElementById('myProfileNavNotificationCounter')
    notificationCounterContainer.textContent = userNotifications.length;

    if (userNotifications.length > 0) {
        notificationCounterContainer.style.display = 'inline-block';
    }
}