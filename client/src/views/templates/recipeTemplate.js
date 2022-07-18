import { html } from "../../../node_modules/lit-html/lit-html.js";

export const recipeTemplate = (data) => html`
        <li class="recipe-card">
            <a href='/details-${data.id}'>
                <h3 style="color: #c28a44;" class="recipe-name">${data.recipeName}</h3>
                <p class="img">
                    <img 
                        src=${data.imageUrl} 
                        alt="" 
                        onerror="this.onerror=null;this.src='../../../static/images/food.jpg';"
                    >
                </p>
            </a>
        </li>
`;