"use client";

import Slider from "@/components/Slider";
import {useAppContext} from "@/context/AppContext";
import DistrictTitleCard from "@/components/DistrictTitleCard";
import DistrictCard from "@/components/DistrictCard";
import MapMiraf from "@/components/MapMiraf";
import MapCard from "@/components/MapCard";
import {getBaseUrl} from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $about-district
|--------------------------------------------------------------------------
|
| Dynamic district section driven by CMS data
|
*/
export default function District({section}: { section: any }) {

    /*
    |--------------------------------------------------------------------------
    | $context
    |--------------------------------------------------------------------------
    |
    | Get current language + direction
    |
    */
    const {direction, selectedLanguage} = useAppContext();

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
    const getTitle = (item: any) => selectedLanguage === "ar" ? item?.title_ar?.title : item?.title_en?.title;

    const getIcon = (item: any) => {
        const url = selectedLanguage === "ar" ? item?.title_ar?.icon?.[0]?.url : item?.title_en?.icon?.[0]?.url;
        if (!url) return null;
        return `${getBaseUrl()}${url}`;
    };

    const getDescription = (item: any) => selectedLanguage === "ar" ? item?.description_ar : item?.description_en;

    const getImage = (item: any) => item?.image?.[0]?.url ? `${getBaseUrl()}${item.image[0].url}` : null;

    /*
    |--------------------------------------------------------------------------
    | $title-split
    |--------------------------------------------------------------------------
    |
    | Split title into 3 lines safely
    |
    */
    const splitTitle = (title: string = "") => {
        const words = title.split(" ");
        return {
            line1: words[0] || "",
            line2: words[1] || "",
            line3: words.slice(2).join(" ") || "",
        };
    };

    /*
    |--------------------------------------------------------------------------
    | $section-render
    |--------------------------------------------------------------------------
    */
    return (
        <Slider
            id="district"
            dir={direction}
            breakpoints={{
                0: {slidesPerView: 1, spaceBetween: 0},
                640: {slidesPerView: 1, spaceBetween: 0},
                768: {slidesPerView: 1, spaceBetween: 0},
                1024: {slidesPerView: 1.2, spaceBetween: 0},
                1280: {slidesPerView: 1.4, spaceBetween: 0},
            }}
            heightClass="h-auto min-h-0 sm:min-h-[100vh] supports-[height:100svh]:sm:min-h-[100svh] xl:max-h-[1000px] py-4 sm:py-5 md:py-8 lg:py-14 xl:py-16"
            gsapSize={1.6}
            autoplayDelay={0}
            items={[
                /*
                |--------------------------------------------------------------------------
                | $title-card (first item)
                |--------------------------------------------------------------------------
                */
                (() => {
                    const t = splitTitle(getTitle(items[0]));
                    return (
                        <DistrictTitleCard
                            key="title"
                            titleLine1={t.line1}
                            titleLine2={t.line2}
                            titleLine3={t.line3}
                            body={getDescription(items[0])}
                            iconSrc={getIcon(items[0]) || undefined}
                            iconAlt={getTitle(items[0])}
                            gapClass="gap-4 sm:gap-6"
                            iconSizeClass="h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24"

                        />
                    );
                })(),

                /*
                |--------------------------------------------------------------------------
                | $district-cards (middle items)
                |--------------------------------------------------------------------------
                */
                ...items.slice(1, -1).map((item: any, index: number) => {
                    const isFirstCard = index === 0;

                    return (
                        <DistrictCard
                            key={item.id}
                            imageSrc={getImage(item) || undefined}
                            imageAlt={getTitle(item)}
                            iconSrc={getIcon(item) || undefined}
                            title={getTitle(item)}
                            body={getDescription(item)}

                            /*
                            |--------------------------------------------------------------------------
                            | $layout-logic
                            |--------------------------------------------------------------------------
                            |
                            | - First card: image on top + priority image
                            | - Then alternate layout
                            |
                            */
                            imageOnTop={isFirstCard ? true : index % 2 === 0}
                            priorityImage={isFirstCard}
                        />
                    );
                }),

                /*
                |--------------------------------------------------------------------------
                | $map-card (last item)
                |--------------------------------------------------------------------------
                */
                (() => {
                    const last = items[items.length - 1];
                    const t = splitTitle(getTitle(last));

                    return (
                        <MapCard
                            key="map"
                            media={<MapMiraf/>}
                            iconSrc={getIcon(last) || undefined}
                            iconAlt="map"
                            titles={{
                                line1: t.line1,
                                line2: t.line2,
                                line3: t.line3,
                            }}
                            mediaOnTop
                        />
                    );
                })(),
            ]}
        />
    );
}
