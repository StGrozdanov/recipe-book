import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { loaderTemplate } from "./templates/adminTemplates/adminLoadingTemplate.js";

const applicationUsersSettingsTemplate = () => html`
<div class="wrapper-table-wrapper">
<div class="table-wrapper">
     <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>User</th>
                <th>Email</th>
                <th>User Role</th>
                <th>Change Role</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Peter
                </td>
                <td>peter@abv.bg</td>
                <td>Moderator</td>
                <td><span class="user-possible-status">User</span> <span class="user-current-status">Moderator</span> <span class="user-possible-status">Administrator</span></td>
            </tr>
            <tr>
                <td>2</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    Mery
                </td>
                <td>mery@abv.bg</td>
                <td>User</td>
                <td><span class="user-current-status">User</span> <span class="user-possible-status">Moderator</span> <span class="user-possible-status">Administrator</span></td>
            </tr>
            <tr>
                <td>3</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    shushan
                </td>
                <td>shushan@abv.bg</td>
                <td>Administrator</td>
                <td><span class="user-possible-status">User</span> <span class="user-possible-status">Moderator</span> <span class="user-current-status">Administrator</span></td>
            </tr>
            <tr>
                <td>4</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    ani
                </td>
                <td>ani@abv.bg</td>
                <td>Administrator</td>
                <td><span class="user-possible-status">User</span> <span class="user-possible-status">Moderator</span> <span class="user-current-status">Administrator</span></td>
            </tr>
            <tr>
                <td>5</td>
                <td>
                <div class="user-table-profile-avatar-container">
                    <img alt="user-profile" class="user-profile-avatar" src="../../static/images/Avatar.png" />
                </div>
                    debilno
                </td>
                <td>debilno@abv.bg</td>
                <td>User</td>
                <td><span class="user-current-status">User</span> <span class="user-possible-status">Moderator</span> <span class="user-possible-status">Administrator</span></td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
`;

export async function adminPanelUsersSettingsPage() {
    render(loaderTemplate(), document.getElementById('admin-root'));

    render(applicationUsersSettingsTemplate(), document.getElementById('admin-root'));
}