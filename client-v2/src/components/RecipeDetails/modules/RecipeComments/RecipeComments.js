import { useEffect, useState } from "react";
import Comment from "./modules/Comment";
import styles from './RecipeComments.module.scss';
import * as commentService from '../../../../services/commentService';
import { useParams } from "react-router-dom";
import { useAuthContext } from '../../../../hooks/useAuthContext';
import FallbackImage from "../../../common/FallbackImage/FallbackImage";

export default function RecipeComments() {
    const params = useParams();
    const { user, userIsAuthenticated } = useAuthContext();
    const [comments, setComments] = useState([]);
    const recipeId = Number(params.id);

    useEffect(() => {
        commentService
            .getCommentsForRecipe(recipeId)
            .then(comments => setComments(comments))
            .catch(err => console.log(err));
    }, [setComments]);

    async function addCommentHandler(e) {
        e.preventDefault();
        const comment = new FormData(e.target).get('comment');

        if (comment.trim() !== '') {
            const content = { content: comment, targetRecipeId: recipeId, ownerId: user.id };
            await commentService.commentRecipe(content);
            commentService
                .getCommentsForRecipe(recipeId)
                .then(data => setComments(data))
                .catch(err => console.log(err));
            e.target.reset();
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
                        <FallbackImage src={user.avatarUrl || null} alt={"/images/avatar.png"} />
                    </div>
                    <form onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            placeholder="Добави коментар ..."
                            name="comment"
                        />
                    </form>
                </section>
            </article>
        </>
    );
}