"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useAppContext} from "@/context/AppContext";

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
export default function Slider({items, autoplayDelay = 5000, className = "w-full", navigation = true,}: SliderProps) {
    // Current app language from context ("en" | "ar").
    // Use to flip RTL/LTR, choose assets, or pass `dir` to components.
    const { selectedLanguage, } = useAppContext();

    return (
        <Swiper modules={[Autoplay]} slidesPerView={1} spaceBetween={0} loop autoplay={{ delay: autoplayDelay, disableOnInteraction: false }} navigation={navigation} dir={selectedLanguage === 'ar'? 'rtl': 'ltr'} className={className}>
            {items.map((node, idx) => (
                <SwiperSlide key={idx}>{node}</SwiperSlide>
            ))}
        </Swiper>
    );
}
