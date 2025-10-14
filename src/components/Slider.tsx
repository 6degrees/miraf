"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useAppContext} from "@/context/AppContext";
import {useEffect} from "react";

/*
|--------------------------------------------------------------------------
| $slider:props
|--------------------------------------------------------------------------
| Props for a Swiper-based carousel that accepts an array of React nodes.
| - items         : React nodes to render as slides
| - dir           : "rtl" | "ltr" (default: "rtl")
| - autoplayDelay : ms between slides (default: 5000)
| - className     : wrapper classes (default: "w-full")
| - navigation    : show next/prev controls (default: true)
*/
type SliderProps = {
    items: React.ReactNode[];
    dir?: "rtl" | "ltr";
    autoplayDelay?: number;
    className?: string;
    navigation?: boolean;
};

/*
|--------------------------------------------------------------------------
| $slider
|--------------------------------------------------------------------------
| Full-width carousel for “About the District”.
| - Uses Swiper (Autoplay, loop, navigation)
| - Renders each node in `items` as a <SwiperSlide>
| - Direction defaults to RTL (Arabic); switch to LTR as needed
|
| Usage:
|   <Slider items={[<SlideA/>, <SlideB/>, <SlideC/>]} />
*/
export default function Slider({items, autoplayDelay = 5000, dir='ltr', className = "w-full", navigation = true}: SliderProps) {
    /*
    |--------------------------------------------------------------------------
    | $slider-render
    |--------------------------------------------------------------------------
    |
    | Renders the Swiper carousel:
    | - Uses Autoplay module for automatic slide transitions
    | - Displays a single slide at a time (slidesPerView = 1)
    | - Enables infinite looping and optional navigation arrows
    | - Direction set to RTL for Arabic content
    | - Each element in `items` is wrapped in a <SwiperSlide>
    |
    */
    return (
        <section className="bg-[#F3E6D6] text-burgundy">
            <Swiper
                key={`swiper-${dir}`}
                modules={[]}
                spaceBetween={0}
                autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
                navigation={navigation}
                dir={dir}
                className={className}
                breakpoints={{
                    0:    { slidesPerView: 1,   spaceBetween: 0 },
                    640:  { slidesPerView: 1,   spaceBetween: 0 },
                    768:  { slidesPerView: 1,   spaceBetween: 0 },
                    1024: { slidesPerView: 1.2, spaceBetween: 0 },
                    1280: { slidesPerView: 1.4, spaceBetween: 0 },
                }}>
                {items.map((node, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="container-x">
                            <div className="relative h-[100svh] supports-[height:100svh]:h-[100svh] overflow-hidden">
                                {node}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
