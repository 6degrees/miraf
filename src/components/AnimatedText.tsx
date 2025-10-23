"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/*
|--------------------------------------------------------------------------|
| AnimatedText Component
|--------------------------------------------------------------------------|
| A simple wrapper component that animates its children when entering view.
| It combines IntersectionObserver (via useScrollAnimation) with CSS transitions
| to smoothly fade and slide text into place.
|--------------------------------------------------------------------------|
*/

interface AnimatedTextProps {
    children: React.ReactNode;
    className?: string;
    delay?: number; // Delay before animation starts (in seconds)
    direction?: 'up' | 'down' | 'left' | 'right'; // Animation direction
    duration?: number; // Transition duration (in seconds)
}

export default function AnimatedText({
                                         children,
                                         className = '',
                                         delay = 0,
                                         direction = 'up',
                                         duration = 0.8
                                     }: AnimatedTextProps) {

    /*
    |--------------------------------------------|
    | $hook — track visibility of the element     |
    |--------------------------------------------|
    | The hook returns:
    | - ref: to attach to the element being observed
    | - isVisible: boolean flag for animation trigger
    |--------------------------------------------|
    */
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        triggerOnce: true,
        delay
    });

    /*
    |--------------------------------------------|
    | $function — getTransform()
    |--------------------------------------------|
    | Defines the initial transform based on the
    | chosen direction before the element becomes visible.
    |--------------------------------------------|
    */
    const getTransform = () => {
        switch (direction) {
            case 'up': return 'translateY(30px) translateX(0)';
            case 'down': return 'translateY(-30px) translateX(0)';
            case 'left': return 'translateY(0) translateX(30px)';   // comes from right
            case 'right': return 'translateY(0) translateX(-30px)'; // comes from left
            default: return 'translateY(30px) translateX(0)';
        }
    };

    /*
    |--------------------------------------------|
    | $render — main wrapper element
    |--------------------------------------------|
    | - Applies transition styles based on visibility
    | - Uses inline styles for dynamic animation control
    |--------------------------------------------|
    */
    return (
        <div
            ref={ref}
            className={`transition-all ease-out ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) translateX(0)' : getTransform(),
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
                transitionProperty: 'opacity, transform',
                willChange: 'opacity, transform',
            }}
        >
            {children}
        </div>
    );
}
