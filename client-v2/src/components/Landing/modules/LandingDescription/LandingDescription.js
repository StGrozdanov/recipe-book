import { useRef } from 'react';
import { useElementIsInViewport } from '../../../../hooks/useElementIsInViewport';
import styles from './LandingDescription.module.scss';

export default function LandingDescription() {
    const articleRef = useRef();
    const isInViewport = useElementIsInViewport(articleRef, '-20px');

    return (
        <section className={styles["landing-description"]}>
            <h3 ref={articleRef} className={styles.heading}>Идеята зад нашия сайт</h3>
            <section className={isInViewport ? styles["animated-article-container"] : styles["article-container"]}>
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
            </section>
        </section>
    );
}