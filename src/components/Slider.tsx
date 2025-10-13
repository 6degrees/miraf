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
        <Swiper key={`swiper-${dir}`} modules={[Autoplay]} slidesPerView={1} spaceBetween={0} loop autoplay={{ delay: autoplayDelay, disableOnInteraction: false }} navigation={navigation} dir={dir} className={className}>
            {items.map((node, idx) => (
                <SwiperSlide key={idx}>{node}</SwiperSlide>
            ))}
        </Swiper>
    );
}
