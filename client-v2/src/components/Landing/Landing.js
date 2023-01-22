import LandingHeader from "./modules/LandingHeader/LandingHeader";
import LandingNav from "./modules/LandingNav/LandingNav";
import LandingDescription from "./modules/LandingDescription/LandingDescription";
import LandingFeatures from './modules/LandingFeatures/LandingFeatures';
import styles from './Landing.module.scss';
import { useEffect, useRef, useState } from "react";
import { useRenderLandingRecipe } from "./hooks/useRenderLandingRecipe";
import LandingComments from "./modules/LandingComments/LandingComments";
import BackToTopButton from "../common/BackToTopButton/BackToTopButton";
import { useLandingRefs } from "./hooks/useLandingRefs";
import { appendCommentsAnimationDelayUtil } from './modules/LandingComments/utils/appendCommentsAnimationDelayUtil';
import * as recipeService from '../../services/recipeService';
import * as commentService from '../../services/commentService';
import LoadingPan from "../common/LoadingPan/LoadingPan";
import latestSixCommentsFallback from './data/latestSixCommentsFallback.json';
import latestThreeRecipesFallback from './data/latestThreeRecipesFallback.json';
import mostViewedRecipesFallback from './data/mostViewedRecipesFallback.json';

export default function Landing() {
    const latestRecipesRef = useRef(null);
    const mostViewedRecipesRef = useRef(null);
    const commentsRef = useRef(null);
    const [latestRecipesAreInViewport, mostViewedRecipesAreInViewport, commentsAreInViewport] = useLandingRefs(latestRecipesRef, mostViewedRecipesRef, commentsRef);
    const [lastThreeRecipes, setLastThreeRecipes] = useState([]);
    const [latestComments, setLatestComments] = useState([]);
    const [mostViewedRecipes, setMostViewedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const lastThreeRecipesData = recipeService.getTheLastThreeRecepies();
        const latestSixCommentsData = commentService.getTheLatestSixComments();
        const mostViewedRecipesData = recipeService.getTheThreeMostViewedRecepies();

        Promise
            .all([lastThreeRecipesData, latestSixCommentsData, mostViewedRecipesData])
            .then(data => {
                setLastThreeRecipes(data[0]);
                setLatestComments(data[1]);
                setMostViewedRecipes(data[2]);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLastThreeRecipes(latestThreeRecipesFallback)
                setLatestComments(latestSixCommentsFallback)
                setMostViewedRecipes(mostViewedRecipesFallback)
                setIsLoading(false);
            });
    }, []);

    const latestRecipes = useRenderLandingRecipe(lastThreeRecipes, latestRecipesAreInViewport);
    const mostViewed = useRenderLandingRecipe(mostViewedRecipes, mostViewedRecipesAreInViewport, true);
    const landingComments = appendCommentsAnimationDelayUtil(latestComments);

    return isLoading ? <LoadingPan style={{width: 500}} /> :
        (<section>
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
                    {mostViewed}
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
            <BackToTopButton />
        </section >
        )
}