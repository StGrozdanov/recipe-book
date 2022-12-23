import { useState, useEffect } from "react";

export function useElementIsInViewport(reference) {
    const [isInViewport, setIsInViewport] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsInViewport(entry.isIntersecting);
        });
        observer.observe(reference.current);
    }, []);

    return isInViewport;
}