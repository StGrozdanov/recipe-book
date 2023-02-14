import RecipeProducts from "../RecipeProducts/RecipeProducts";
import styles from './RecipePanel.module.scss';
import { useState } from "react";
import RecipeNavigation from "./modules/RecipeNavigation";
import { useLocation } from "react-router-dom";
import * as commentService from '../../../../services/commentService'
import RecipeComments from "../RecipeComments/RecipeComments";

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
                    ? <RecipeProducts {...recipe} />
                    : <RecipeComments comments={comments} />
            }
            <RecipeNavigation recipeId={recipe.id} />
        </article>
    );
}