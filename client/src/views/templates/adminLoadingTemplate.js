import {html} from '../../../node_modules/lit-html/lit-html.js';

export const loaderTemplate = () => html`
    <div id="admin-loader" class="loader-spinner">
        <img src="../../../static/images/admin-panel-loading.gif" alt="Loading..."/>
    </div>
`;