import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Card.module.scss';

export default function Card({ leftAlignPercentage, heading, text, icon }) {
    return (
        <div className={styles.outter} style={{ left: leftAlignPercentage }}>
            <article className={styles.content}>
                <FontAwesomeIcon className={styles.icon} icon={icon} />
                <h5 className={styles.text}>{heading}</h5>
                <p className={styles.text}>{text}</p>
            </article>
            <div className={styles.inner}></div>
        </div>
    )
}