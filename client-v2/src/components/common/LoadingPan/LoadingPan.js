import styles from './LoadingPan.module.scss';

export default function LoadingPan({ style = null }) {
    return (
        <div className={styles.container} style={style}>
            <img src="/images/cooking-pan-loader.gif" alt="Loading..." />
        </div>
    );
}