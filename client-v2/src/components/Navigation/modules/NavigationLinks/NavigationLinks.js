import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './NavigationLinks.module.scss';

const unmountedStyleDropdown = {
    display: 'flex',
    flexDirection: 'column',
    top: '100vh',
    transition: 'all 700ms ease-in'
};

export default function NavigationLinks({ showDropdown, additionalStyle = false }) {
    return (
        <ul
            className={styles['nav-ul']}
            style={
                additionalStyle
                    ? showDropdown ? { display: 'flex', flexDirection: 'column' } : unmountedStyleDropdown
                    : null
            }
        >
            <div
                className={styles['nav-logo']}
                style={showDropdown ? { display: 'initial' } : { display: 'none' }}
            >
                <img src="/images/cooking.png" />
            </div>

            <li className={styles['nav-item']}>
                <Link to={'/catalogue'} className={styles.item}>Каталог</Link>
            </li>

            <li className={styles['dropdown-nav-item']}>
                <Link to={'/categories'} className={styles.item}>Категории</Link>
                <FontAwesomeIcon className={styles['dropdown-icon']} icon={faAngleDown} />
                <div className={styles['dropdown-menu']}>
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
                <Link to={'/login'} className={styles.item}>Вход</Link>
            </li>

            <li className={styles['nav-item']}>
                <Link to={'/user-profile'} className={styles.item}>Моят Профил</Link>
            </li>

            <li className={styles['nav-item']}>
                <Link to={'/create'} className={styles.item}>Създай Рецепта</Link>
            </li>

        </ul>
    )
}