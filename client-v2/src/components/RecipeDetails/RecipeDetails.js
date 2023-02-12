import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as recipeService from '../../services/recipeService';
import * as userService from '../../services/userService';
import { capitalizatorUtil } from "../../utils/capitalizatorUtil";
import FallbackImage from '../common/FallbackImage/FallbackImage';
import styles from './RecipeDetails.module.scss';

export default function RecipeDetails() {
    const [recipe, setRecipe] = useState({});
    const [owner, setOwner] = useState({});
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

    return (
        <article className={styles.container}>
            <section className={styles['top-section']}>
                <section>
                    <h4 className={styles['recipe-category']}>{recipe.categoryName}</h4>
                    <h2 className={styles['recipe-name']}>{recipe.recipeName}</h2>
                    <h4 className={styles['recipe-owner']}>
                        <span className={styles.published}>Публикувана от:</span> {owner.username}
                    </h4>
                    <h3 className={styles.method}>Метод на приготвяне</h3>
                </section>
                <div className={styles['recipe-image-container']}>
                    <FallbackImage className={styles['recipe-image']} src={recipe.imageUrl} alt={"/images/food.jpg"} />
                </div>
                <article className={styles.products}>{recipe.products}</article>
            </section>
            <article className={styles.steps}>{recipe.steps}</article>
        </article>
    );
}