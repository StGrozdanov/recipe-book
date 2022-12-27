import { Link } from 'react-router-dom';
import styles from './LandingComments.module.scss';

export default function LandingComments({
    id,
    content,
    createdAt,
    recipe,
    owner,
    isInViewport,
    animationDelay
}) {
    return (
        isInViewport ?
            <article className={styles.comment} style={{ animationDelay }}>
                <header className={styles['comment-header']}>
                    <h3 className={styles['comment-username']}>{owner.username}, </h3>
                    <Link to={`/users/${id}`}>
                        <div className={styles['image-container']}>
                            <img src={owner.avatarUrl} />
                        </div>
                    </Link>
                    <span className={styles['target-recipe']}>{recipe.recipeName}</span>
                    <span className={styles.date}>{createdAt.replace('T', ', ').substring(0, 17)}</span>
                </header>
                <main className={styles.content}>{content}</main>
            </article>
            : null
    );
}