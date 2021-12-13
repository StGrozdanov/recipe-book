const container = document.createElement('div');
container.id = 'notification';
const list = document.createElement('ul');
list.addEventListener('click', onClick);
container.appendChild(list);

document.body.appendChild(container);

export function notify(message, redirect) {
    const liItem = document.createElement('li');
    liItem.className = 'notification';

    if (redirect) {
        liItem.textContent = message;
        liItem.addEventListener('click', () => redirectHandler(redirect))
        list.appendChild(liItem);
    } else {
        liItem.textContent = message + ' \u2716';
        list.appendChild(liItem);
        setTimeout(() => liItem.remove(), 5000);
    }

}

function onClick(event) {
    if (event.target.tagName == 'LI') {
        event.target.remove();
    }
}

function redirectHandler(redirect) {
    const notifications = document.querySelectorAll('.notification');

    for (const notification of notifications) {
        notification.remove();
    }
    redirect.ctx.page.redirect(`/${redirect.location}`);
    sessionStorage.setItem('redirect', redirect.ctx.params.id);
}