import { render, html } from '../../node_modules/lit-html/lit-html.js';

const dynamicLoadingTemplate = () => html`
    <div id="loading-content" style="position: absolute; width: 100px; top: 50%; left: 50%; transform: translate(-50%, -50%)">
        <img src="../../../static/images/loading-spinner.gif" alt="Loading..." style="width: 100%"/>
    </div>
`;

export function showLoadingSpinner(element) {
    render(dynamicLoadingTemplate(), element);
    document.getElementById('loading-content').style.display = 'block';
}

export function hideLoadingSpinner() {
    document.getElementById('loading-content').style.display = 'none';
}