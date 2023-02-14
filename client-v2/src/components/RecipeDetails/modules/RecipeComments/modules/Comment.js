import { Link } from 'react-router-dom';
import FallbackImage from '../../../../common/FallbackImage/FallbackImage';
import styles from './Comment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Comment({ content, createdAt, owner }) {
    return (
        <article className={styles.comment}>
            <header className={styles['comment-header']}>
                <Link to={`/users/${owner.id}`}>
                    <div className={styles['image-container']}>
                        <FallbackImage src={owner.avatarUrl} alt={"/images/avatar.png"} />
                    </div>
                </Link>
                <Link to={`/users/${owner.id}`}>
                    <h3 className={styles['comment-username']}>{owner.username}</h3>
                </Link>
                <span className={styles.date}>{createdAt.replace('T', ', ').substring(0, 17)}</span>
            </header>
            <main className={styles.content}>
                <section className={styles['icon-container']}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        className={styles.icon}
                    />
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        className={styles.icon}
                    />
                </section>
                {content}
            </main>
        </article>
    );
}