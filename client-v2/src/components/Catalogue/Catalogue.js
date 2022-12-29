import { useEffect, useRef, useState } from 'react';
import * as recipeService from '../../services/recipeService';
import styles from './Catalogue.module.scss';
import RecipeCard from '../RecipeCard/RecipeCard';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import { useEndlessScroll } from '../../hooks/useEndlessScroll';
import { capitalizatorUtil } from '../../utils/capitalizatorUtil';

export default function Catalogue() {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const loader = useRef(null);
    useEndlessScroll(loader, incrementPageHandler);

    useEffect(() => {
        recipeService
            .getAllRecepies(currentPage)
            .then(recipes => setRecipes((oldRecipes) => [...oldRecipes, ...recipes.content]));
    }, [currentPage]);

    function incrementPageHandler() {
        setCurrentPage((prev) => prev + 1);
    }

    return (
        <section className={styles["cards-section"]}>
            <ul className={styles["recipe-card-list"]}>
                {
                    recipes.length > 0
                        ? recipes.map(recipe => {
                            recipe.recipeName = capitalizatorUtil(recipe.recipeName);
                            return (
                                <RecipeCard
                                    key={recipe.id}
                                    {...recipe}
                                    animation={true}
                                    style={{ margin: '40px 35px 10px 35px' }}
                                />
                            );
                        })
                        : <h1 style={{ minHeight: '100vh' }}>Loading Recipes...</h1>
                }
            </ul>
            <div ref={loader} />
            <BackToTopButton scrollVisibility={0} />
        </section >
    )
}