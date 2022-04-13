import { html } from '../../../node_modules/lit-html/lit-html.js';

export const noSuchRecipesTemplate = () => html`
<p class="no-recipes">Все още няма такива рецепти. Ако желаете да добавите първата, кликнете<a href="add-recipe">тук</a>
    или се върнете на каталога<a class="return-anker" href="/"></a></p>
`;