import RecipeProducts from "../RecipeProducts/RecipeProducts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faComment, faPenToSquare, faShareNodes, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './RecipeDetailsNavigation.module.scss';

export default function RecipeDetailsNavigation({ recipe }) {
    return (
        <article className={styles.products}>
            <RecipeProducts
                preparationTime={recipe.preparationTime}
                calories={recipe.calories}
                products={recipe.products}
                protein={recipe.protein}
            />
            <nav className={styles.navigation}>
                <ul>
                    <FontAwesomeIcon icon={faCartShopping} className={styles['nav-icon']} />
                    <FontAwesomeIcon icon={faComment} className={styles['nav-icon']} />
                    <FontAwesomeIcon icon={faPenToSquare} className={styles['nav-icon']} />
                    <FontAwesomeIcon icon={faTrashCan} className={styles['nav-icon']} />
                    <FontAwesomeIcon icon={faShareNodes} className={styles['nav-icon']} />
                </ul>
            </nav>
        </article>
    );
}