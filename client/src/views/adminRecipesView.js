import { html, render } from "../../node_modules/lit-html/lit-html.js";

const applicationRecipesTemplate = () => html`
<div class="wrapper-table-wrapper">
<div class="table-wrapper">
     <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Owner</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>2</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>3</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-status-online">Approved</span></td>
                <td><span class="user-action-edit">Pending</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>4</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Болонезе
                </td>
                <td><i class="fa-solid fa-share-from-square"></i></td>
                <td><i class="fa-solid fa-location-arrow"></i></td>
                <td><span class="user-action-edit">Pending</span></td>
                <td><span class="user-status-online">Approve</span> <span class="user-action-delete">Remove</span></td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
`;

export async function adminPanelRecipesPage() {
    render(applicationRecipesTemplate(), document.getElementById('admin-root'));
}