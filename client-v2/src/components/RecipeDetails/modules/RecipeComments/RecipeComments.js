import Comment from "./modules/Comment";
import styles from './RecipeComments.module.scss';

export default function RecipeComments({ comments }) {
    return (
        <>
            <h1 className={styles.heading}>Коментари</h1>
            <article className={styles.container}>
                {
                    comments.length > 0
                        ?
                        comments.map(comment =>
                            <Comment
                                key={comment.id}
                                content={comment.content}
                                createdAt={comment.createdAt}
                                owner={comment.owner}
                            />)
                        :
                        <h3 className={styles['no-comments']}>Все още няма коментари за тази рецепта.</h3>
                }
            </article>
        </>
    );
}