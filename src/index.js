import { cataloguePage } from './views/catalogueView.js';
import page from '../node_modules/page/page.mjs';
import { setUp } from './middlewares/setUpMidware.js';
import { loginPage } from './views/loginView.js';
import { registerPage } from './views/registerView.js';
import { addRecipePage } from './views/createRecipeView.js';
import { detailsPage } from './views/detailsView.js';
import { editPage } from './views/editRecipeView.js';
import { searchPage } from './views/searchView.js';
import { categorizationPage } from './views/categorizationView.js';
import { myProfilePage } from './views/myProfileView.js';
import { userProfilePage } from './views/userProfileView.js';
import { myProfileNotifications } from './views/myProfileNotificationsView.js';

page('/', setUp, cataloguePage);
page('/login', setUp, loginPage);
page('/register', setUp, registerPage);
page('/add-recipe', setUp, addRecipePage);
page('/details-:id', setUp, detailsPage);
page('/edit-:id', setUp, editPage);
page('/search=:query', setUp, searchPage);
page('/categorize=:query', setUp, categorizationPage);
page('/my-profile', setUp, myProfilePage);
page('/my-profile/notifications', setUp, myProfileNotifications);
page('/user-:id', setUp, userProfilePage);

page.start();