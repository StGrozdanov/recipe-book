import styles from './Navigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAnimationDelay } from '../../hooks/useAnimationDelay';

export default function Navigation() {
    const [showSearch, setShowSearch] = useState(false);
    const shouldRenderSearch = useAnimationDelay(showSearch, 1000);
    const unmountedStyle = { left: '50vw', bottom: 100, background:'cornflowerblue', transition: 'all .6s ease-in' };

    return (
        <nav className={styles.navigation}>
            <h4 className={styles.logo}>All The Best
                <div className={styles['logo-container']}>
                    <img src="/images/cooking.png" />
                </div>
                Recipes
            </h4>
            <ul className={styles['nav-ul']}>
                <li className={styles['nav-item']}>
                    <a href="#" className={styles.item}>Начало</a>
                </li>

                <li className={styles['nav-item']}>
                    <a href="#" className={styles.item}>Каталог</a>
                </li>

                <li className={styles['dropdown-nav-item']}>
                    <a href="#" className={styles.item}>Категории</a>
                    <FontAwesomeIcon className={styles['dropdown-icon']} icon={faAngleDown} />
                    <div className={styles['dropdown-menu']} style={{}}>
                        <label htmlFor="all-categories">
                            <input type="checkbox" id="all-categories" value="Всички" /><span></span>Всички</label>
                        <label>
                            <input type="checkbox" value="Пилешко" /><span></span>Пилешко</label>
                        <label>
                            <input type="checkbox" value="Свинско" /><span></span>Свинско</label>
                        <label>
                            <input type="checkbox" value="Телешко" /><span></span>Телешко</label>
                        <label>
                            <input type="checkbox" value="Телешко\-свинско" /><span></span>Телешко-свинско</label>
                        <label>
                            <input type="checkbox" value="Риба" /><span></span>Риба</label>
                        <label>
                            <input type="checkbox" value="Други месни" /><span></span>Други месни</label>
                        <label>
                            <input type="checkbox" value="Вегитариански" /><span></span>Вегитариански</label>
                        <label>
                            <input type="checkbox" value="Салати" /><span></span>Салати</label>
                        <label>
                            <input type="checkbox" value="Тестени" /><span></span>Тестени</label>
                        <label>
                            <input type="checkbox" value="Десерти" /><span></span>Десерти</label>
                        <label>
                            <input type="checkbox" value="Други" /><span></span>Други</label>
                    </div>
                </li>

                <li className={styles['nav-item']}>
                    <a href="#" className={styles.item}>Вход</a>
                </li>

                <li className={styles['nav-item-search']}>
                    <FontAwesomeIcon
                        className={styles.search}
                        icon={faMagnifyingGlass}
                        onClick={() => showSearch ? setShowSearch(false) : setShowSearch(true)}
                    />
                    {shouldRenderSearch &&
                        <article className={styles['search-article']} style={!showSearch ? unmountedStyle : null} >
                            <FontAwesomeIcon
                                className={styles['search-input-icon']}
                                icon={faMagnifyingGlass}
                            />
                            <input
                                className={styles['search-input']}
                                type="text"
                                placeholder='Търсете по име на рецепта ...'
                            />
                            <FontAwesomeIcon
                                className={styles['cancel-input-icon']}
                                icon={faXmark}
                                onClick={() => setShowSearch(false)}
                            />
                        </article>}
                </li>
            </ul>
        </nav >
    )
}