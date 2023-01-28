import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './NavigationLinks.module.scss';
import Dropdown from '../Dropdown/Dropdown';
import { useState } from 'react';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import * as authService from '../../../../services/authenticationService';

const unmountedStyleDropdown = {
    display: 'flex',
    flexDirection: 'column',
    top: '100vh',
    transition: 'all 700ms ease-in'
};

export default function NavigationLinks({ showDropdown, additionalStyle = false, handler }) {
    const [dropdownIsExpanded, setDropdownIsExpanded] = useState(false);
    const { userIsAuthenticated, userLogout } = useAuthContext();

    function navItemClickHandler() {
        if (handler) {
            handler();
        }
    }

    function mobileDropdownClickHandler() {
        if (handler && window.innerWidth <= 450) {
            handler();
        }
    }

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

            {
                userIsAuthenticated
                    ? (
                        <>
                            <li className={styles['nav-item']}>
                                <Link
                                    to={'/catalogue'}
                                    className={styles.item}
                                    onClick={navItemClickHandler}
                                >
                                    Каталог
                                </Link>
                            </li>

                            <li
                                className={styles['dropdown-nav-item']}
                                onMouseEnter={() => setDropdownIsExpanded(true)}
                                onMouseLeave={() => setDropdownIsExpanded(false)}
                            >
                                <div className={styles['categories-item']}>Категории</div>
                                <FontAwesomeIcon className={styles['dropdown-icon']} icon={faAngleDown} />
                                <Dropdown
                                    style={dropdownIsExpanded ? { visibility: 'visible', opacity: 1 } : null}
                                    dropdownHandler={mobileDropdownClickHandler}
                                />
                            </li>

                            <li className={styles['nav-item']}>
                                <Link to={'/user-profile'} className={styles.item} onClick={navItemClickHandler}>Моят Профил</Link>
                            </li>

                            <li className={styles['nav-item']}>
                                <Link to={'/create'} className={styles.item} onClick={navItemClickHandler}>Създай Рецепта</Link>
                            </li>

                            <li className={styles['nav-item']}>
                                <Link
                                    to={'/catalogue'}
                                    className={styles.item}
                                    onClick={() => {
                                        authService
                                            .logout()
                                            .then(userLogout())
                                            .catch(err => {
                                                console.log(err);
                                            });
                                        navItemClickHandler();
                                    }}
                                >
                                    Изход
                                </Link>
                            </li>
                        </>
                    )
                    : (
                        <>
                            <li className={styles['nav-item']}>
                                <Link
                                    to={'/catalogue'}
                                    className={styles.item}
                                    onClick={navItemClickHandler}
                                >
                                    Каталог
                                </Link>
                            </li>

                            <li
                                className={styles['dropdown-nav-item']}
                                onMouseEnter={() => setDropdownIsExpanded(true)}
                                onMouseLeave={() => setDropdownIsExpanded(false)}
                            >
                                <div className={styles['categories-item']}>Категории</div>
                                <FontAwesomeIcon className={styles['dropdown-icon']} icon={faAngleDown} />
                                <Dropdown
                                    style={dropdownIsExpanded ? { visibility: 'visible', opacity: 1 } : null}
                                    dropdownHandler={mobileDropdownClickHandler}
                                />
                            </li>

                            <li className={styles['nav-item']}>
                                <Link to={'/login'} onClick={navItemClickHandler} className={styles.item}>Вход</Link>
                            </li>
                        </>
                    )
            }
        </ul>
    )
}