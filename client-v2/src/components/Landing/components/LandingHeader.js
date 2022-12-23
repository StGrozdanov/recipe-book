import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import styles from './LandingHeader.module.scss';

export default function LandingHeader() {

    function navigateDownHandler() {
        const SCROLL_DOWN_RECIPE_CATALOGUE_VIEWPORT_VALUE = document.body.clientHeight / 0.39;

        window.scrollTo({
            top: SCROLL_DOWN_RECIPE_CATALOGUE_VIEWPORT_VALUE,
            behavior: "smooth"
        });
    }

    return (
        <header>
            <div className={styles['landing-background-container']}>
                <img className={styles["landing-background"]} src="images/welcome 2.jpg" alt="welcome" />
            </div>
            <img className={styles["landing-welcome"]} src="images/welcome.jpg" alt="Welcome!" />
            <FontAwesomeIcon
                onClick={navigateDownHandler}
                className={styles.icon}
                icon={faAnglesDown}
                beatFade
            />
        </header>
    );
}