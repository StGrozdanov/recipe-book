renderNotification();

export function notify(message, redirect) {
    const singleNotification = document.createElement('li');
    singleNotification.className = 'notification';

    const notificationButton = document.createElement('span');
    notificationButton.textContent = '\u2716'
    notificationButton.style = 'padding-left: 20px;';
    notificationButton.addEventListener('click', (e) => { e.target.parentNode.remove() });

    singleNotification.textContent = message;
    singleNotification.appendChild(notificationButton);

    const notificationsContainer = document.querySelector('#notification ul'); 

    if (redirect) {
        singleNotification.addEventListener('click', (e) => redirectHandler(e, redirect))
        notificationsContainer.appendChild(singleNotification);
    } else {
        notificationsContainer.appendChild(singleNotification);
        setTimeout(() => singleNotification.remove(), 4500);
    }
}

async function redirectHandler(e, redirect) {
    if (e.target.tagName == 'LI') {
        const notifications = document.querySelectorAll('.notification');

        for (const notification of notifications) {
            notification.remove();
        }        
        redirect.ctx.page.redirect(`/${redirect.location}`);

        sessionStorage.setItem('redirect', redirect.ctx.params.id);
        sessionStorage.setItem('comment', redirect.comment);
    }
}

function renderNotification() {
    const notification = document.createElement('div');
    notification.id = 'notification';

    const notificationsContainer = document.createElement('ul');
    notificationsContainer.addEventListener('click', onClick);

    notification.appendChild(notificationsContainer);
    document.body.appendChild(notification);
}

function onClick(event) {
    if (event.target.tagName == 'LI') {
        event.target.remove();
    }
}