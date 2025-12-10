"use client";

import Image from "next/image";
import Header from "@/components/Header";
import {useTranslation} from "react-i18next";
import AnimatedText from "@/components/AnimatedText";

/*
|--------------------------------------------------------------------------
| $site-header
|--------------------------------------------------------------------------
|
| Miraf top navigation (logo, links, language toggle, mobile drawer).
| - Self-manages the mobile menu state.
| - Receives `rtl` and `toggleDir` from the parent (page/layout).
|
| Usage:
|   <Header rtl={rtl} toggleDir={toggleDir} />
|
*/
export default function Banner() {
    /*
    |--------------------------------------------------------------------------
    | $i18n-translator
    |--------------------------------------------------------------------------
    | Get `t` for localized strings.
    */
    const { t } = useTranslation();

    /*
    |--------------------------------------------------------------------------
    | $hero-section
    |--------------------------------------------------------------------------
    |
    | Full-bleed hero with:
    | - Background image + burgundy gradient overlay
    | - Top navigation <Header />
    | - Localized two-line title anchored to bottom (uses i18n: hero.line1/line2/palmAlt)
    | - Uses Tailwind `container` and responsive bottom padding
    |
    */
    return (
        <section className="relative h-[100svh] max-h-[1000px] text-white overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <video
                    className="h-full w-full object-cover"
                    src="/videos/hero.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                />
                <div className="absolute inset-0" style={{background: "linear-gradient(180deg, rgba(26,13,13,0) 0%, rgba(87,30,31,0.34) 46%, rgba(87,30,31,0.62) 70%, rgba(74,17,18,0.78) 85%, rgba(56,7,9,0.92) 100%)",}}/>
            </div>

            {/* NAVBAR */}
            <Header />

            {/* HEADLINE */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="container-x">
                    <div className="pb-20 md:pb-28 lg:pb-32">
                        <h1 className="w-full md:max-w-5xl text-5xl sm:text-6xl md:text-7xl font-bold text-blush">
                            <AnimatedText delay={0.2} direction="up" duration={1}>
                                <span className="flex items-center gap-3">
                                    <span className="inline">{t("hero.line1")}</span>
                                    <Image src="/icons/palm.png" alt={t("hero.palmAlt")} height={80} width={80} className="inline-block h-12 w-12 md:h-16 md:w-16 object-contain image-hover mt-8"/>
                                </span>
                            </AnimatedText>
                            <AnimatedText delay={0.4} direction="up" duration={1}>
                                <span className="block">{t("hero.line2")}</span>
                            </AnimatedText>
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}

