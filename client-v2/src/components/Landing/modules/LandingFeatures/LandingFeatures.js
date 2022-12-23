import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import FeaturesCard from './FeaturesCard';
import styles from './LandingFeatures.module.scss';
import { useElementIsInViewport } from '../../../../hooks/useElementIsInViewport'
import { useRef } from 'react';
import features from './constants/featureCards';

export default function LandingDescriptionFeatures() {
    const featuresRef = useRef();
    const isInViewport = useElementIsInViewport(featuresRef);

    return (
        <>
            <section className={styles.features}>
                <div className={styles['features-image-container']}>
                    <img className={styles["features-image"]} src="images/welcome-3.jpg" alt="welcome" />
                </div>
                {isInViewport && (
                    <>
                        <FeaturesCard
                            {...features.profile}
                            leftAlignPercentage={'10%'}
                            icon={faUser}
                            animationDelay={'300ms'}
                        />
                        <FeaturesCard
                            {...features.favourites}
                            leftAlignPercentage={'30%'}
                            icon={faStar}
                            animationDelay={'600ms'}
                        />
                        <FeaturesCard
                            {...features.createdRecipes}
                            leftAlignPercentage={'50%'}
                            icon={faBookOpen}
                            animationDelay={'900ms'}
                        />
                        <FeaturesCard
                            {...features.comments}
                            leftAlignPercentage={'70%'}
                            icon={faCommentDots}
                            animationDelay={'1200ms'}
                        />
                    </>
                )}
            </section>
            <span ref={featuresRef} />
        </>
    );
}