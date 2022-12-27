import { useState, useEffect, useRef } from "react";

const options = {
    threshold: 1,
    rootMargin: '0px 0px -100px 0px', 
}

export function useElementIsInViewport(ref) {
    const [isInViewport, setIsInViewport] = useState(false);
    const observerRef = useRef(null);

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