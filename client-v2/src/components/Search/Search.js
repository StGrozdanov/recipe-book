import styles from './Search.module.scss';
import { Link, useLocation } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import * as filtrationService from '../../services/filtrationService'
import { capitalizatorUtil } from '../../utils/capitalizatorUtil';
import { useEffect, useState } from 'react';

export default function Search() {
    const location = useLocation();
    const [recipes, setRecipes] = useState([]);

    const query = decodeURI(location.search.split('=')[1]);

    useEffect(() => {
        if (query.trim() != '') {
            filtrationService
                .searchByRecipeName(query.toLowerCase())
                .then(recipes => setRecipes(recipes))
                .catch(error => console.log(error));
        }
    }, [location]);

    return (
        <section className={styles["search-section"]} style={{ minHeight: '75vh' }}>
            <ul className={styles["recipe-card-list"]}>
                <h2 className={styles["filtration-heading"]}>Рецепти, съдържащи "{query}" в името си:</h2>
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
                            <h3>Все още няма такива рецепти. Можете да добавите първата или да се върнете на каталога</h3><Link to="/catalogue" className={styles["return-anker"]}></Link>
                        </div>
                }
            </ul>
            <BackToTopButton scrollVisibility={0} />
        </section >
    );
}