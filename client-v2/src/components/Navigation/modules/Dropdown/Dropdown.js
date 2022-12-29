import styles from './Dropdown.module.scss';

export default function Dropdown({ style }) {
    

    return (
        <div className={styles['dropdown-menu']} style={style}>
            <label htmlFor="all-categories">
                <input type="checkbox" id="all-categories" value="Всички" /><span></span>Всички</label>
            <label>
                <input type="checkbox" value="Пилешко" /><span></span>Пилешко</label>
            <label>
                <input type="checkbox" value="Свинско" /><span></span>Свинско</label>
            <label>
                <input type="checkbox" value="Телешко" /><span></span>Телешко</label>
            <label>
                <input type="checkbox" value="Телешко\-свинско" /><span></span>Телешко-свинско</label>
            <label>
                <input type="checkbox" value="Риба" /><span></span>Риба</label>
            <label>
                <input type="checkbox" value="Други месни" /><span></span>Други месни</label>
            <label>
                <input type="checkbox" value="Вегитариански" /><span></span>Вегитариански</label>
            <label>
                <input type="checkbox" value="Салати" /><span></span>Салати</label>
            <label>
                <input type="checkbox" value="Тестени" /><span></span>Тестени</label>
            <label>
                <input type="checkbox" value="Десерти" /><span></span>Десерти</label>
            <label>
                <input type="checkbox" value="Други" /><span></span>Други</label>
        </div>
    );
}