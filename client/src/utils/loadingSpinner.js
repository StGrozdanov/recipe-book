import { render } from '../../node_modules/lit-html/lit-html.js';
import { dynamicLoadingTemplate } from '../views/templates/commentTemplate.js';

export function showLoadingSpinner(element) {
    render(dynamicLoadingTemplate(), element);
    document.getElementById('loading-comments').style.display = 'block';
}

export function hideLoadingSpinner() {
    document.getElementById('loading-comments').style.display = 'none';
}