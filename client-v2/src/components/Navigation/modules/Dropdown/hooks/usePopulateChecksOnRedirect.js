import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePopulateChecksOnRedirect(setChecksHandler) {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname == '/categories' && location.search.length > 0) {
            populateCheckboxes();
        } else {
            cleanupPopulatedCheckboxes();
        }
    }, [location.pathname]);



    function populateCheckboxes() {
        const checks = document.querySelectorAll('[type=checkbox]');
        const params = decodeURI(location.search.split('=')[1].split('&') || '').split(',');

        Array.from(checks)
            .filter(c => params.includes(c.defaultValue))
            .map(element => element.checked = true);

        document.getElementById('all-categories').checked = false;

        setChecksHandler(params);
    }

    function cleanupPopulatedCheckboxes() {
        const checks = document.querySelectorAll('[type=checkbox]');

        if (document.getElementById('all-categories').checked == false) {
            Array.from(checks)
                .filter(c => c.checked = true)
                .map(element => element.checked = false);

            document.getElementById('all-categories').checked = true;

            setChecksHandler([]);
        }
    }
}