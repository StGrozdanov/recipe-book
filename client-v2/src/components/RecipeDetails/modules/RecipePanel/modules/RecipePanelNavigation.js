import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faComment, faPenToSquare, faShareNodes, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './RecipePanelNavigation.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const selectedStyle = { backgroundSize: '100% 0.15em', color: '#57595fc9' };

export default function RecipePanelNavigation({ recipeId }) {
    const [selected, setSelected] = useState('products');
    const navigate = useNavigate();

    function redirectOnSelectHandler(URL, buttonName) {
        setSelected(buttonName);
        navigate(URL);
    }

    return (
        <nav className={styles.navigation}>
            <ul>
                <FontAwesomeIcon
                    style={selected == 'products' && selectedStyle}
                    icon={faCartShopping}
                    className={styles['nav-icon']}
                    onClick={() => redirectOnSelectHandler(`/details/${recipeId}`, 'products')}
                />
                <FontAwesomeIcon
                    style={selected == 'comments' && selectedStyle}
                    icon={faComment}
                    className={styles['nav-icon']}
                    onClick={() => redirectOnSelectHandler(`/details/${recipeId}/comments`, 'comments')}
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