import { useState } from 'react';
import styles from './ModalDialogue.module.scss';

const unmountedStyleModal = {
    opacity: 0,
    top: '100vh',
    transition: 'all 700ms ease-in'
};

const mountedStyleModal = {
    opacity: 1,
    bottom: '100vh',
    transition: 'all 400ms ease-in'
};

export default function ModalDialogue({ content, visibility, handler }) {
    return (
        <article
            className={styles.container}
            style={!visibility ? unmountedStyleModal : mountedStyleModal}
        >
            <h1>{content}</h1>
            <section className={styles['button-container']}>
                <button
                    className={styles['confirm-btn']}
                    onClick={() => handler(true)}
                >
                    Да
                </button>
                <button
                    className={styles['cancel-btn']}
                    onClick={() => handler(false)}
                >
                    Отказ
                </button>
            </section>
        </article>
    );
}