import LandingHeader from "./modules/LandingHeader/LandingHeader";
import LandingNav from "./modules/LandingNav/LandingNav";
import LandingDescription from "./modules/LandingDescription/LandingDescription";
import LandingFeatures from './modules/LandingFeatures/LandingFeatures';
import styles from './Landing.module.scss';
import { useRef } from "react";
import { useElementIsInViewport } from "../../hooks/useElementIsInViewport";
import { useRenderLandingRecipe } from "./hooks/useRenderLandingRecipe";
import LandingComments from "./modules/LandingComments/LandingComments";
import { capitalizatorUtil } from "../../utils/capitalizatorUtil";

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

];

const latestComments = [{ "id": 11, "content": "Оооооо тоя сладкиш е тооп ви казвам. Дегостиран е мноогократно!", "createdAt": "2022-05-13T18:57:51", "recipe": { "id": 17, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/strawberry-dessert.jpg", "recipeName": "сладкиш с ягоди" }, "owner": { "id": 1, "username": "shushan", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }, { "id": 10, "content": "…..  E,беше ФАМОЗНО!!! \uD83E\uDD70\uD83D\uDE0D\uD83D\uDE1A\uD83E\uDD29\uD83D\uDE03\uD83D\uDE0B", "createdAt": "2022-04-02T15:38:07", "recipe": { "id": 11, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/Tiramisu.jpg", "recipeName": "тирамису" }, "owner": { "id": 2, "username": "ani", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }, { "id": 9, "content": "На 25/3/22 с Патюшка си направихме и ….следва продължение!", "createdAt": "2022-03-25T20:09:12", "recipe": { "id": 11, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/Tiramisu.jpg", "recipeName": "тирамису" }, "owner": { "id": 2, "username": "ani", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }, { "id": 8, "content": "Много готина мусака", "createdAt": "2022-02-16T18:53:35", "recipe": { "id": 3, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/musaka.jpg", "recipeName": "мусака" }, "owner": { "id": 1, "username": "shushan", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }, { "id": 7, "content": "Баси яката рецепта! Браво !", "createdAt": "2022-01-13T17:21:16", "recipe": { "id": 16, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/pancakes.jpg", "recipeName": "палачинки" }, "owner": { "id": 1, "username": "shushan", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }, { "id": 6, "content": "Защото снощи правих кееекс!", "createdAt": "2022-01-03T16:26:27", "recipe": { "id": 1, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/bananov_keks_s_karamelena_glazura.jpg", "recipeName": "кекс" }, "owner": { "id": 1, "username": "shushan", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }]

export default function Landing() {
    const featuresRef = useRef(null);
    const featuresAreInViewport = useElementIsInViewport(featuresRef);

    const latestRecipesRef = useRef(null);
    const latestRecipesAreInViewport = useElementIsInViewport(latestRecipesRef);

    const mostViewedRecipesRef = useRef(null);
    const mostViewedRecipesAreInViewport = useElementIsInViewport(latestRecipesRef);

    const latestRecipes = useRenderLandingRecipe(latestThreeRecipes, latestRecipesAreInViewport);

    const animationDelays = { 0: '2.5s', 1: '4.5s', 2: '5.1`s' }
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
                        {latestComments.map(comment => {
                            comment.recipe.recipeName = capitalizatorUtil(comment.recipe.recipeName);
                            return <LandingComments key={comment.id} {...comment} />
                        })}
                    </article>
                </section>
            </section >
            <footer ref={mostViewedRecipesRef}>All rights reserved</footer>
        </>
    )
}