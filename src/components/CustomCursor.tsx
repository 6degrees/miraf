"use client";

import { useEffect, useRef, useState } from "react";

/*
|||--------------------------------------------------------------------------
||| $custom-cursor
|||--------------------------------------------------------------------------
|||
||| Simple custom cursor effect similar to Refad website
||| Features:
||| - Clean circle cursor that follows mouse movement
||| - Smooth animations and transitions
||| - Interactive hover states
|||
*/
export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        
        if (!cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        const updateCursor = () => {
            const diffX = mouseX - cursorX;
            const diffY = mouseY - cursorY;
            
            cursorX += diffX * 0.1; // Smooth following
            cursorY += diffY * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'IMG' || target.classList.contains('cursor-pointer')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'IMG' || target.classList.contains('cursor-pointer')) {
                setIsHovering(false);
            }
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        // Start cursor animation
        updateCursor();

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`fixed pointer-events-none z-[9999] transition-all duration-300 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
            } ${isHovering ? 'scale-150' : 'scale-100'}`}
            style={{
                transform: 'translate(-50%, -50%)',
            }}
        >
            {/* Main cursor circle */}
            <div className={`w-5 h-5 rounded-full transition-all duration-300 ${
                isHovering ? 'bg-white mix-blend-difference' : 'bg-black'
            }`} />
        </div>
    );
}