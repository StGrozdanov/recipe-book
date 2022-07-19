import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getAllRecipesAdmin } from "../services/recipeService.js";
import { showModal } from "../utils/modalDialogue.js";
import { loaderTemplate } from "./templates/adminTemplates/adminLoadingTemplate.js";
import { adminPaginationTemplate } from "./templates/adminTemplates/adminPaginationTemplate.js";
import { recipeRowTemplate } from "./templates/adminTemplates/adminTableRecipeRowTemplate.js";

const applicationRecipesTemplate = (recipes, data) => html`
<div class="wrapper-table-wrapper">
<div class="table-wrapper">
     <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Име</th>
                <th>Собственик</th>
                <th>Локация</th>
                <th>Статус</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            ${recipes}
        </tbody>
    </table>
    </div>
    </div>
    ${adminPaginationTemplate(data)}
`;

export async function adminPanelRecipesPage(ctx) {
    render(loaderTemplate(), document.getElementById('admin-root'));

    const currentPage = Number(ctx.querystring.split('=')[1] || 1);

    let data = await getAllRecipesAdmin(currentPage);

    const recipes = data.content.map(data => recipeRowTemplate(data, ctx));
    
    render(applicationRecipesTemplate(recipes, data), document.getElementById('admin-root'));
}