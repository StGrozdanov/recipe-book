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
import { myProfileNotificationsPage } from './views/myNotificationsView.js';
import { myRecepiesPage } from './views/myRecepiesView.js';
import { myFavouriteRecepiesPage } from './views/myFavouritesView.js';
import { myProfileEditPage } from './views/myProfileEditView.js';
import { isAuthenticated } from './middlewares/isAuthenticatedMidware.js';
import { page404 } from './views/404pageView.js';
import { landingPage } from './views/landingView.js';

page('/', setUp, cataloguePage);
page('/welcome', landingPage);
page('/login', setUp, isAuthenticated, loginPage);
page('/register', setUp, isAuthenticated, registerPage);
page('/add-recipe', setUp, isAuthenticated, addRecipePage);
page('/details-:id', setUp, detailsPage);
page('/edit-:id', setUp, isAuthenticated, editPage);
page('/search=:query', setUp, searchPage);
page('/categorize=:query', setUp, categorizationPage);
page('/my-profile', setUp, isAuthenticated, myProfilePage);
page('/my-profile/notifications', setUp, isAuthenticated, myProfileNotificationsPage);
page('/my-profile/created-recepies', setUp, isAuthenticated, myRecepiesPage);
page('/my-profile/favourite-recepies', setUp, isAuthenticated, myFavouriteRecepiesPage);
page('/my-profile/edit', setUp, isAuthenticated, myProfileEditPage);
page('/user-:id', setUp, userProfilePage);
page ('*', page404);

page.start();