import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.scss';

export default function RecipeCard({
    id,
    imageUrl,
    recipeName,
    category,
    animation,
    animationDelay,
    style
}) {
    const customStyle = { ...animationDelay, ...style };
    return (
        animation ?
            <article className={styles["card-container"]} style={style ? customStyle : { animationDelay }}>
                <Link to={`/details/${id}`}>
                    <header className={styles["picture-container"]}>
                        <img 
                            src={imageUrl + 's'}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src="images/food.jpg";
                              }}
                        />
                    </header>
                </Link>
                <main>
                    <h3 className={styles["recipe-name"]}>{recipeName}</h3>
                </main>
                <footer className={styles["card-footer"]}>{category}</footer>
            </article >
            : null
    );
}