"use client";

import { useEffect, useRef, useState } from "react";

/*
|--------------------------------------------------------------------------|
| useScrollAnimation Hook
|--------------------------------------------------------------------------|
| This hook triggers animation when an element enters the viewport.
| It uses the IntersectionObserver API and provides:
| - A ref to attach to your element
| - A boolean (isVisible) to control visibility transitions
|--------------------------------------------------------------------------|
*/

interface UseScrollAnimationOptions {
    threshold?: number | number[];
    rootMargin?: string;
    triggerOnce?: boolean;
    delay?: number; // Delay in seconds (used for transition delay in CSS)
}

/*
|--------------------------------------------------------------------------|
| $hook: useScrollAnimation<T>
|--------------------------------------------------------------------------|
| Generic hook — T allows type inference for the referenced element.
| Default: HTMLDivElement to match most use cases (<div ref={ref} />)
|--------------------------------------------------------------------------|
*/
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    {
        threshold = 0.1,
        rootMargin = "0px 0px -100px 0px",
        triggerOnce = true,
        delay = 0,
    }: UseScrollAnimationOptions = {}
) {
    // |--------------------------------------------|
    // | $state — control visibility and trigger flag |
    // |--------------------------------------------|
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    // |--------------------------------------------|
    // | $ref — element reference for IntersectionObserver |
    // |--------------------------------------------|
    const ref = useRef<T | null>(null);

    // |--------------------------------------------|
    // | $effect — setup IntersectionObserver logic  |
    // |--------------------------------------------|
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Convert delay from seconds to milliseconds
        const delayMs = Math.max(0, delay) * 1000;

        // Initialize IntersectionObserver
        let timeoutId: number | null = null;
        
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const trigger = () => {
                        setIsVisible(true);
                        if (triggerOnce) {
                            setHasTriggered(true);
                            io.disconnect(); // Stop observing after first trigger
                        }
                    };

                    if (delayMs > 0) {
                        // Clear any existing timeout
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        // Add delay before triggering the animation
                        timeoutId = window.setTimeout(() => {
                            requestAnimationFrame(trigger);
                            timeoutId = null;
                        }, delayMs);
                    } else {
                        requestAnimationFrame(trigger);
                    }
                } else if (!triggerOnce) {
                    // Reset visibility when element leaves the viewport
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        io.observe(el);

        // Cleanup observer on unmount
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            io.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce, delay]);

    // |--------------------------------------------|
    // | $return — ref + visibility state            |
    // |--------------------------------------------|
    return {
        ref,
        isVisible: triggerOnce ? hasTriggered || isVisible : isVisible,
    };
}
