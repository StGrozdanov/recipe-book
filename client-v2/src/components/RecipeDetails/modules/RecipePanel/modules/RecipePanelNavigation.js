import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faComment, faPenToSquare, faShareNodes, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './RecipePanelNavigation.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const selectedStyle = { backgroundSize: '100% 0.15em', color: '#57595fc9' };

export default function RecipePanelNavigation({ recipeId }) {
    const [selected, setSelected] = useState('products');
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        pathname.endsWith('comments') ? setSelected('comments') : setSelected('products');
    }, [pathname])

    return (
        <nav className={styles.navigation}>
            <ul>
                <FontAwesomeIcon
                    style={selected == 'products' && selectedStyle}
                    icon={faCartShopping}
                    className={styles['nav-icon']}
                    onClick={() => navigate(`/details/${recipeId}`)}
                />
                <FontAwesomeIcon
                    style={selected == 'comments' && selectedStyle}
                    icon={faComment}
                    className={styles['nav-icon']}
                    onClick={() => navigate(`/details/${recipeId}/comments`)}
                />
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className={styles['nav-icon']}
                />
                <FontAwesomeIcon
                    icon={faTrashCan}
                    className={styles['nav-icon']}
                />
                <FontAwesomeIcon
                    icon={faShareNodes}
                    className={styles['nav-icon']}
                />
            </ul>
        </nav>
    );
}