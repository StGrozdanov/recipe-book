import { useState, useEffect, useRef } from "react";

export function useElementIsInViewport(ref) {
    const [isInViewport, setIsInViewport] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInViewport(true);
            }
        });
    }, []);

    useEffect(() => {
        observerRef.current.observe(ref.current);

        return () => {
            observerRef.current.disconnect();
        };
    }, [ref]);

    return isInViewport;
}