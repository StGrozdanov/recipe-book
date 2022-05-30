import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { mainRootElement } from "../middlewares/setUpMidware.js";

const landingPageTemplate = () => html`
<section class="landing-page">
    <nav class="landing-nav">
        <img src="../static/images/cooking.png" alt="" />
        <a href="https://recepti-na-shushanite.web.app/" class="landing-nav-link">Към рецептите на сайта</a>
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
                рецептите, които той е създал. Друго преимущество е възможността да се сдобие с дадена рецепта в pdf
                формат и да я разпечата, ако му е нужна извън интернет пространството. Също така регистрираният
                потребител
                може да коментира и да изказва впечатлението/мнението си, за нещо което е изпробвал.
            </article>
        </section>
    </section>
    <section class="landing-latest-recepies">
        <span>smh</span>
        <h3 class="landing-heading">Най-новите рецепти</h3>

        <section class="landing-latest-recepies-container">
            <article class="landing-latest-recepies-article">
                <header @mouseover=${hoverHandler} class="landing-latest-recepies-article-picture-container">
                    <img src="http://blife.eu/wp-content/uploads/2015/11/12282933_923357734424511_982079375_n-500x398.jpg"
                        alt="" />
                </header>
                <main>
                    <h4>Бананови палачинки с овесени ядки</h4>
                </main>
                <footer class="landing-latest-recepies-article-footer">
                    Десерти
                </footer>
            </article>
            <article class="landing-latest-recepies-article">
                <header class="landing-latest-recepies-article-picture-container">
                    <img src="https://eijfa9g4ivj.exactdn.com/wp-content/uploads/2020/03/aurelien-lemasson-theobald-x00CzBt4Dfk-unsplash.jpg?strip=all&lossy=1&ssl=1"
                        alt="" />
                </header>
                <main>
                    <h4>Пица</h4>
                </main>
                <footer class="landing-latest-recepies-article-footer">
                    Тестени
                </footer>
            </article>
            <article class="landing-latest-recepies-article">
                <header class="landing-latest-recepies-article-picture-container">
                    <img src="https://www.1001recepti.com/images/photos/recipes/size_4/sladkish-s-iagodi-2-%5B2579%5D.jpg"
                        alt="" />
                </header>
                <main>
                    <h4>Сладкиш с ягоди</h4>
                </main>
                <footer class="landing-latest-recepies-article-footer">
                    Десерти
                </footer>
            </article>
        </section>
    </section>
</section>
`;

export function landingPage() {
    render(landingPageTemplate(), mainRootElement);
    clearLandingPageStyles();
}

function clearLandingPageStyles() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('body').style.width = '100%';
}

const SCROLL_DOWN_VIEWPORT_VALUE = 600;

function navigateDownHandler() {
    let topPosition = SCROLL_DOWN_VIEWPORT_VALUE;

    window.scrollTo({
        top: topPosition,
        behavior: "smooth"
    });
}

function hoverHandler() {
    console.log('here');
}