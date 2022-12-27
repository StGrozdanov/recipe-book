import { html } from '../../../node_modules/lit-html/lit-html.js';
import { categorize } from '../categorizationView.js';

export const categoryDropdownTemplate = (ctx) => html`
<form>
    <div class="multiselect">
        <div @click=${showCheckboxes} class="selectBox dropdown-toggle">
            <i class="fa-solid fa-circle-chevron-down"></i>
            <select style="border: none;">
                <option>Категории</option>
            </select>
            <div class="overSelect"></div>
    </div>
        <div @change=${(e) => categorize(e, ctx)} id="checkboxes" style="display: none;">
            <label for="all-categories">
                <input type="checkbox" id="all-categories" value="Всички" checked /><span></span>Всички</label>
            <label>
                <input type="checkbox" value="Пилешко" /><span></span>Пилешко</label>
            <label>
                <input type="checkbox" value="Свинско" /><span></span>Свинско</label>
            <label>
                <input type="checkbox" value="Телешко" /><span></span>Телешко</label>
            <label>
                <input type="checkbox" value="Телешко\-свинско" /><span></span>Телешко-свинско</label>
            <label>
                <input type="checkbox" value="Риба" /><span></span>Риба</label>
            <label>
                <input type="checkbox" value="Други месни" /><span></span>Други месни</label>
            <label>
                <input type="checkbox" value="Вегитариански" /><span></span>Вегитариански</label>
            <label>
                <input type="checkbox" value="Салати" /><span></span>Салати</label>
            <label>
                <input type="checkbox" value="Тестени" /><span></span>Тестени</label>
            <label>
                <input type="checkbox" value="Десерти" /><span></span>Десерти</label>
            <label>
                <input type="checkbox" value="Други" /><span></span>Други</label>
        </div>
    </div>
</form>
`;

let expanded = false;

function showCheckboxes() {
    const checkboxes = document.getElementById("checkboxes");

    if (!expanded) {
        checkboxes.style.display = "flex";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}