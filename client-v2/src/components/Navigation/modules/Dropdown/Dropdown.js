import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Dropdown.module.scss';

export default function Dropdown({ style }) {
    const [checkedBoxes, setCheckedBoxes] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        expandCheckboxWithSelectedCategories();
    }, []);

    useEffect(() => {
        if (checkedBoxes.length > 0) {
            navigate(`/categories?=${checkedBoxes.join('&')}`);
        }
    }, [checkedBoxes])

    function checkboxHandler(e) {
        const checkboxContainer = e.target.parentNode.parentNode;
        const allCheckboxes = checkboxContainer.querySelectorAll('[type=checkbox]');

        const currentBoxIsChecked = e.target.checked;
        const currentBoxName = e.target.value;

        const allCategoriesCheckbox = checkboxContainer.querySelector('#all-categories');
        const allCategoriesBoxName = allCategoriesCheckbox.value;

        if (allCategoriesBoxName === currentBoxName && checkedBoxes.length === 0) {
            allCategoriesCheckbox.checked = true;
            return;
        } else if (allCategoriesBoxName !== currentBoxName && checkedBoxes.length >= 0) {
            allCategoriesCheckbox.checked = false;
        }

        if (currentBoxIsChecked) {
            if (currentBoxName === allCategoriesBoxName) {
                navigate('/catalogue');
                allCheckboxes.forEach((c, index) => {
                    if (index > 0) {
                        c.checked = false;
                    }
                });
                setCheckedBoxes([]);
            }
            if (checkedBoxes.includes(currentBoxName) === false && currentBoxName !== allCategoriesBoxName) {
                if (checkedBoxes.length > 3) {
                    e.target.checked = false;
                    return console.log('You can select up to 4 categories');
                }
                setCheckedBoxes((boxes) => [...boxes, currentBoxName]);
            }
        } else {
            setCheckedBoxes(checkedBoxes.filter(box => box !== currentBoxName));
            if (checkedBoxes.length === 1) {
                navigate('/catalogue');
                allCategoriesCheckbox.checked = true;
            }
        }
    }

    function expandCheckboxWithSelectedCategories() {
        if (location.search) {
            const params = decodeURI(location.search.split('=')[1].split('&') || '').split(',');

            const checks = document.querySelectorAll('[type=checkbox]');

            Array.from(checks)
                .filter(c => params.includes(c.defaultValue))
                .map(element => element.checked = true);

            document.getElementById('all-categories').checked = false;
        }
    }

    return (
        <div className={styles['dropdown-menu']} style={style}>
            <label>
                <input
                    type="checkbox"
                    id='all-categories'
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