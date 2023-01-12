import { useNavigate } from "react-router-dom";

export function useHandleCheckboxes(checkedBoxes, setChecksHandler, notificationHandler) {
    const navigate = useNavigate();

    const checkboxHandler = (e) => {
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
                setChecksHandler([]);
            }
            if (checkedBoxes.includes(currentBoxName) === false && currentBoxName !== allCategoriesBoxName) {
                if (checkedBoxes.length > 3) {
                    e.target.checked = false;
                    notificationHandler();
                    return;
                }
                setChecksHandler((boxes) => [...boxes, currentBoxName]);
            }
        } else {
            setChecksHandler(checkedBoxes.filter(box => box !== currentBoxName));
            if (checkedBoxes.length === 1) {
                navigate('/catalogue');
                allCategoriesCheckbox.checked = true;
            }
        }
    }
    return checkboxHandler;
}
