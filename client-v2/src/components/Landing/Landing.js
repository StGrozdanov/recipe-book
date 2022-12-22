import LandingNav from "./components/LandingNav";

export default function Landing() {
    return (
        <section className="landing-page">
            <LandingNav />
            <div>
                <img className="landing-background" src="images/welcome 2.jpg" alt="welcome" />
                <img className="landing-welcome" src="images/welcome.jpg" alt="Welcome!" />
                <i className="fa-solid fa-angles-down fa-beat-fade"></i>
            </div>
            <section className="landing-description">
                <h3 className="landing-description-heading">Идеята зад нашия сайт</h3>
                <section className="landing-description-article-container">
                    <article className="landing-description-article">
                        Идеята за "тайна рецепта" не ни допада. Природата на рецептата е друга. Тя е производна, предназначена
                        за
                        споделяне. Как иначе една рецепта би се подобрила? Как би се променила? Как би се зародила нова идея за
                        рецепта? Трябва отправна точка. Трябва вдъхновение. Трябва да се опита и да се докосне, за да може да се
                        доразвие и впоследствие да продължи живота си под друга форма, пречупена през призмата на нечий други
                        вкусови рецептори и възприятия. При нас няма тайни рецепти.
                    </article>
                    <article className="landing-description-article">
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

            <section className="landing-latest-recepies">
                <span className="landing-latest-recepies-span">smh</span>
                <h3 className="landing-heading">Най-новите рецепти</h3>
                <section className="landing-latest-recepies-container">
                </section>
            </section>

            <section className="landing-most-viewed-latest-comments">
                <article className="landing-most-viewed">
                    <span className="landing-most-viewed-recepies-span">smh</span>
                    <h3 className="landing-heading">Най-разглежданите рецепти</h3>
                    <section className="landing-most-viewed">
                    </section>
                </article>

                <article className="landing-latest-comments">
                    <span className="landing-most-viewed-recepies-span">smh</span>
                    <h3 className="landing-heading">Последни коментари</h3>

                    <section className="landing-most-viewed comment-section">
                    </section>
                </article>
            </section>
        </section>
    )
}