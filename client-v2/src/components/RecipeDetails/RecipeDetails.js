import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as recipeService from '../../services/recipeService';
import * as userService from '../../services/userService';
import { capitalizatorUtil } from "../../utils/capitalizatorUtil";
import RecipeStep from "./modules/RecipeSteps/RecipeStep";
import styles from './RecipeDetails.module.scss';
import RecipeDetailsHeader from "./modules/RecipeDetailsHeader/RecipeDetailsHeader";
import RecipeDetailsNavigation from "./modules/RecipeDetailsNavigation/RecipeDetailsNavigation";

export default function RecipeDetails() {
    const [recipe, setRecipe] = useState({});
    const [owner, setOwner] = useState({});
    const [viewportStep, setViewportStep] = useState(0);
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            const recipeData = await recipeService.getSingleRecipe(params.id);
            const ownerData = await userService.getUser(recipeData.ownerId);
            recipeData.recipeName = capitalizatorUtil(recipeData.recipeName);
            setRecipe(recipeData);
            setOwner(ownerData);
        }
        fetchData();
    }, []);

    const viewportStepHandler = (step) => setViewportStep(step);

    return (
        <article className={styles.container}>
            <section className={styles['top-section']}>
                <RecipeDetailsHeader
                    category={recipe.categoryName}
                    name={recipe.recipeName}
                    image={recipe.imageUrl}
                    owner={owner.username}
                />
                <RecipeDetailsNavigation recipe={recipe} />
            </section>
            <section className={styles['methods-section']}>
                <section className={styles.methods}>
                    {
                        recipe.steps && recipe.steps.length > 0 && recipe.steps.map(
                            (step, index) =>
                                <RecipeStep
                                    step={step}
                                    index={index}
                                    key={index}
                                    isInViewportHandler={viewportStepHandler}
                                />
                        )
                    }
                </section>
                <span className={styles['current-method-step']}>
                    {viewportStep + 1} от {recipe.steps && recipe.steps.length}
                </span>
            </section>
        </article>
    );
}