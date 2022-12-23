import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import styles from './LandingHeader.module.scss';
import { smoothScroll } from '../../../../utils/smoothScroll';

export default function LandingHeader() {
    return (
        <header>
            <div className={styles['landing-background-container']}>
                <img className={styles["landing-background"]} src="images/welcome-2.jpg" alt="welcome" />
            </div>
            <img className={styles["landing-welcome"]} src="images/welcome.jpg" alt="Welcome!" />
            <FontAwesomeIcon
                onClick={() => smoothScroll()}
                className={styles.icon}
                icon={faAnglesDown}
                beatFade
            />
        </header>
    );
}