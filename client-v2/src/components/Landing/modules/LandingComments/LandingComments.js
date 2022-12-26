import styles from './LandingComments.module.scss';

export default function LandingComments({ content, createdAt, recipe, owner }) {
    return (
        <article className={styles.comment}>
            <header className={styles['comment-header']}>
                <h3 className={styles['comment-username']}>{owner.username}, </h3>
                <div className={styles['image-container']}>
                    <img src={owner.avatarUrl} />
                </div>
                <span className={styles['target-recipe']}>{recipe.recipeName}</span>
                <span className={styles.date}>{createdAt.replace('T', ', ').substring(0, 17)}</span>
            </header>
            <main className={styles.content}>{content}</main>
        </article>
    );
}