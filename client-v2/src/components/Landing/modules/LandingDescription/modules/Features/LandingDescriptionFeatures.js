import { fas, faUser } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Card from '../Card/Card';
import styles from './LandingDescriptionFeatures.module.scss';


export default function LandingDescriptionFeatures() {
    return (
        <section className={styles.features}>
            <div className={styles['features-image-container']}>
                <img className={styles["features-image"]} src="images/welcome-3.jpg" alt="welcome" />
            </div>
            <Card
                leftAlignPercentage={'20%'}
                heading={'Потребителски Профил'}
                text={'Използвайте за лична готварска книга на база съдържанието на сайта.'}
                icon={faUser}
            />
            <Card
                leftAlignPercentage={'40%'}
                heading={'Любими Рецепти'}
                text={'Получавате лесен и бърз достъп до всяка рецепта, обозначена като любима.'}
                icon={faStar}
            />
            <Card
                leftAlignPercentage={'60%'}
                heading={'Създадени Рецепти'}
                text={'Получавате лесен и бърз достъп до рецептите, които сте създали.'}
                icon={faBookOpen}
            />
            <Card
                leftAlignPercentage={'80%'}
                heading={'Коментари'}
                text={'Изкажете впечатлението си, за нещо което сте изпробвали.'}
                icon={faCommentDots}
            />
        </section>
    );
}