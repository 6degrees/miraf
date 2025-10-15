"use client";

import {useTranslation} from "react-i18next";
import Slider from "@/components/Slider";
import {useAppContext} from "@/context/AppContext";
import DistrictTitleCard from "@/components/DistrictTitleCard";
import DistrictCard from "@/components/DistrictCard";
import MapMiraf from "@/components/MapMiraf";
import MapCard from "@/components/MapCard";
import AboutCard from "@/components/ShowcaseCard";
import AboutShowcaseCard from "@/components/ShowcaseCard";
import ShowcaseCard from "@/components/ShowcaseCard";
import ShowcaseSplitCard from "@/components/ShowcaseSplitCard";
import ShowcaseMosaicCard from "@/components/ShowcaseMosaicCard";

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
export default function About() {
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
            dir={direction}
            bgClass={'bg-burgundy'}
            heightClass={'h-[550px] lg:h-[800px] xl:h-[900px]'}
            breakpoints= {{
                0: { slidesPerView: 1, spaceBetween: 0 },
                640: { slidesPerView: 1, spaceBetween: 0 },
                768: { slidesPerView: 1, spaceBetween: 0 },
                1024: { slidesPerView: 1.1, spaceBetween: 0 },
                1280: { slidesPerView: 1.2, spaceBetween: 0 },
            }}
            items={[
                <ShowcaseCard
                    layout={'0'}
                    imageSrc="/images/02_Cam1_Road_Front_Building_06.jpg"
                    imageAlt="Miraf"
                    caption={t("showcase.0.caption")}
                    titleLine1={t("showcase.0.title.0")}
                    titleLine2={t("showcase.0.title.1")}
                />,
                <ShowcaseCard
                    layout={'1'}
                    imageSrc="/images/cam09_retail_interior_06.jpg"
                    imageAlt="Miraf"
                    caption={t("showcase.1.caption")}
                    roundedClass={'rounded-'}
                />,
                <ShowcaseCard
                    layout={'2'}
                    imageSrc="/images/cam12_office landscape_view_05.jpg"
                    iconSrc="/icons/ML_icon-19.png"
                    imageAlt="Miraf"
                    titleLine1={t("showcase.2.title.0")}
                    titleLine2={t("showcase.2.title.1")}
                    iconSizeClass={'h-12 w-12 sm:h-14 sm:w-14 xl:h-24 xl:w-24'}
                />,

            ]}
        />
    );

}
