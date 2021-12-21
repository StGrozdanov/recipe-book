import { viewAllPage } from './views/allRecordsView.js';
import page from '../node_modules/page/page.mjs';
import { setUp } from './middlewares/setUpMidware.js';
import { loginPage } from './views/loginView.js';
import { registerPage } from './views/registerView.js';
import { createPage } from './views/createView.js';
import { detailsPage } from './views/detailsView.js';
import { editPage } from './views/editView.js';

page('/', setUp, viewAllPage)
page('/login', setUp, loginPage);
page('/register', setUp, registerPage);
page('/add-recipe', setUp, createPage);
page('/details/:id', setUp, detailsPage);
page('/edit/:id', setUp, editPage);

page.start();