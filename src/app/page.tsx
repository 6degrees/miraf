"use client";

import Banner from "@/components/Banner";
import About from "@/components/About";
import OverviewSection from "@/components/OverviewSection";
import District from "@/components/District";
import Residences from "@/components/Residences";
import {useTranslation} from "react-i18next";

/*
|--------------------------------------------------------------------------
| Home Page
|--------------------------------------------------------------------------
|
| Lightweight page that renders the hero Banner component.
| Keep this file minimal; put layout/SEO in app/layout.tsx and
| encapsulate hero logic inside <Banner />.
|
*/
export default function HomePage() {
    /*
    |--------------------------------------------------------------------------
    | $i18n-translator
    |--------------------------------------------------------------------------
    |
    | Retrieve the `t` function from i18next for localized strings.
    |
    */
    const {t} = useTranslation();

    return (
        <main>
            {/* Primary hero section */}
            <Banner/>
            <District/>
            <OverviewSection/>
            <About/>
            <Residences
                imageSrc="/images/Cam21_Pool_05.jpg"
                title={t("residences.title")}
                subtitle={t("residences.subtitle")}
                body={t("residences.body")}
                ctaLabel={t("residences.cta")}
            />
        </main>
    );
}
