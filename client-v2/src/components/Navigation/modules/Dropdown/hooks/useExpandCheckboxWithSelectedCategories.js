import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useExpandCheckboxWithSelectedCategories(setChecksHandler) {
    const location = useLocation();
    useEffect(() => expandCheckboxWithSelectedCategories(), [location.pathname]);

    function expandCheckboxWithSelectedCategories() {
        const checks = document.querySelectorAll('[type=checkbox]');

        if (location.search) {
            const params = decodeURI(location.search.split('=')[1].split('&') || '').split(',');

            Array.from(checks)
                .filter(c => params.includes(c.defaultValue))
                .map(element => element.checked = true);

            document.getElementById('all-categories').checked = false;

            setChecksHandler(params);
        } else {
            Array.from(checks)
                .filter(c => c.checked = true)
                .map(element => element.checked = false);

            document.getElementById('all-categories').checked = true;
            
            setChecksHandler([]);
        }
    }
}