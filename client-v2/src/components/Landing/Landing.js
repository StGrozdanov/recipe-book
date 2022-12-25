import LandingHeader from "./modules/LandingHeader/LandingHeader";
import LandingNav from "./modules/LandingNav/LandingNav";
import LandingDescription from "./modules/LandingDescription/LandingDescription";
import LandingFeatures from './modules/LandingFeatures/LandingFeatures';
import LandingRecipeCard from "./modules/LandingRecipeCard/LandingRecipeCard";
import styles from './Landing.module.scss';
import { useRef } from "react";
import { useElementIsInViewport } from "../../hooks/useElementIsInViewport";

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

const animationDelayMap = {
    0: '250ms',
    1: '700ms',
    2: '1s',
}

export default function Landing() {
    const featuresRef = useRef(null);
    const featuresAreInViewport = useElementIsInViewport(featuresRef);
    const latestRecipesRef = useRef(null);
    const latestRecipesAreInViewport = useElementIsInViewport(latestRecipesRef);

    return (
        <section>
            <LandingNav />
            <LandingHeader />
            <LandingDescription />
            <LandingFeatures isInViewport={featuresAreInViewport} />
            <h3 ref={featuresRef} className={styles["landing-heading"]}>Последни Публикации</h3>
            <section className={styles["landing-section"]}>
                {
                    latestThreeRecipes.map((recipe, index) => {
                        recipe.animationDelay = animationDelayMap[index];
                        return (
                            <LandingRecipeCard
                                key={recipe.id}
                                {...recipe}
                                animation={latestRecipesAreInViewport}
                            />
                        )
                    })
                }
            </section>
            <h3 className={styles["landing-heading"]}>Най-разглеждани Рецепти</h3>
            <section ref={latestRecipesRef} className="landing-most-viewed-latest-comments"></section>
            <h3 className={styles["landing-heading"]}>Последни Коментари</h3>
            <section className="landing-most-viewed-latest-comments"></section>
        </section >
    )
}