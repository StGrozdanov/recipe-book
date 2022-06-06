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

    next();
}

function resetBaseStyleArchitecture() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('body').style.width = '100%';
    document.querySelector('footer').style.display = 'none';
}