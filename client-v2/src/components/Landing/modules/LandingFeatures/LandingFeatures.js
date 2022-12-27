import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import FeaturesCard from './FeaturesCard';
import styles from './LandingFeatures.module.scss';
import features from './constants/featureCards';
import { useRef } from 'react';
import { useElementIsInViewport } from '../../../../hooks/useElementIsInViewport';

export default function LandingDescriptionFeatures() {
    const featuresRef = useRef(null);
    const isInViewport = useElementIsInViewport(featuresRef);

    return (
        <section className={styles.features}>
            <span ref={featuresRef} />
            <div className={styles['features-image-container']}>
                <img className={styles["features-image"]} src="images/welcome-3.jpg" alt="welcome" />
            </div>
            <FeaturesCard
                {...features.profile}
                leftAlignPercentage={'10%'}
                icon={faUser}
                animationDelay={'300ms'}
                animation={isInViewport}
            />
            <FeaturesCard
                {...features.favourites}
                leftAlignPercentage={'30%'}
                icon={faStar}
                animationDelay={'600ms'}
                animation={isInViewport}
            />
            <FeaturesCard
                {...features.createdRecipes}
                leftAlignPercentage={'50%'}
                icon={faBookOpen}
                animationDelay={'900ms'}
                animation={isInViewport}
            />
            <FeaturesCard
                {...features.comments}
                leftAlignPercentage={'70%'}
                icon={faCommentDots}
                animationDelay={'1200ms'}
                animation={isInViewport}
            />
        </section>
    );
}