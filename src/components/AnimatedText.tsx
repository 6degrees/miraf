"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedTextProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
}

export default function AnimatedText({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.8
}: AnimatedTextProps) {
    const { ref, isVisible } = useScrollAnimation({ 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        triggerOnce: true,
        delay 
    });

    const getTransform = () => {
        switch (direction) {
            case 'up': return 'translateY(30px)';
            case 'down': return 'translateY(-30px)';
            case 'left': return 'translateX(30px)';
            case 'right': return 'translateX(-30px)';
            default: return 'translateY(30px)';
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all ease-out ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) translateX(0)' : getTransform(),
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
            }}
        >
            {children}
        </div>
    );
}
