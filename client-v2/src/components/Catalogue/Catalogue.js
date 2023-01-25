import { useEffect, useRef, useState } from 'react';
import * as recipeService from '../../services/recipeService';
import styles from './Catalogue.module.scss';
import RecipeCard from '../RecipeCard/RecipeCard';
import BackToTopButton from '../common/BackToTopButton/BackToTopButton';
import { useEndlessScroll } from '../../hooks/useEndlessScroll';
import { capitalizatorUtil } from '../../utils/capitalizatorUtil';
import recipesFallback from './recipesFallback.json';
import Notification from '../common/Notification/Notification'

export default function Catalogue() {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fallbackIsLoaded, setFallbackIsLoaded] = useState(false);
    const loader = useRef(null);
    useEndlessScroll(loader, incrementPageHandler);

    useEffect(() => {
        recipeService
            .getAllRecipes(currentPage)
            .then(recipes => setRecipes((oldRecipes) => [...oldRecipes, ...recipes.content]))
            .catch(err => {
                console.log(err);
                setRecipes(recipesFallback.content);
                setFallbackIsLoaded(true);
            });
    }, [currentPage]);

    function incrementPageHandler() {
        setCurrentPage((prev) => prev + 1);
    }

    function notificationHandler() {
        fallbackIsLoaded ? setFallbackIsLoaded(false) : setFallbackIsLoaded(true);
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
                        : <h1 style={{ minHeight: '100vh' }}>Зареждаме Рецептите...</h1>
                }
            </ul>
            <div ref={loader} />
            <BackToTopButton scrollVisibility={0} />
            <Notification
                type={'fail'}
                visibility={fallbackIsLoaded}
                message={'Здравейте, имаме проблем с зареждането на всички рецепти. Поради това, сайта работи с ограничени функционалности. Вече работим по отстраняването му.'}
                handler={notificationHandler}
            />
        </section >
    )
}