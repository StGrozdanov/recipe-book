import LandingHeader from "./modules/LandingHeader/LandingHeader";
import LandingNav from "./modules/LandingNav/LandingNav";
import LandingDescription from "./modules/LandingDescription/LandingDescription";
import LandingFeatures from './modules/LandingFeatures/LandingFeatures';
import styles from './Landing.module.scss';
import { useRef } from "react";
import { useRenderLandingRecipe } from "./hooks/useRenderLandingRecipe";
import LandingComments from "./modules/LandingComments/LandingComments";
import { useLandingRefs } from "./hooks/useLandingRefs";
import { appendCommentsAnimationDelayUtil } from './utils/appendCommentsAnimationDelayUtil';

const latestThreeRecipes = [{ "id": 20, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/08885B50-4AA7-44DD-A976-B8C310B80235.jpeg", "recipeName": "Сьомга със сос", "category": "Риба" }, { "id": 19, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/healthy-pancakes.jpg", "recipeName": "бананови палачинки", "category": "Тестени" }, { "id": 18, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/pizza.webp", "recipeName": "пица", "category": "Тестени" }];
const latestComments = [{ "id": 11, "content": "Оооооо тоя сладкиш е тооп ви казвам. Дегостиран е мноогократно!", "createdAt": "2022-05-13T18:57:51", "recipe": { "id": 17, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/strawberry-dessert.jpg", "recipeName": "сладкиш с ягоди" }, "owner": { "id": 1, "username": "shushan", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }, { "id": 10, "content": "…..  E,беше ФАМОЗНО!!! \uD83E\uDD70\uD83D\uDE0D\uD83D\uDE1A\uD83E\uDD29\uD83D\uDE03\uD83D\uDE0B", "createdAt": "2022-04-02T15:38:07", "recipe": { "id": 11, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/Tiramisu.jpg", "recipeName": "тирамису" }, "owner": { "id": 2, "username": "ani", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }, { "id": 9, "content": "На 25/3/22 с Патюшка си направихме и ….следва продължение!", "createdAt": "2022-03-25T20:09:12", "recipe": { "id": 11, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/Tiramisu.jpg", "recipeName": "тирамису" }, "owner": { "id": 2, "username": "ani", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }, { "id": 8, "content": "Много готина мусака", "createdAt": "2022-02-16T18:53:35", "recipe": { "id": 3, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/musaka.jpg", "recipeName": "мусака" }, "owner": { "id": 1, "username": "shushan", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }, { "id": 7, "content": "Баси яката рецепта! Браво !", "createdAt": "2022-01-13T17:21:16", "recipe": { "id": 16, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/pancakes.jpg", "recipeName": "палачинки" }, "owner": { "id": 1, "username": "shushan", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }, { "id": 6, "content": "Защото снощи правих кееекс!", "createdAt": "2022-01-03T16:26:27", "recipe": { "id": 1, "imageUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/bananov_keks_s_karamelena_glazura.jpg", "recipeName": "кекс" }, "owner": { "id": 1, "username": "shushan", "avatarUrl": "https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png" } }]

export default function Landing() {
    const latestRecipesRef = useRef(null);
    const mostViewedRecipesRef = useRef(null);
    const commentsRef = useRef(null);
    const [latestRecipesAreInViewport, mostViewedRecipesAreInViewport, commentsAreInViewport] = useLandingRefs(latestRecipesRef, mostViewedRecipesRef, commentsRef);
    const latestRecipes = useRenderLandingRecipe(latestThreeRecipes, latestRecipesAreInViewport);
    const mostViewedRecipes = useRenderLandingRecipe(latestThreeRecipes, mostViewedRecipesAreInViewport, true);
    const landingComments = appendCommentsAnimationDelayUtil(latestComments);

    return (
        <section>
            <LandingNav />
            <LandingHeader />
            <LandingDescription />
            <LandingFeatures />
            <h3 className={styles["landing-heading"]}>Последни Публикации</h3>
            <section ref={latestRecipesRef} className={styles["landing-section"]}>
                {latestRecipes}
            </section>

            <section className={styles["landing-section"]}>
                <article className={styles["landing-article"]}>
                    <h3 ref={mostViewedRecipesRef} className={styles["landing-heading"]}>
                        Най-разглеждани Рецепти
                    </h3>
                    {mostViewedRecipes}
                </article>

                <article className={styles["landing-article"]}>
                    <h3 ref={commentsRef} className={styles["landing-heading"]}>Последни Коментари</h3>
                    {landingComments.map(comment => {
                        return <LandingComments
                            key={comment.id}
                            {...comment}
                            isInViewport={commentsAreInViewport}
                        />
                    })}
                </article>
            </section>
        </section >
    )
}