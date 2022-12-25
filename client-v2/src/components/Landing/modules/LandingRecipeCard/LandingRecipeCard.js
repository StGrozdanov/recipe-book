import styles from './LandingRecipeCard.module.scss';

export default function LandingRecipeCard({ imageUrl, recipeName, category, animation, animationDelay }) {
    return (
        animation ?
            <article className={styles["card-container"]} style={{animationDelay}}>
                <header className={styles["picture-container"]}>
                    <img src={imageUrl} />
                </header>
                <main>
                    <h4 className={styles["recipe-name"]}>{recipeName}</h4>
                </main>
                <footer className={styles["card-footer"]}>{category}</footer>
            </article >
            : null
    );
}