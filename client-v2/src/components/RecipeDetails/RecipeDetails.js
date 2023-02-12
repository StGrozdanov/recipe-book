import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as recipeService from '../../services/recipeService';
import * as userService from '../../services/userService';
import { capitalizatorUtil } from "../../utils/capitalizatorUtil";
import FallbackImage from '../common/FallbackImage/FallbackImage';
import RecipeStep from "./modules/RecipeStep";
import styles from './RecipeDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning, faCartShopping, faClock, faComment, faDumbbell, faPenToSquare, faShareNodes, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
                <section>
                    <h4 className={styles['recipe-category']}>{recipe.categoryName}</h4>
                    <h2 className={styles['recipe-name']}>{recipe.recipeName}</h2>
                    <h4 className={styles['recipe-owner']}>
                        <span className={styles.published}>Публикувано от:</span> {owner.username}
                    </h4>
                    <h4 className={styles.method}>Метод на приготвяне</h4>
                </section>
                <div className={styles['recipe-image-container']}>
                    <FallbackImage className={styles['recipe-image']} src={recipe.imageUrl} alt={"/images/food.jpg"} />
                </div>
                <article className={styles.products}>
                    <ul className={styles.ul}>
                        <li className={styles.list}>
                            <FontAwesomeIcon color="#57595f" icon={faClock} className={styles.icon} />
                            {recipe.preparationTime} минути
                        </li>
                        <li className={styles.list}>
                            <FontAwesomeIcon color="#57595f" icon={faBoltLightning} className={styles.icon} />
                            {recipe.calories || 1200} калории
                        </li>
                        <li className={styles.list}>
                            <FontAwesomeIcon color="#57595f" icon={faDumbbell} className={styles.icon} />
                            {recipe.protein || 180} гр. протеин
                        </li>
                    </ul>
                    <h3>Продукти</h3>
                    <ul className={styles.ul}>
                        {
                            recipe.products && recipe.products.map(product => {
                                return (
                                    <label>
                                        <input
                                            key={product}
                                            style={{ marginTop: 2 }}
                                            type="checkbox"
                                        />
                                        <span></span>
                                        {product}
                                    </label>
                                )
                            })
                        }
                    </ul>
                    <nav className={styles.navigation}>
                        <ul>
                            <FontAwesomeIcon color="#57595f" icon={faCartShopping} className={styles.icon} />
                            <FontAwesomeIcon color="#57595f" icon={faComment} className={styles.icon} />
                            <FontAwesomeIcon color="#57595f" icon={faPenToSquare} className={styles.icon} />
                            <FontAwesomeIcon color="#57595f" icon={faTrashCan} className={styles.icon} />
                            <FontAwesomeIcon color="#57595f" icon={faShareNodes} className={styles.icon} />
                        </ul>
                    </nav>
                </article>
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
                <span className={styles['current-method-step']}>{viewportStep + 1} от {recipe.steps && recipe.steps.length}</span>
            </section>
        </article>
    );
}