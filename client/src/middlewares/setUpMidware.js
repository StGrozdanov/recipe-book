import { render } from '../../node_modules/lit-html/lit-html.js';
import { socket } from '../services/socketioService.js';
import { getCurrentUser } from '../services/userService.js';
import { renderNavigation } from "../views/navigationView.js";

export const mainRootElement = document.querySelector('.container');

socket.on('receiveNotification', data => {
    let notificationIcon = document.getElementById('myProfileLinkNotificationIcon');
    notificationIcon.style.display = 'inline-block';

    let notificationCounterContainer = document.getElementById('myProfileNavNotificationCounter')
    notificationCounterContainer.style.display = 'inline-block';
    let counterValue = Number(notificationCounterContainer.textContent);
    let newCounterValue = counterValue + 1;
    notificationCounterContainer.textContent = newCounterValue;
});

export function setUp(ctx, next) {
    renderNavigation(ctx);
    ctx.render = (content) => render(content, mainRootElement);

    const currentUser = getCurrentUser();
    currentUser ? socket.emit("newUser", currentUser) : '';

    next();
}