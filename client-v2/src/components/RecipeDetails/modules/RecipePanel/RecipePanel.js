import RecipeProducts from "../RecipeProducts/RecipeProducts";
import styles from './RecipePanel.module.scss';
import { useState } from "react";
import RecipeComment from "../RecipeComment/RecipeComment";
import RecipeNavigation from "./modules/RecipeNavigation";
import { useLocation } from "react-router-dom";
import * as commentService from '../../../../services/commentService'

const views = {
    '/': (recipe) =>
        <RecipeProducts
            preparationTime={recipe.preparationTime}
            calories={recipe.calories}
            products={recipe.products}
            protein={recipe.protein}
        />,
    'comments': (comment) =>
        <RecipeComment
            key={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            owner={comment.owner}
        />
}

export default function RecipePanel({ recipe }) {
    const location = useLocation();
    const currentSection = location.pathname.split('/')[3] == undefined ? '/' : location.pathname.split('/')[3];
    const [comments, setComments] = useState([]);

    if (currentSection === 'comments' && recipe.id) {
        commentService
            .getCommentsForRecipe(recipe.id)
            .then(comments => setComments(comments))
            .catch(err => console.log(err));
    }

    return (
        <article className={styles.container}>
            {
                currentSection == '/'
                    ?
                    views[currentSection](recipe)
                    :
                    <>
                        <h1 className={styles.heading}>Коментари</h1>
                        {comments.map(comment => views[currentSection](comment))}
                    </>
            }
            <RecipeNavigation recipeId={recipe.id} />
        </article>
    );
}