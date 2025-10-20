"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";

/*
|----------------------------------------------------------------------
| $slider:props
|----------------------------------------------------------------------
| Defines all accepted props for the Slider component
|----------------------------------------------------------------------
|
| id              : unique identifier for the slider instance
| items           : array of React nodes rendered as Swiper slides
| dir             : direction of slider ("rtl" or "ltr")
| autoplayDelay   : delay between automatic slide transitions (ms)
| containerClass  : Tailwind class for outer container wrapper
| className       : additional Tailwind classes for Swiper wrapper
| bgClass         : background color or gradient (Tailwind class)
| textClass       : text color class (e.g., "text-burgundy")
| style           : optional inline CSS styles (usually gradients)
| background      : optional ReactNode rendered behind slides
| heightClass     : Tailwind height classes for each slide
| breakpoints     : responsive configuration for slidesPerView / spacing
| hasFooter       : toggles visibility of pagination footer
|                   → true  = show counter and prev/next buttons
|                   → false = hide footer entirely
|
*/
type SliderProps = {
    id: string;
    items: React.ReactNode[];
    dir?: "rtl" | "ltr";
    autoplayDelay?: number;
    containerClass?: string;
    className?: string;
    bgClass?: string;
    textClass?: string;
    style?: React.CSSProperties;
    background?: React.ReactNode;
    heightClass?: string;
    breakpoints?: Record<number, { slidesPerView: number; spaceBetween?: number }>;
    hasFooter?: boolean;
};

/*
|----------------------------------------------------------------------
| $slider:component
|----------------------------------------------------------------------
| Main Slider component definition
|----------------------------------------------------------------------
|
| A reusable Swiper-based carousel component that:
| - Displays an array of React nodes as slides
| - Supports both LTR and RTL directions
| - Includes autoplay, looping, and responsive breakpoints
| - Accepts custom background, height, and color classes
| - Renders a styled pagination bar with:
|       → Slide counter on the left
|       → Prev / Next circular buttons on the right
|
| Designed for flexible use across landing pages and sections.
|
*/
export default function Slider(
    {
        id,
        items,
        autoplayDelay = 5000,
        dir = "ltr",
        className = "w-full",
        bgClass = "bg-[#F3E6D6]",
        textClass = "text-burgundy",
        style,
        background,
        containerClass = "container-x",
        heightClass = "h-[600px] md:h-[700px] lg:h-[900px]",
        breakpoints = {
            0: { slidesPerView: 1, spaceBetween: 0 },
            640: { slidesPerView: 1, spaceBetween: 0 },
            768: { slidesPerView: 1, spaceBetween: 0 },
            1024: { slidesPerView: 1, spaceBetween: 0 },
        },
        hasFooter = false,
    }: SliderProps) {

    /*
    |----------------------------------------------------------------------
    | $swiper-state
    |----------------------------------------------------------------------
    | Local state and references for Swiper instance
    |----------------------------------------------------------------------
    |
    | swiperRef : holds Swiper instance reference (used for manual control)
    | index     : tracks the current active slide index
    | total     : total number of slides (items.length)
    | isRTL     : determines directionality (used for arrow icons)
    |
    | slidePrev / slideNext :
    |   - Helper functions that safely move the Swiper instance backward/forward
    |   - They check that swiperRef exists and total slides > 1
    |
    */
    const swiperRef = useRef<SwiperCore | null>(null);
    const [index, setIndex] = useState(0);
    const total = items.length;
    const isRTL = dir === "rtl";

    const slidePrev = () => swiperRef.current && total > 1 && swiperRef.current.slidePrev();
    const slideNext = () => swiperRef.current && total > 1 && swiperRef.current.slideNext();

    /*
    |----------------------------------------------------------------------
    | $component-render
    |----------------------------------------------------------------------
    | Renders the complete Slider component structure
    |----------------------------------------------------------------------
    |
    | - Wraps the entire Swiper carousel inside a <section> element
    | - Applies background color and optional background node (image/gradient)
    | - Initializes the Swiper with autoplay and responsive breakpoints
    | - Renders each slide using items[] as <SwiperSlide>
    | - Includes custom pagination bar at the bottom:
    |       → Left side  : current slide index / total count
    |       → Right side : circular Previous / Next buttons
    | - Handles both LTR and RTL directions automatically
    | - Uses high z-index for footer to ensure buttons are always clickable
    |
    */
    return (
        <section id={id} className={`relative ${bgClass} ${textClass}`} style={style} dir={dir}>
            {background && <div className="absolute inset-0 -z-10 pointer-events-none">{background}</div>}

            <Swiper key={`swiper-${id}-${dir}`} id={`swiper-${id}-${dir}`} modules={[]} dir={dir} autoplay={{ delay: autoplayDelay, disableOnInteraction: false }} spaceBetween={0} breakpoints={breakpoints} allowTouchMove={true} onBeforeInit={(swiper) => { swiperRef.current = swiper; }} onSwiper={(swiper) => { swiperRef.current = swiper; }} onSlideChange={(swiper) => setIndex(swiper.realIndex ?? swiper.activeIndex ?? 0)} className={className}>
                {items.map((node, idx) => (
                    <SwiperSlide key={`slide-${id}-${idx}`} id={`swiper-slide-${id}-${idx}`}>
                        <div className={containerClass}>
                            <div className={`relative w-full ${heightClass} py-2`}>{node}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Footer (high z-index so it’s always clickable) */}
            {hasFooter && (<div className={`absolute -bottom-0 lg:-bottom-10 left-0 right-0  z-30 ${bgClass}`}>
                <div className={'container-x'}>
                    <div className="w-full py-1 flex items-center justify-between">
                        <div className="text-sm md:text-base opacity-80 select-none">{total > 0 ? `${(index % total) + 1} / ${total}` : "0 / 0"}</div>

                        <div className="flex items-center gap-2">
                            <button type="button" aria-label="Previous" onClick={slidePrev} className="grid h-6 w-6 place-items-center rounded-full bg-burgundy/95 text-[#F6E6DA] hover:opacity-85 transition">
                                {isRTL ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>

                            <button type="button" aria-label="Next" onClick={slideNext} className="grid h-6 w-6 place-items-center rounded-full bg-burgundy/95 text-[#F6E6DA] hover:opacity-85 transition">
                                {isRTL ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>)}
        </section>
    );
}
