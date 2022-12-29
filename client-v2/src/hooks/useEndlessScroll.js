import { useCallback, useEffect } from "react";

export function useEndlessScroll(loadingRef, paginatorFunction) {
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            paginatorFunction();
        }
    }, []);

    const observerSettings = {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 1
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, observerSettings);
        if (loadingRef.current) {
            observer.observe(loadingRef.current)
        }
    }, [handleObserver]);
}