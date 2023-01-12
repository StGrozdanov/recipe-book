import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopulateChecksOnRedirect } from './hooks/usePopulateChecksOnRedirect';
import { useHandleCheckboxes } from './hooks/useHandleCheckboxes';
import styles from './Dropdown.module.scss';
import Notification from '../../../common/Notification/Notification';

export default function Dropdown({ style }) {
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
            <Notification
                type={'warning'}
                message={'Можете да селектирате до 4 категории рецепти'}
                visibility={showNotification}
                handler={notificationHandler}
            />
        </>
    );
}