"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/*
|--------------------------------------------------------------------------
| $slider:props
|--------------------------------------------------------------------------
| Props for a Swiper-based carousel that accepts an array of React nodes.
| - items          : React nodes to render as slides
| - dir            : "rtl" | "ltr" (default: "rtl")
| - autoplayDelay  : ms between slides (default: 5000)
| - className      : wrapper classes (default: "w-full")
| - navigation     : show next/prev controls (default: true)
| - bgClass        : Tailwind class for background color/gradient
| - textClass      : Tailwind class for text color
| - style          : Inline style (useful for gradients)
| - background     : Optional ReactNode background (image/gradient div)
| - heightClass    : Tailwind height class for slides
*/
type SliderProps = {
    id: string;
    items: React.ReactNode[];
    dir?: "rtl" | "ltr";
    autoplayDelay?: number;
    containerClass?: string;
    className?: string;
    navigation?: boolean;
    bgClass?: string;
    textClass?: string;
    style?: React.CSSProperties;
    background?: React.ReactNode;
    heightClass?: string;
    breakpoints?: Record<number, { slidesPerView: number; spaceBetween?: number }>;
};

/*
|--------------------------------------------------------------------------
| $slider
|--------------------------------------------------------------------------
| Full-width Swiper-based carousel.
| - Supports custom background and text color via props
| - Accepts optional background node (image, gradient, etc.)
| - Uses Autoplay module for smooth auto transitions
| - Displays a single slide at a time (slidesPerView = 1)
| - Allows direction switching (RTL/LTR)
| - Responsive layout with controlled height per slide
|
| Usage:
|   <Slider
|       items={[<SlideA/>, <SlideB/>, <SlideC/>]}
|       bgClass="bg-[#F3E6D6]"
|       textClass="text-burgundy"
|       heightClass="h-[600px] lg:h-[900px]"
|       background={<Image src="/images/banner.png" fill className="object-cover"/>}
|   />
*/
export default function Slider(
    {
        id,
        items,
        autoplayDelay = 5000,
        dir = "ltr",
        className = "w-full",
        navigation = true,
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
            1024: { slidesPerView: 1.2, spaceBetween: 0 },
            1280: { slidesPerView: 1.4, spaceBetween: 0 },
            1400: { slidesPerView: 1.5, spaceBetween: 0 },
        },
    }: SliderProps)
{

    /*
    |--------------------------------------------------------------------------
    | $slider-render
    |--------------------------------------------------------------------------
    | Renders the Swiper carousel:
    | - Includes Autoplay module
    | - Loops slides infinitely
    | - Uses configurable background, text color, and height
    | - Renders each node in `items` as a <SwiperSlide>
    */
    return (
        <section id={id} className={`relative ${bgClass} ${textClass}`} style={style}>
            {/* Optional absolute background */}
            {background && (
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    {background}
                </div>
            )}

            <Swiper
                key={`swiper-${id}-${dir}`}
                id={`swiper-${id}-${dir}`}
                modules={[]}
                spaceBetween={0}
                autoplay={{delay: autoplayDelay, disableOnInteraction: false}}
                navigation={navigation}
                dir={dir}
                className={className}
                breakpoints={breakpoints}
            >
                {items.map((node, idx) => (
                    <SwiperSlide key={`swiper-slide-${id}-${idx}`} id={`swiper-slide-${id}-${idx}`}>
                      <div className={`${containerClass}`}>
                          <div className={`relative ${heightClass} overflow-hidden`}>
                              {node}
                          </div>
                      </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}