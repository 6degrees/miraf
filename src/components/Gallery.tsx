"use client";

import {useTranslation} from "react-i18next";
import Slider from "@/components/Slider";
import {useAppContext} from "@/context/AppContext";
import ShowcaseCard from "@/components/ShowcaseCard";
import Image from "next/image";
import ImageCard from "@/components/ImageCard";

/*
|--------------------------------------------------------------------------
| $about-district
|--------------------------------------------------------------------------
|
| Section describing the “About the District” part of the Miraf site.
| Contains:
| - Left column: localized title + subtitle text
| - Right column: showcase image + icon + heading + description
|
| Uses Tailwind for responsive typography and layout.
|
*/
export default function Gallery() {
    /*
    |--------------------------------------------------------------------------
    | $i18n-translator
    |--------------------------------------------------------------------------
    |
    | Retrieve the `t` function from i18next for localized strings.
    |
    */
    const {t} = useTranslation();
    const {direction,} = useAppContext();

    /*
    |--------------------------------------------------------------------------
    | $section-layout
    |--------------------------------------------------------------------------
    |
    | Two-column grid layout:
    | - Left: title and paragraph text
    | - Right: image card with caption
    | Background uses warm beige (#F3E6D6) to match Miraf branding.
    |
    */
    return (
        <Slider
            id="gallery"
            dir={direction}
            bgClass={'bg-blush'}
            heightClass={'h-[400px] sm:h-[500px] lg:h-[1100px]'}
            containerClass=""
            hasFooter={true}
            breakpoints= {{
                0: { slidesPerView: 1, spaceBetween: 0 },
            }}
            items={[
                <ImageCard
                    src="/images/miraf_renders_10.png"
                    alt="Miraf Overview"
                    heightClass="h-[400px] sm:h-[500px] lg:h-[1100px]"
                />,
                <ImageCard
                    src="/images/miraf_renders_10.png"
                    alt="Miraf Overview"
                    heightClass="h-[400px] sm:h-[500px] lg:h-[1100px]"
                />,
                <ImageCard
                    src="/images/miraf_renders_10.png"
                    alt="Miraf Overview"
                    heightClass="h-[400px] sm:h-[500px] lg:h-[1100px]"
                />,
            ]}
        />
    );

}