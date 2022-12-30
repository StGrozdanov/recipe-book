import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './NavigationLinks.module.scss';
import Dropdown from '../Dropdown/Dropdown';
import { useState } from 'react';

const unmountedStyleDropdown = {
    display: 'flex',
    flexDirection: 'column',
    top: '100vh',
    transition: 'all 700ms ease-in'
};

export default function NavigationLinks({ showDropdown, additionalStyle = false }) {
    const [dropdownIsExpanded, setDropdownIsExpanded] = useState(false);

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

            <li
                className={styles['dropdown-nav-item']}
                onMouseEnter={() => setDropdownIsExpanded(true)}
                onMouseLeave={() => setDropdownIsExpanded(false)}
            >
                <Link className={styles.item}>Категории</Link>
                <FontAwesomeIcon className={styles['dropdown-icon']} icon={faAngleDown} />
                <Dropdown style={dropdownIsExpanded ? { visibility: 'visible', opacity: 1 } : null} />
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