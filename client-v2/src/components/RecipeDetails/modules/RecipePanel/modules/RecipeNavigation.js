import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faComment, faPenToSquare, faShareNodes, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './RecipeNavigation.module.scss';
import { useNavigate } from 'react-router-dom';

export default function RecipeNavigation({ recipeId }) {
    const navigate = useNavigate();

    return (
        <nav className={styles.navigation}>
            <ul>
                <FontAwesomeIcon
                    icon={faCartShopping}
                    className={styles['nav-icon']}
                    onClick={() => navigate(`/details/${recipeId}`)}
                />
                <FontAwesomeIcon
                    icon={faComment}
                    className={styles['nav-icon']}
                    onClick={() => navigate(`/details/${recipeId}/comments`)}
                />
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className={styles['nav-icon']}
                />
                <FontAwesomeIcon
                    icon={faTrashCan}
                    className={styles['nav-icon']}
                />
                <FontAwesomeIcon
                    icon={faShareNodes}
                    className={styles['nav-icon']}
                />
            </ul>
        </nav>
    );
}