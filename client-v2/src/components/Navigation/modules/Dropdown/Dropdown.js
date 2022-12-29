import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dropdown.module.scss';

export default function Dropdown({ style }) {
    const [checkedBoxes, setCheckedBoxes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/categories?=${checkedBoxes.join('&')}`);
    }, [checkedBoxes])

    function checkboxHandler(e) {
        const isChecked = e.target.checked;
        const boxName = e.target.value;

        if (isChecked) {
            if (checkedBoxes.includes(boxName) === false) {
                setCheckedBoxes((boxes) => [...boxes, boxName]);
            }
        } else {
            setCheckedBoxes(checkedBoxes.filter(box => box !== boxName));
        }
    }

    return (
        <div className={styles['dropdown-menu']} style={style}>
            <label htmlFor="all-categories">
                <input
                    type="checkbox"
                    defaultValue={"Всички"}
                    onChange={checkboxHandler}
                    defaultChecked
                />
                <span></span>
                Всички
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Пилешко"}
                    onChange={checkboxHandler}
                />
                <span></span>
                Пилешко
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Свинско"}
                    onChange={checkboxHandler} />
                <span></span>
                Свинско
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Телешко"}
                    onChange={checkboxHandler} />
                <span></span>
                Телешко
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Телешко\-свинско"}
                    onChange={checkboxHandler} />
                <span></span>
                Телешко-свинско
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Риба"}
                    onChange={checkboxHandler} />
                <span></span>
                Риба
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Други месни"}
                    onChange={checkboxHandler} />
                <span></span>
                Други месни
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Вегитариански"}
                    onChange={checkboxHandler} />
                <span></span>
                Вегитариански
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Салати"}
                    onChange={checkboxHandler} />
                <span></span>
                Салати
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Тестени"}
                    onChange={checkboxHandler} />
                <span></span>
                Тестени
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Десерти"}
                    onChange={checkboxHandler} />
                <span></span>
                Десерти
            </label>
            <label>
                <input
                    type="checkbox"
                    defaultValue={"Други"} onChange={checkboxHandler} />
                <span></span>
                Други
            </label>
        </div>
    );
}