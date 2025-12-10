"use client";

import {useTranslation} from "react-i18next";
import Slider from "@/components/Slider";
import {useAppContext} from "@/context/AppContext";
import ShowcaseCard from "@/components/ShowcaseCard";
import DoubleShowcaseCard from "@/components/DoubleShowcaseCard";

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
            id="about"
            dir={direction}
            bgClass={'bg-burgundy'}
            heightClass="h-[100vh] min-h-[100vh] supports-[height:100svh]:min-h-[100svh] xl:max-h-[1000px] py-2 sm:py-0"
            containerClass={'container-s'}
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
                    iconSrc1="/icons/ml_icon_16.png"
                    iconSrc2="/icons/ml_Icon_15.png"
                    imageAlt="Miraf"
                    caption={t("showcase.0.caption")}
                    titleLine1={t("showcase.0.title.0")}
                    titleLine2={t("showcase.0.title.1")}
                    titleLine3={t("showcase.0.title.2")}
                    roundedClass="rounded-b-2xl lg:rounded-2xl"
                    iconSizeClass1={'h-14 w-14 sm:h-16 sm:w-16 xl:h-20 xl:w-20'}
                    iconSizeClass2={'h-12 w-12 sm:h-14 sm:w-16 xl:h-18 xl:w-18'}
                />,
                <ShowcaseCard
                    layout={'1'}
                    imageSrc="/images/cam09_retail_interior_06.jpg"
                    imageAlt="Miraf"
                    titleLine1={t("showcase.1.title.0")}
                    titleLine2={t("showcase.1.title.1")}
                    captionSizeClass ="text-2xl md:text-lg lg:text-2xl xl:text-3xl"
                    roundedClass="rounded-b-2xl lg:rounded-b-none lg:rounded-t-2xl"
                />,
                <ShowcaseCard
                    layout={'2'}
                    imageSrc="/images/cam12_office landscape_view_05.jpg"
                    iconSrc1="/icons/ML_icon-19.png"
                    iconSrc2="/icons/ML Icon-18.png"
                    imageAlt="Miraf"
                    roundedClass="rounded-b-2xl lg:rounded-b-2xl"
                    titleLine1={t("showcase.2.title.0")}
                    titleLine2={t("showcase.2.title.1")}
                    titleLine3={t("showcase.2.title.2")}
                    iconSizeClass1={'h-12 w-12 sm:h-14 sm:w-16 xl:h-18 xl:w-18'}
                />,

                <DoubleShowcaseCard
                    imageLeftSrc="/images/group_pilates_instructors_exercising_reformers.jpg"
                    imageRightSrc="/images/interior_design_with_photoframes_couch.jpg"
                    imageLeftAlt="Pilates Studio"
                    imageRightAlt="Living room interior"
                    titleLeft={`${t("showcase.3.title.0")} ${t("showcase.3.title.1")}`}
                    titleLeftLine1={t("showcase.3.title.0")}
                    titleLeftLine2={t("showcase.3.title.1")}
                    titleRight={t("showcase.4.title.0")}
                    descriptionLeft={t("showcase.3.caption")}
                    descriptionRight={t("showcase.4.caption")}
                    descriptionRightLine2={t("showcase.4.captionLine2", { defaultValue: "" })}
                    iconLeft={undefined}
                    iconRight="/icons/ml_Icon_17.png"
                />
            ]}
        />
    );

}