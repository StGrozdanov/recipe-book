import styles from './Navigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAnimationDelay } from '../../hooks/useAnimationDelay';
import NavigationLinks from './modules/NavigationLinks/NavigationLinks';
import BurgerMenu from './modules/BurgerMenu/BurgerMenu';
import Notification from '../common/Notification/Notification';
import { Link, useNavigate } from 'react-router-dom';

const unmountedStyle = { left: '50vw', bottom: '100%', transition: 'all .6s ease-in' };
const inputUnmountedStyle = { background: 'white', transition: 'all 0.7s ease-in' };
const burgerMenuDefaultState = { burgerMenuIsClicked: false, burgerMenuDropdownIsShown: false };

export default function Navigation() {
    const [burgerMenuState, setBurgerMenuState] = useState(burgerMenuDefaultState);
    const [showSearch, setShowSearch] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState('');
    const navigate = useNavigate();

    const shouldRenderSearch = useAnimationDelay(showSearch, 1000);
    const shouldRenderDropdown = useAnimationDelay(burgerMenuState.burgerMenuDropdownIsShown, 1000);

    function burgerMenuClickHandler() {
        if (burgerMenuState.burgerMenuIsClicked) {
            setBurgerMenuState({ burgerMenuDropdownIsShown: false, burgerMenuIsClicked: false });
        } else {
            setBurgerMenuState({ burgerMenuDropdownIsShown: true, burgerMenuIsClicked: true });
        }
    }

    function searchHandler(e) {
        e.preventDefault();

        if (searchInputValue.trim() != '') {
            navigate(`/search?=${searchInputValue}`);
            setSearchInputValue('');
            setShowSearch(false);
        } else {
            setShowNotification(true);
        }
    }

    function notificationHandler() {
        showNotification ? setShowNotification(false) : setShowNotification(true);
    }

    return (
        <nav className={styles.navigation}>
            <Link style={{ textDecoration: 'none' }} to={'/'}>
                <h4 className={styles.logo}>All The Best
                    <div className={styles['logo-container']}>
                        <img src="/images/cooking.png" />
                    </div>
                    Recipes
                </h4>
            </Link>
            {
                shouldRenderDropdown
                    ? <NavigationLinks
                        showDropdown={burgerMenuState.burgerMenuDropdownIsShown}
                        handler={burgerMenuClickHandler}
                        additionalStyle={true}
                    />
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
                <form
                    className={styles['search-article']}
                    style={!showSearch ? unmountedStyle : null}
                    onSubmit={searchHandler}
                >
                    <FontAwesomeIcon
                        className={styles['search-input-icon']}
                        icon={faMagnifyingGlass}
                        onClick={searchHandler}
                    />
                    <input
                        className={styles['search-input']}
                        type="text"
                        placeholder='Търсете по име на рецепта ...'
                        style={!showSearch ? inputUnmountedStyle : null}
                        defaultValue={searchInputValue}
                        onChange={(e) => setSearchInputValue(e.target.value)}
                    />
                    <FontAwesomeIcon
                        className={styles['cancel-input-icon']}
                        icon={faXmark}
                        onClick={() => setShowSearch(false)}
                    />
                </form>
            }
            <BurgerMenu
                handler={burgerMenuClickHandler}
                style={{ position: 'absolute', right: '3vw' }}
                clicked={burgerMenuState.burgerMenuIsClicked}
            />
            <Notification 
                type={'warning'}
                visibility={showNotification}
                handler={notificationHandler} 
                message={'Добър опит! Сега пробвайте и с буквички.'} 
            />
        </nav >
    )
}