import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FeaturesCard.module.scss';

export default function FeaturesCard({ leftAlignPercentage, heading, text, icon, animationDelay }) {
    return (
        <div className={styles.outter} style={{ left: leftAlignPercentage, animationDelay }}>
            <article className={styles.content}>
                <FontAwesomeIcon className={styles.icon} icon={icon} />
                <h5 className={styles['text-heading']}>{heading}</h5>
                <p className={styles.text}>{text}</p>
            </article>
            <div className={styles.inner}></div>
        </div>
    )
}