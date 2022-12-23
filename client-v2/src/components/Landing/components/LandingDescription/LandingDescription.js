import { useRef } from 'react';
import { useElementIsInViewport } from '../../../../hooks/useElementIsInViewport';
import styles from './LandingDescription.module.scss';

export default function LandingDescription() {
    const articleRef = useRef();
    const isInViewport = useElementIsInViewport(articleRef);
    
    return (
        <section className={styles["landing-description"]}>
            <h3 className={styles.heading}>Идеята зад нашия сайт</h3>
            <section ref={articleRef} className={isInViewport ? styles["article-container"] : ''}>
                <article className={styles.article}>
                    <span className={isInViewport ? styles['first-animated-text'] : ''}>
                        Идеята за "тайна рецепта" не ни допада. Природата на рецептата е друга. Тя е производна,
                    </span>
                    <span className={isInViewport ? styles['second-animated-text'] : ''}>
                        предназначена за споделяне. Как иначе една рецепта би се подобрила? Как би се променила?
                        Как би се зародила нова идея за рецепта? Трябва отправна точка. Трябва вдъхновение.
                    </span>
                    <span className={isInViewport ? styles['third-animated-text'] : ''}>
                        Трябва да се опита и да се докосне, за да може да се доразвие и впоследствие да продължи
                        живота си под друга форма, пречупена през призмата на нечий други вкусови рецептори и възприятия.
                    </span>
                    <div className={isInViewport ? styles['no-secrets'] : ''}>При нас няма тайни рецепти.</div>
                </article>
                {/* <article className={styles.article}>
                    Това е идеята и мисията зад сайта ни. Какво печелите ако се регистрирате в него? Всеки регистрирал се
                    се сдобива с потребителски профил, в който да създаде лична готварска книга на база съдържанието на
                    сайта.
                    Получава лесен и бърз достъп до всяка рецепта, обозначена като любима. Получава лесен и бърз достъп до
                    рецептите, които той е създал. Също така регистрираният потребител може да коментира и да изказва
                    впечатлението/мнението си, за нещо което е изпробвал, а също и да получава нотификации за нови коментари
                    в реално време.
                </article> */}
            </section>
        </section>
    );
}