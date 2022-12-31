import { useState, useEffect, useRef } from "react";

export function useElementIsInViewport(ref, viewportThreshold = '-100px') {
    const [isInViewport, setIsInViewport] = useState(false);
    const observerRef = useRef(null);

    const options = {
        threshold: 1,
        rootMargin: `0px 0px ${viewportThreshold} 0px`,
    }

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInViewport(true);
            }
        }, options);
    }, []);

    useEffect(() => {
        observerRef.current.observe(ref.current);

        return () => {
            observerRef.current.disconnect();
        };
    }, [ref]);

    return isInViewport;
}