import styles from './RecipeDetailsHeader.module.scss';
import FallbackImage from '../../../common/FallbackImage/FallbackImage';

export default function RecipeDetailsHeader({category, name, owner, image}) {
    return (
        <>
            <section>
                <h4 className={styles['recipe-category']}>{category}</h4>
                <h2 className={styles['recipe-name']}>{name}</h2>
                <h4 className={styles['recipe-owner']}>
                    <span className={styles.published}>Публикувано от:</span> {owner}
                </h4>
                <h4 className={styles.method}>Метод на приготвяне</h4>
            </section>
            <div className={styles['recipe-image-container']}>
                <FallbackImage className={styles['recipe-image']} src={image} alt={"/images/food.jpg"} />
            </div>
        </>
    );
}