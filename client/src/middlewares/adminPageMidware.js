import { render } from '../../node_modules/lit-html/lit-html.js';
import { adminPanelTemplate } from '../views/templates/adminPageTemplate.js';
import { mainRootElement } from './setUpMidware.js';

const timeParts = {
    "Добро утро": [3, 4, 5, 6, 7, 8, 9, 10, 11],
    "Добър ден": [12, 13, 14, 15, 16, 17, 18],
    "Добър вечер": [19, 20, 21, 22, 23, 0, 1, 2]
}

export function adminSetUp(ctx, next) {
    resetBaseStyleArchitecture();

    const currentHour = new Date(Date.now()).getHours();

    let greeting;

    Object.entries(timeParts).forEach(timePart => {
        const timePartKey = timePart[0];
        const timePartValues = timePart[1];

        if (timePartValues.some(hour => hour === currentHour)) {
            greeting = timePartKey;
            return;
        }
    });

    const username = sessionStorage.getItem('username');
    const avatar = sessionStorage.getItem('avatar');

    const adminTemplate = adminPanelTemplate(greeting, username, avatar);

    render(adminTemplate, mainRootElement);

    trackActiveNavLink(ctx);
    trackPageNaming(ctx);

    next();
}

function resetBaseStyleArchitecture() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('body').style.width = '100%';
    document.querySelector('footer').style.display = 'none';
}

function trackActiveNavLink(ctx) {
    const currentPage = ctx.path;
    const navLinks = document.querySelectorAll('.nav-icon');

    navLinks.forEach(navLink => navLink.classList.remove('admin-icon-selected'));

    const activeLink = Array.from(navLinks).find(navLink => '/' + navLink.classList[0] === currentPage);
    
    if (activeLink !== undefined) {
        activeLink.classList.add('admin-icon-selected');
    } else {
        navLinks[0].classList.add('admin-icon-selected');
    }
}

function trackPageNaming(ctx) {
    const currentPagePath = ctx.path;
    const currentPageNaming = currentPagePath.split('/')[2];

    const pageMessages = {
        'dashboard': 'Статистически данни за сайта',
        'users': 'Потребители на сайта',
        'recipes': 'Колекция от рецепти',
        'comments': 'Колекция от коментари',
        'settings': 'Потребителски настройки',
    }

    const message = pageMessages[currentPageNaming];

    document.querySelector('#page-message').textContent = message;
}