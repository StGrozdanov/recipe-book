import { userIsAuthenticated } from "../services/authenticationService.js";
import { notify } from "../utils/notification.js";

export function isAuthenticated(ctx, next) {
    const requestedPath = ctx.state.path;

    if (userIsAuthenticated() && requestedPath == '/login') {
        handleLoginAccess(ctx, next);
    } else if (userIsAuthenticated() && requestedPath == '/register') {
        handleRegisterAccess(ctx);
    } else if (!userIsAuthenticated() && requestedPath != '/login' && requestedPath != '/register') {
        handleUnauthenticatedAccess(ctx);
    }
    
    next();
}

function handleUnauthenticatedAccess(ctx) {
    notify('Нямате достъп до тази страница.');
    ctx.page.redirect('/login');
    next();
}

function handleLoginAccess(ctx) {
    notify('Вече сте влезли в акаунта си.');
    ctx.page.redirect('/my-profile');
}

function handleRegisterAccess(ctx) {
    notify('Вие сте регистриран потребител на сайта.');
    ctx.page.redirect('/my-profile');
}