import { useState } from "react";
import Comment from "./modules/Comment";
import styles from './RecipeComments.module.scss';
import * as commentService from '../../../../services/commentService';
import { useParams } from "react-router-dom";
import { useAuthContext } from '../../../../hooks/useAuthContext';
import FallbackImage from "../../../common/FallbackImage/FallbackImage";

export default function RecipeComments({ comments }) {
    const [comment, setComment] = useState('');
    const params = useParams();
    const { user, userIsAuthenticated } = useAuthContext();

    function addCommentHandler(e) {
        e.preventDefault();
        if (comment.trim() !== '') {
            const content = { comment: comment, targetRecipeId: params.id, ownerId: user.id };
            commentService.commentRecipe(content);
        }
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
                <section className={styles['add-comment-section']}>
                    <div className={styles['image-container']}>
                        <FallbackImage src={null} alt={"/images/avatar.png"} />
                    </div>
                    <form onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            placeholder="Добави коментар ..."
                            defaultValue={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </form>
                </section>
            </article>
        </>
    );
}