"use client";

import {useTranslation} from "react-i18next";
import Slider from "@/components/Slider";
import {useAppContext} from "@/context/AppContext";
import ImageCard from "@/components/ImageCard";
import {getBaseUrl} from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $gallery-section
|--------------------------------------------------------------------------
|
| Same layout — dynamic images from API
|
*/
export default function Gallery({section}: { section: any }) {

    /*
    |--------------------------------------------------------------------------
    | $i18n-translator
    |--------------------------------------------------------------------------
    */
    const {direction} = useAppContext();

    /*
    |--------------------------------------------------------------------------
    | $guard
    |--------------------------------------------------------------------------
    */
    if (!section || !section.items) return null;

    /*
    |--------------------------------------------------------------------------
    | $images
    |--------------------------------------------------------------------------
    |
    | Map API images safely
    |
    */
    const images = section.items
        .filter((item: any) => item?.url)
        .map((item: any) => ({
            id: item.id,
            src: `${getBaseUrl()}${item.url}`,
        }));

    if (images.length === 0) return null;

    /*
    |--------------------------------------------------------------------------
    | $section-layout
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | - HTML is NOT changed
    | - Only images replaced from API
    |
    */
    return (
        <Slider
            id="gallery"
            dir={direction}
            bgClass={"bg-blush"}
            heightClass="h-[50svh] md:h-[95svh] max-h-[1000px]"
            containerClass=""
            hasFooter={true}
            isUseGSAP={false}
            breakpoints={{
                0: {slidesPerView: 1, spaceBetween: 0},
            }}
            items={
                images.map((img: any) => (
                    <ImageCard
                        key={img.id}
                        src={img.src}
                        alt="Miraf Overview"
                    />
                ))
            }
        />
    );
}

