"use client";

import {useTranslation} from "react-i18next";
import Slider from "@/components/Slider";
import {useAppContext} from "@/context/AppContext";
import DistrictTitleCard from "@/components/DistrictTitleCard";
import DistrictCard from "@/components/DistrictCard";
import MapMiraf from "@/components/MapMiraf";
import MapCard from "@/components/MapCard";

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
export default function District() {
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
            id="district"
            dir={direction}
            breakpoints={{
                0: {slidesPerView: 1, spaceBetween: 0},
                640: {slidesPerView: 1, spaceBetween: 0},
                768: {slidesPerView: 1, spaceBetween: 0},
                1024: { slidesPerView: 1.2, spaceBetween: 0 },
                1280: { slidesPerView: 1.4, spaceBetween: 0 },
            }}
            items={[
                <DistrictTitleCard
                    key="about-title"
                    titleLine1={t("about.0.cards.0.title.0")}
                    titleLine2={t("about.0.cards.0.title.1")}
                    body={t("about.0.cards.0.body")}
                    iconSrc="/icons/ml_Icon_09.png"
                    iconAlt={t("about.0.cards.0.title.1")}
                    gapClass="gap-4 sm:gap-6"
                    iconSizeClass="h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24"
                />,

                <DistrictCard
                    key="residential-top"
                    imageSrc="/images/miraf_renders-09.png"
                    imageAlt={t("about.0.cards.1.title.0")}
                    iconSrc="/icons/ml_icon_07.png"
                    title={t("about.0.cards.1.title.0")}
                    body={t("about.0.cards.1.body")}
                    imageOnTop
                    priorityImage
                />,

                <DistrictCard
                    key="retail-bottom"
                    imageSrc="/images/cam10_open_retail_semi_bird_05.jpg"
                    imageAlt={t("about.1.cards.0.title.0")}
                    iconSrc="/icons/ml_icon_05.png"
                    title={t("about.1.cards.0.title.0")}
                    body={t("about.1.cards.0.body")}
                    bodyWidth={'ltr:max-w-[45ch] rtl:max-w-[25ch]'}
                    imageOnTop={false}
                />,

                <DistrictCard
                    key="hotel-top"
                    imageSrc="/images/01_cam_13_lobby hotel _02.jpg"
                    imageAlt={t("about.1.cards.1.title.0")}
                    iconSrc="/icons/ml_icon_08.png"
                    title={t("about.1.cards.1.title.0")}
                    body={t("about.1.cards.1.body")}
                    bodyWidth={'ltr:max-w-[45ch] rtl:max-w-[26ch]'}
                    imageOnTop
                />,

                <DistrictCard
                    key="retail-bottom-2"
                    imageSrc="/images/cam12_office landscape_view_05.jpg"
                    imageAlt={t("about.2.cards.0.title.0")}
                    iconSrc="/icons/ml_icon-06.png"
                    title={t("about.2.cards.0.title.0")}
                    body={t("about.2.cards.0.body")}
                    bodyWidth={'ltr:max-w-[45ch] rtl:max-w-[26ch]'}
                    imageOnTop={false}
                />,
                <MapCard
                    media={<MapMiraf/>}
                    iconSrc="/icons/ml_Icon.png"
                    iconAlt="map icon"
                    titles={{
                        line1: t("about.2.cards.1.title.0"),
                        line2: t("about.2.cards.1.title.1"),
                        line3: t("about.2.cards.1.title.2"),
                    }}
                    mediaOnTop
                />

            ]}
        />
    );

}
