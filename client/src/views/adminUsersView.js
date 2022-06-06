import { html, render } from "../../node_modules/lit-html/lit-html.js";

const applicationUsersTemplate = () => html`
<div class="wrapper-table-wrapper">
<div class="table-wrapper">
     <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>User</th>
                <th>Email</th>
                <th>Avatar</th>
                <th>Cover Photo</th>
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
                    Peter
                </td>
                <td>peter@abv.bg</td>
                <td>some url</td>
                <td>some url</td>
                <td><span class="user-status-offline">Offline</span></td>
                <td><span class="user-action-edit">Edit</span> <span class="user-action-block">Block</span> <span class="user-action-delete">Delete</span></td>
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
                <td>some url</td>
                <td>some url</td>
                <td><span class="user-status-offline">Offline</span></td>
                <td><span class="user-action-edit">Edit</span> <span class="user-action-block">Block</span> <span class="user-action-delete">Delete</span></td>
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
                <td>some url</td>
                <td>some url</td>
                <td><span class="user-status-online">Online</span></td>
                <td><span class="user-action-edit">Edit</span> <span class="user-action-block">Block</span> <span class="user-action-delete">Delete</span></td>
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
                <td>some url</td>
                <td>some url</td>
                <td><span class="user-status-online">Online</span></td>
                <td><span class="user-action-edit">Edit</span> <span class="user-action-block">Block</span> <span class="user-action-delete">Delete</span></td>
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
                <td>some url</td>
                <td>some url</td>
                <td><span class="user-status-offline">Offline</span></td>
                <td><span class="user-action-edit">Edit</span> <span class="user-action-block">Block</span> <span class="user-action-delete">Delete</span></td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
`;

export async function adminPanelUsersPage() {
    render(applicationUsersTemplate(), document.getElementById('admin-root'));
}