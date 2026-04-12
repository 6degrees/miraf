"use client";

import {useTranslation} from "react-i18next";
import Slider from "@/components/Slider";
import {getBaseUrl, useAppContext} from "@/context/AppContext";
import ShowcaseCard from "@/components/ShowcaseCard";
import DoubleShowcaseCard from "@/components/DoubleShowcaseCard";
import SingleShowcaseCard from "@/components/SingleShowcaseCard";
import {useEffect, useState} from "react";

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
export default function About({section}: { section: any }) {
    /*
    |--------------------------------------------------------------------------
    | $i18n-translator
    |--------------------------------------------------------------------------
    |
    | Retrieve the `t` function from i18next for localized strings.
    |
    */
    const {t} = useTranslation();
    const {selectedLanguage, direction,} = useAppContext();
    const [isMobile, setIsMobile] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | $responsive-detection
    |--------------------------------------------------------------------------
    |
    | Detect screen size to toggle between mobile and desktop layouts.
    | Uses debounced resize listener to improve performance.
    |
    */
    if (!section) return null;
    const items = section?.items || [];

    /*
    |--------------------------------------------------------------------------
    | $helpers
    |--------------------------------------------------------------------------
    |
    | Resolve localized fields + media URLs
    |
    */
    const getFirstTitle = (item: any) => selectedLanguage === "ar" ? item?.title_1_ar : item?.title_1_en;

    const getSecondTitle = (item: any) => selectedLanguage === "ar" ? item?.title_2_ar : item?.title_2_en;

    const getThirdTitle = (item: any) => selectedLanguage === "ar" ? item?.title_3_ar : item?.title_3_en;

    const getDescription = (item: any) => selectedLanguage === "ar" ? item?.description_ar : item?.description_en;

    const getImage = (item: any) => item?.image?.url ? `${getBaseUrl()}${item.image.url}` : null;

    const getFirstIcon = (item: any) =>
        item?.icons?.length > 0 && item.icons[0]?.url
            ? `${getBaseUrl()}${item.icons[0].url}`
            : null;

    const getSecondIcon = (item: any) =>
        item?.icons?.length > 1 && item.icons[1]?.url
            ? `${getBaseUrl()}${item.icons[1].url}`
            : null;

    /*
    |--------------------------------------------------------------------------
    | $responsive-detection
    |--------------------------------------------------------------------------
    |
    | Detect screen size to toggle between mobile and desktop layouts.
    | Uses debounced resize listener to improve performance.
    |
    */
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const checkMobile = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsMobile(window.innerWidth < 1024);
            }, 150); // Debounce resize events
        };
        checkMobile();
        window.addEventListener('resize', checkMobile, {passive: true});
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

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
            fadeIn
            bgClass={'bg-burgundy'}
            heightClass="h-[100vh] min-h-[100vh] supports-[height:100svh]:min-h-[100svh] xl:max-h-[1000px] py-2 sm:py-0"
            containerClass={'container-s'}
            breakpoints={{
                0: {slidesPerView: 1, spaceBetween: 0},
                640: {slidesPerView: 1, spaceBetween: 0},
                768: {slidesPerView: 1, spaceBetween: 0},
                1024: {slidesPerView: 1.1, spaceBetween: 0},
                1280: {slidesPerView: 1.2, spaceBetween: 0},
            }}
            items={[
                <ShowcaseCard
                    layout={'0'}
                    imageSrc={getImage(items[0]) || ''}
                    iconSrc1={getFirstIcon(items[0]) || ''}
                    iconSrc2={getSecondIcon(items[0]) || ''}
                    imageAlt="Miraf"
                    caption={t("showcase.0.caption")}
                    titleLine1={getFirstTitle(items[0])}
                    titleLine2={getSecondTitle(items[0])}
                    titleLine3={getThirdTitle(items[0])}
                    roundedClass="rounded-2xl"
                    iconSizeClass1={'h-14 w-14 sm:h-16 sm:w-16 xl:h-20 xl:w-20'}
                    iconSizeClass2={'h-12 w-12 sm:h-14 sm:w-16 xl:h-18 xl:w-18'}
                />,
                <ShowcaseCard
                    layout={'1'}
                    imageSrc={getImage(items[1]) || ''}
                    imageAlt="Miraf"
                    titleLine1={getFirstTitle(items[1])}
                    titleLine2={getSecondTitle(items[1])}
                    captionSizeClass="text-2xl md:text-lg lg:text-2xl xl:text-3xl"
                    roundedClass="rounded-2xl"
                />,
                <ShowcaseCard
                    layout={'2'}
                    imageSrc={getImage(items[2]) || ''}
                    iconSrc1={getFirstIcon(items[2]) || ''}
                    iconSrc2={getSecondIcon(items[2]) || ''}
                    imageAlt="Miraf"
                    roundedClass="rounded-2xl"
                    titleLine1={getFirstTitle(items[2]) || ''}
                    titleLine2={getSecondTitle(items[2]) || ''}
                    titleLine3={getThirdTitle(items[2]) || ''}
                    iconSizeClass1={'h-12 w-12 sm:h-14 sm:w-16 xl:h-18 xl:w-18'}
                />,

                ...(isMobile ? [
                    <SingleShowcaseCard
                        key="pilates-mobile"
                        stacked
                        imageSrc={getImage(items[3]) || ''}
                        imageAlt="Pilates Studio"
                        title={`${getFirstTitle(items[3])} ${getSecondTitle(items[3])}`}
                        titleLine1={getFirstTitle(items[3]) || ''}
                        titleLine2={getSecondTitle(items[3]) || ''}
                        description={getDescription(items[3]) || ''}
                        bgClass="bg-burgundy"
                        roundedClass="rounded-2xl"
                    />,
                    <SingleShowcaseCard
                        key="lifestyle-mobile"
                        stacked
                        imageSrc={getImage(items[4]) || ''}
                        imageAlt="Living room interior"
                        title={`${getFirstTitle(items[4])} ${getSecondTitle(items[4])}`}
                        titleLine1={getFirstTitle(items[4]) || ''}
                        titleLine2={getSecondTitle(items[4]) || ''}
                        description={getDescription(items[4]) || ''}
                        descriptionLine2={t("showcase.4.captionLine2", {defaultValue: ""})}
                        icon={getFirstIcon(items[4]) || ''}
                        bgClass="bg-burgundy"
                        roundedClass="rounded-2xl"
                    />
                ] : [
                    <DoubleShowcaseCard
                        key="double-desktop"
                        imageLeftSrc="/images/group_pilates_instructors_exercising_reformers.jpg"
                        imageRightSrc="/images/interior_design_with_photoframes_couch.jpg"
                        imageLeftAlt="Pilates Studio"
                        imageRightAlt="Living room interior"
                        titleLeft={`${getFirstTitle(items[4])} ${getSecondTitle(items[4])}`}
                        titleLeftLine1={getFirstTitle(items[4]) || ''}
                        titleLeftLine2={getSecondTitle(items[4]) || ''}
                        titleRight={`${getFirstTitle(items[3])}`}
                        descriptionLeft={getDescription(items[4]) || ''}
                        descriptionRight={getDescription(items[3]) || ''}
                        iconLeft={undefined}
                        iconRight={getFirstIcon(items[3]) || ''}
                    />
                ])
            ]}
        />
    );

}