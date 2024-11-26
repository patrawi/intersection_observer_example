import { useCallback, useEffect, useRef, useState } from "react";

interface IntersectionOptions {
    threshold?: number;
    rootMargin?: string;
    root?: Element | null;
}

export const useIntersection = (
    handleLoadMore?: () => void,
    handleLoadImage?: () => void,
    options: IntersectionOptions = {},
) => {
    const [visible, setVisible] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const handleIntersection = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setVisible(true);

                    handleLoadMore?.();
                    handleLoadImage?.();
                } else {
                    setVisible(false);
                }
            }
        },
        [handleLoadImage, handleLoadMore],
    );

    useEffect(() => {
        const {
            threshold = 1.0,
            rootMargin = "0px",
            root = null,
        } = options;

        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin,
            root,
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleIntersection, options]);

    const observer = observerRef.current;

    return {
        observer,
        visible,
    };
};
