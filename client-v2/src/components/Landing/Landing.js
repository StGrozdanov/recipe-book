import LandingHeader from "./modules/LandingHeader/LandingHeader";
import LandingNav from "./modules/LandingNav/LandingNav";
import LandingDescription from "./modules/LandingDescription/LandingDescription";
import LandingFeatures from './modules/LandingFeatures/LandingFeatures';
import styles from './Landing.module.scss';
import { useRef } from "react";
import { useElementIsInViewport } from "../../hooks/useElementIsInViewport";
import { useRenderLandingRecipe } from "./hooks/useRenderLandingRecipe";

const latestThreeRecipes = [
    {
        category: "Риба",
        id: 20,
        imageUrl: "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/08885B50-4AA7-44DD-A976-B8C310B80235.jpeg",
        recipeName: "Сьомга със сос",
    },

    {
        category: "Тестени",
        id: 19,
        imageUrl: "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/healthy-pancakes.jpg",
        recipeName: "Бананови палачинки",
    },

    {
        category: "Тестени",
        id: 18,
        imageUrl: "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/pizza.webp",
        recipeName: "Пица",
    }

]

export default function Landing() {
    const featuresRef = useRef(null);
    const featuresAreInViewport = useElementIsInViewport(featuresRef);

    const latestRecipesRef = useRef(null);
    const latestRecipesAreInViewport = useElementIsInViewport(latestRecipesRef);

    const mostViewedRecipesRef = useRef(null);
    const mostViewedRecipesAreInViewport = useElementIsInViewport(latestRecipesRef);

    const latestRecipes = useRenderLandingRecipe(latestThreeRecipes, latestRecipesAreInViewport);

    const animationDelays = {0: '2.5s', 1:'4.5s', 2: '5.1`s'}
    const mostViewedRecipes = useRenderLandingRecipe(latestThreeRecipes, mostViewedRecipesAreInViewport, animationDelays);

    return (
        <>
            <section>
                <LandingNav />
                <LandingHeader />
                <LandingDescription />
                <LandingFeatures isInViewport={featuresAreInViewport} />
                <h3 ref={featuresRef} className={styles["landing-heading"]}>Последни Публикации</h3>
                <section className={styles["landing-section"]}>
                    {latestRecipes}
                </section>
                <section className={styles["landing-section"]}>
                    <article ref={latestRecipesRef} className={styles["landing-article"]}>
                        <h3 className={styles["landing-heading"]}>Най-разглеждани Рецепти</h3>
                        {mostViewedRecipes}
                    </article>
                    <article ref={mostViewedRecipesRef} className={styles["landing-article"]}>
                        <h3 className={styles["landing-heading"]}>Последни Коментари</h3>
                        {mostViewedRecipes}
                    </article>
                </section>
            </section >
            <footer ref={mostViewedRecipesRef}>All rights reserved</footer>
        </>
    )
}