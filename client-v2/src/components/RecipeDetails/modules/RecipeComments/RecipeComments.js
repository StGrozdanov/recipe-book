import { useState } from "react";
import Comment from "./modules/Comment";
import styles from './RecipeComments.module.scss';

export default function RecipeComments({ comments }) {
    const [comment, setComment] = useState('');

    function addCommentHandler() {
        
    }

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
                <section>
                    <form onSubmit={addCommentHandler}>
                        <input type="text" placeholder="Добави коментар ..." />
                    </form>
                </section>
            </article>
        </>
    );
}