import {html} from '../../../../node_modules/lit-html/lit-html.js';

export const recipeRowTemplate = ({ id, imageUrl, recipeName, status, ownerId }) => html`
    <tr>
        <td>${id}</td>
        <td>
            <div class="user-table-profile-avatar-container">
                <img 
                    alt="recipe image" 
                    class="user-profile-avatar" 
                    src=${
                        !imageUrl || imageUrl === 'null'
                            ? "../../static/images/food.jpg"
                            : imageUrl
                    } 
                    onerror="this.onerror=null;this.src='../../static/images/food.jpg';" 
                />
            </div>
            ${recipeName}
        </td>
        <td><i class="fa-solid fa-share-from-square"></i></td>
        <td><i class="fa-solid fa-location-arrow"></i></td>
        <td><span class="user-action-edit">${status}</span></td>
        <td>
            <span class="user-status-online">Одобри</span> 
            <span class="user-action-delete">Изтрий</span>
        </td>
    </tr>
`;