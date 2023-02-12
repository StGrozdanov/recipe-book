import { useRef } from 'react';
import { useElementIsInViewport } from '../../../hooks/useElementIsInViewport';
import styles from './RecipeStep.module.scss';

export default function RecipeStep({ step, index, isInViewportHandler }) {
    const ref = useRef();
    const stepIsInViewport = useElementIsInViewport(ref, '-20px');
    stepIsInViewport && isInViewportHandler(index);

    return (
        <article ref={ref} className={styles.container}>
            <h6 className={styles.step}>СТЪПКА {index + 1}</h6>
            <span className={styles.text}>{step}</span>
        </article>
    );
}