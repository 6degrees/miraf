"use client";

import {useTranslation} from "react-i18next";
import Slider from "@/components/Slider";
import {useAppContext} from "@/context/AppContext";
import DistrictTitleCard from "@/components/DistrictTitleCard";
import DistrictCard from "@/components/DistrictCard";
import MapMiraf from "@/components/MapMiraf";
import MapCard from "@/components/MapCard";
import AboutCard from "@/components/AboutCard";
import AboutShowcaseCard from "@/components/AboutCard";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <AboutShowcaseCard
              images={[{ src: "/images/02_Cam1_Road_Front_Building_06.jpg", priority: true }]}
               icons={[
                 { src: "/icons/blob-1.svg" },
                 { src: "/icons/blob-2.svg" },
              ]}
              kicker="What does living in Miraf look like"
             titleLines={["Flourishing Minds,", "Communities", "and Life"]}
              layout="image-left"
              blobs={[
                { className: "absolute right-24 -top-3 w-6 h-6 rounded-[18px] bg-[#EAD5F9]" },
                { className: "absolute right-10 top-14 w-12 h-6 rounded-full bg-[#EAD5F9] rotate-[-8deg]" },
              ]}
            />

        </div>
    );

}
