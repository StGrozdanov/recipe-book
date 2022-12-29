import styles from './Categorization.module.scss';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import * as filtrationService from '../../services/filtrationService'
import { capitalizatorUtil } from '../../utils/capitalizatorUtil';
import { useEffect, useState } from 'react';
import { setToString } from './utils/setToString';

export default function Categorization() {
    const location = useLocation();
    const [recipes, setRecipes] = useState([]);

    let query = new Set();
    const decodedParams = decodeURI(location.search.split('=')[1].split('&') || '');
    decodedParams.split(',').forEach(param => query.add(param));

    useEffect(() => {
        if (query && query.size <= 4) {
            filtrationService
                .filterByCategory(query)
                .then(recipes => setRecipes(recipes))
                .catch(error => console.log(error));
        }
    }, []);

    return (
        <section className={styles["category-section"]} style={{ minHeight: '75vh' }}>
            <ul className={styles["recipe-card-list"]}>
                <h2 className={styles["filtration-heading"]}>
                    Рецепти от категория "{setToString(query)}"
                </h2>
                {
                    recipes.length > 0
                        ?
                        recipes.map(recipe => {
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
                        :
                        <div className={styles['no-results']}>
                            <h3>Все още няма рецепти от тази категория</h3>
                        </div>
                }
            </ul>
            <BackToTopButton scrollVisibility={0} />
        </section >
    );
}