const container = document.createElement('div');
container.id = 'notification';
const list = document.createElement('ul');
list.addEventListener('click', onClick);
container.appendChild(list);

document.body.appendChild(container);

export function notify(message, redirect) {
    const liItem = document.createElement('li');
    liItem.className = 'notification';
    const btn = document.createElement('span');
    btn.textContent = '\u2716'
    btn.style = 'padding-left: 20px;';
    btn.addEventListener('click', (e) => { e.target.parentNode.remove() });
    liItem.textContent = message;
    liItem.appendChild(btn);
    
    if (redirect) {
        liItem.addEventListener('click', (e) => redirectHandler(e, redirect))
        list.appendChild(liItem);
    } else {
        list.appendChild(liItem);
        setTimeout(() => liItem.remove(), 4500);
    }

}

function onClick(event) {
    if (event.target.tagName == 'LI') {
        event.target.remove();
    }
}

function redirectHandler(e, redirect) {
    if (e.target.tagName == 'LI') {

        const notifications = document.querySelectorAll('.notification');

        for (const notification of notifications) {
            notification.remove();
        }
        redirect.ctx.page.redirect(`/${redirect.location}`);
        sessionStorage.setItem('redirect', redirect.ctx.params.id);
    }
}