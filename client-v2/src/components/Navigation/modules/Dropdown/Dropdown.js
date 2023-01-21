import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopulateChecksOnRedirect } from './hooks/usePopulateChecksOnRedirect';
import { useHandleCheckboxes } from './hooks/useHandleCheckboxes';
import styles from './Dropdown.module.scss';
import Notification from '../../../common/Notification/Notification';

export default function Dropdown({ style, dropdownHandler }) {
    const [checkedBoxes, setCheckedBoxes] = useState([]);
    const [showNotification, setshowNotification] = useState(false);
    const navigate = useNavigate();

    const checksHandler = (checks) => setCheckedBoxes(checks);
    const notificationHandler = () => showNotification ? setshowNotification(false) : setshowNotification(true);

    usePopulateChecksOnRedirect(checksHandler);
    const checkboxHandler = useHandleCheckboxes(checkedBoxes, checksHandler, notificationHandler);

    useEffect(() => {
        if (checkedBoxes.length > 0) {
            navigate(`/categories?=${checkedBoxes.join('&')}`);
        }
    }, [checkedBoxes]);

    return (
        <>
            <div className={styles['dropdown-menu']} style={style}>
                <label>
                    <input
                        type="checkbox"
                        id='all-categories'
                        defaultValue={"Всички"}
                        onClick={() => dropdownHandler()}
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
                        onClick={() => dropdownHandler()}
                        onChange={checkboxHandler}
                    />
                    <span></span>
                    Пилешко
                </label>
                <label>
                    <input
                        type="checkbox"
                        defaultValue={"Свинско"}
                        onClick={() => dropdownHandler()}
                        onChange={checkboxHandler} />
                    <span></span>
                    Свинско
                </label>
                <label>
                    <input
                        type="checkbox"
                        defaultValue={"Телешко"}
                        onClick={() => dropdownHandler()}
                        onChange={checkboxHandler} />
                    <span></span>
                    Телешко
                </label>
                <label>
                    <input
                        type="checkbox"
                        defaultValue={"Телешко\-свинско"}
                        onClick={() => dropdownHandler()}
                        onChange={checkboxHandler} />
                    <span></span>
                    Телешко-свинско
                </label>
                <label>
                    <input
                        type="checkbox"
                        defaultValue={"Риба"}
                        onClick={() => dropdownHandler()}
                        onChange={checkboxHandler} />
                    <span></span>
                    Риба
                </label>
                <label>
                    <input
                        type="checkbox"
                        defaultValue={"Други месни"}
                        onClick={() => dropdownHandler()}
                        onChange={checkboxHandler} />
                    <span></span>
                    Други месни
                </label>
                <label>
                    <input
                        type="checkbox"
                        defaultValue={"Вегитариански"}
                        onClick={() => dropdownHandler()}
                        onChange={checkboxHandler} />
                    <span></span>
                    Вегитариански
                </label>
                <label>
                    <input
                        type="checkbox"
                        defaultValue={"Салати"}
                        onClick={() => dropdownHandler()}
                        onChange={checkboxHandler} />
                    <span></span>
                    Салати
                </label>
                <label>
                    <input
                        type="checkbox"
                        defaultValue={"Тестени"}
                        onClick={() => dropdownHandler()}
                        onChange={checkboxHandler} />
                    <span></span>
                    Тестени
                </label>
                <label>
                    <input
                        type="checkbox"
                        defaultValue={"Десерти"}
                        onClick={() => dropdownHandler()}
                        onChange={checkboxHandler} />
                    <span></span>
                    Десерти
                </label>
                <label>
                    <input
                        type="checkbox"
                        onClick={() => dropdownHandler()}defaultValue={"Други"} 
                        onChange={checkboxHandler} />
                    <span></span>
                    Други
                </label>
            </div>
            <Notification
                type={'warning'}
                message={'Можете да селектирате до 4 категории рецепти'}
                visibility={showNotification}
                handler={notificationHandler}
            />
        </>
    );
}