import styles from './Navigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAnimationDelay } from '../../hooks/useAnimationDelay';
import NavigationLinks from './modules/NavigationLinks/NavigationLinks';
import BurgerMenu from './modules/BurgerMenu/BurgerMenu';

const unmountedStyle = { left: '50vw', bottom: '100%', transition: 'all .6s ease-in' };
const inputUnmountedStyle = { background: 'white', transition: 'all 0.7s ease-in' }

export default function Navigation() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const shouldRenderSearch = useAnimationDelay(showSearch, 1000);
    const shouldRenderDropdown = useAnimationDelay(showDropdown, 1000);

    function showDropdownHandler() {
        showDropdown ? setShowDropdown(false) : setShowDropdown(true);
    }

    return (
        <nav className={styles.navigation}>
            <h4 className={styles.logo}>All The Best
                <div className={styles['logo-container']}>
                    <img src="/images/cooking.png" />
                </div>
                Recipes
            </h4>
            {
                shouldRenderDropdown
                    ? <NavigationLinks showDropdown={showDropdown} additionalStyle={true} />
                    : <NavigationLinks showDropdown={false} />
            }
            <li className={styles['nav-item-search']}>
                <FontAwesomeIcon
                    className={styles.search}
                    icon={faMagnifyingGlass}
                    onClick={() => showSearch ? setShowSearch(false) : setShowSearch(true)}
                />
            </li>
            {
            shouldRenderSearch &&
                <article className={styles['search-article']} style={!showSearch ? unmountedStyle : null} >
                    <FontAwesomeIcon
                        className={styles['search-input-icon']}
                        icon={faMagnifyingGlass}
                    />
                    <input
                        className={styles['search-input']}
                        type="text"
                        placeholder='Търсете по име на рецепта ...'
                        style={!showSearch ? inputUnmountedStyle : null}
                    />
                    <FontAwesomeIcon
                        className={styles['cancel-input-icon']}
                        icon={faXmark}
                        onClick={() => setShowSearch(false)}
                    />
                </article>
                }
            <BurgerMenu handler={showDropdownHandler} style={{position: 'absolute', right: '3vw'}} />
        </nav >
    )
}