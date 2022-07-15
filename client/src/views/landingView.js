import { html, nothing, render } from "../../node_modules/lit-html/lit-html.js";
import { mainRootElement } from "../middlewares/setUpMiddleware.js";
import page from '../../node_modules/page/page.mjs';
import { getTheLastThreeRecepies, getTheThreeMostViewedRecepies  } from "../services/recipeService.js";
import { getTheLatestSixComments } from "../services/commentService.js";
import { latestRecepieTemplate } from "./templates/landingTemplates/latestRecepieTemplate.js";
import { mostViewedRecepieTemplate } from "./templates/landingTemplates/mostViewedRecepieTemplate.js";
import { latestCommentsTemplate } from "./templates/landingTemplates/latestCommentsTemplate.js";
import { loaderTemplate } from "./templates/loadingTemplate.js";

const landingPageTemplate = (latestRecipes, comments, mostViewedRecipes) => html`
<section class="landing-page">
    <nav class="landing-nav">
        <img src="../static/images/cooking.png" alt="" />
        <a @click=${()=> navigateHandler('/catalogue', true)} href="javascript:void[0]" class="landing-nav-link">
            Към рецептите на сайта
        </a>
        <img src="../static/images/cooking.png" alt="" />
    </nav>
    <div>
        <img class="landing-background" src="../static/images/welcome 2.jpg" alt="welcome" />
        <img class="landing-welcome" src="../static/images/welcome.jpg" alt="Welcome!" />
        <i @click=${navigateDownHandler} class="fa-solid fa-angles-down fa-beat-fade"></i>
    </div>
    <section class="landing-description">
        <h3 class="landing-description-heading">Идеята зад нашия сайт</h3>
        <section class="landing-description-article-container">
            <article class="landing-description-article">
                Идеята за "тайна рецепта" не ни допада. Природата на рецептата е друга. Тя е производна, предназначена
                за
                споделяне. Как иначе една рецепта би се подобрила? Как би се променила? Как би се зародила нова идея за
                рецепта? Трябва отправна точка. Трябва вдъхновение. Трябва да се опита и да се докосне, за да може да се
                доразвие и впоследствие да продължи живота си под друга форма, пречупена през призмата на нечий други
                вкусови рецептори и възприятия. При нас няма тайни рецепти.
            </article>
            <article class="landing-description-article">
                Това е идеята и мисията зад сайта ни. Какво печелите ако се регистрирате в него? Всеки регистрирал се
                се сдобива с потребителски профил, в който да създаде лична готварска книга на база съдържанието на
                сайта.
                Получава лесен и бърз достъп до всяка рецепта, обозначена като любима. Получава лесен и бърз достъп до
                рецептите, които той е създал. Също така регистрираният потребител може да коментира и да изказва 
                впечатлението/мнението си, за нещо което е изпробвал, а също и да получава нотификации за нови коментари
                в реално време.
            </article>
        </section>
    </section>

    <section class="landing-latest-recepies">
        <span class="landing-latest-recepies-span">smh</span>
        <h3 class="landing-heading">Най-новите рецепти</h3>
        <section class="landing-latest-recepies-container">
            ${latestRecipes.map(singleRecepie => latestRecepieTemplate(singleRecepie))}
        </section>
    </section>

    <section class="landing-most-viewed-latest-comments">
        <article class="landing-most-viewed">
            <span class="landing-most-viewed-recepies-span">smh</span>
            <h3 class="landing-heading">Най-разглежданите рецепти</h3>
            <section class="landing-most-viewed">
                ${mostViewedRecipes.map(singleRecepie => (mostViewedRecepieTemplate(singleRecepie)))}
            </section>
        </article>

        <article class="landing-latest-comments">
            <span class="landing-most-viewed-recepies-span">smh</span>
            <h3 class="landing-heading">Последни коментари</h3>

            <section class="landing-most-viewed comment-section">
                ${comments.map(comment => latestCommentsTemplate(comment))}
            </section>
        </article>

    </section>
`;

const initialBodyWidth = document.querySelector('body').style.width;

export async function landingPage() {
    resetBaseStyleArchitecture();
    render(loaderTemplate(), mainRootElement);

    const lastThreeRecipesData = getTheLastThreeRecepies();
    const latestSixCommentsData = getTheLatestSixComments();
    const mostViewedRecepiesData = getTheThreeMostViewedRecepies();

    const [lastThreeRecepies, latestSixComments, mostViewedRecepies] = await Promise.all([
        lastThreeRecipesData,
        latestSixCommentsData,
        mostViewedRecepiesData
    ]);

    const landingTemplate = landingPageTemplate(lastThreeRecepies, latestSixComments, mostViewedRecepies);

    render(landingTemplate, mainRootElement);
}

function resetBaseStyleArchitecture() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('body').style.width = '100%';
}

function resolvePageStyleArchitecture() {
    document.querySelector('header').style.display = 'flex';
    document.querySelector('body').style.width = initialBodyWidth;
}

const SCROLL_DOWN_RECIPE_CATALOGUE_VIEWPORT_VALUE = document.body.clientHeight / 0.39;

export function navigateDownHandler() {
    window.scrollTo({
        top: SCROLL_DOWN_RECIPE_CATALOGUE_VIEWPORT_VALUE,
        behavior: "smooth"
    });
}

export function navigateHandler(location, catalogueRedirect) {
    page.redirect(location);
    resolvePageStyleArchitecture();

    let currentScreenSize = window.matchMedia('(max-device-width: 1000px)').matches;
    catalogueRedirect && !currentScreenSize ? sessionStorage.setItem('landingRedirect', true) : nothing;
}