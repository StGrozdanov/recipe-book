import styles from './BurgerMenu.module.scss';

export default function BurgerMenu({ handler, style, clicked }) {
    return (
        <button
            className={styles.button}
            aria-expanded={clicked}
            onClick={handler}
            style={style}
        >
            <svg className={styles.hamburger} viewBox="0 0 100 100" width={clicked ? 36 : 45}>
                <rect
                    className={styles.top}
                    width={clicked ? 80 : 90}
                    height={10}
                    x={10}
                    y={25}
                    rx={5}
                />
                <rect
                    className={styles.mid}
                    width={clicked ? 80 : 75}
                    height={10}
                    x={10}
                    y={45}
                    rx={5}
                />
                <rect
                    className={styles.bottom}
                    width={clicked ? 80 : 55}
                    height={10}
                    x={10}
                    y={65}
                    rx={5}
                />
            </svg>
        </button>
    );
}