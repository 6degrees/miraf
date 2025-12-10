"use client";

import Banner from "@/components/Banner";
import About from "@/components/About";
import OverviewSection from "@/components/OverviewSection";
import District from "@/components/District";
import Residences from "@/components/Residences";
import {useTranslation} from "react-i18next";
import Developer from "@/components/Developer";
import Gallery from "@/components/Gallery";
import CommunitySignupSection from "@/components/CommunitySignupSection";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import PinnedButtons from "@/components/PinnedButtons";

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

    /*
    |------------------------------------------------------------------------------
    | $page-render
    |------------------------------------------------------------------------------
    | Renders the main structure of the landing page.
    |------------------------------------------------------------------------------
    |
    | - Wraps all major homepage sections inside a <main> container.
    | - Sequentially composes the full layout:
    |     → Banner: hero introduction
    |     → District: project overview
    |     → OverviewSection: summary of core areas
    |     → About: detailed description
    |     → Residences: residential highlight section
    |     → Gallery: image showcase
    |     → Developer: developer information + call to action
    |     → CommunitySignupSection: sign-up form for engagement
    |     → Footer: bottom navigation + contact details
    | - Uses translation keys (t) for localized content.
    | - Ensures consistent structure across Arabic and English layouts.
    |
    */
    return (
        <>
            <StructuredData />
            <PinnedButtons />
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
                <Gallery/>
                <Developer logoSrc="/icons/Refad Logo.png"
                    decoSrc="/icons/ML_Icon-22.png"
                    imageSrc="/images/clark_van_der_beken_KvuSeA5Ep4c_unsplash.jpg"
                    title={t("developer.title")}
                    bodyTop={t("developer.bodyTop")}
                    bodyBottom={t("developer.bodyBottom")}
                    ctaLabel={t("developer.cta")}
                    ctaHref="#"
                />
                <CommunitySignupSection heading={t("signup.title")} subheading={t("signup.subtitle")}/>
                <Footer/>
            </main>
        </>
    );
}
