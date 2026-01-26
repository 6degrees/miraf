"use client";

import Image from "next/image";
import {useTranslation} from "react-i18next";
import AnimatedText from "@/components/AnimatedText";

/*
|--------------------------------------------------------------------------
| $overview-section
|--------------------------------------------------------------------------
| Full-bleed overview hero:
| - Covers viewport height (uses `svh` when supported to avoid mobile
|   browser UI offset).
| - Background image is positioned with Next <Image fill>.
| - Subtle top-to-bottom darkening overlay via a linear-gradient.
|
| Note: Keep /images/full_project.png web-optimized (prefer WebP) to avoid
| heavy bundles and GitHub file-size limits.
*/
export default function OverviewSection() {
    /*
    |--------------------------------------------------------------------------
    | $i18n-handlers
    |--------------------------------------------------------------------------
    | - `t` : translator bound to current language (react-i18next)
    |
    | The `t` function is used to translate keys from your i18n resource files
    | based on the currently active language.
    |
    */
    const { t } = useTranslation();

    /*
    |--------------------------------------------------------------------------
    | $return-section
    |--------------------------------------------------------------------------
    | Main "Overview" section
    | - Responsive background image with overlay
    | - Dynamic pins translated via i18n (react-i18next)
    | - Adapts layout for mobile and large screens
    | - Includes heading and CTA button at the bottom
    */
    return (
        <section id="overview" className="relative min-h-[90vh] sm:min-h-[90vh] supports-[height:100svh]:min-h-[90svh] text-white overflow-hidden">
            <Image src="/images/overviewBG.png" alt="Aerial view of Miraf development showing modern buildings, green spaces, and urban landscape" fill priority sizes="100vw" className="object-cover object-[center_80%] -z-10"/>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(87,30,31,0)_0%,rgba(87,30,31,0)_40%,rgba(87,30,31,0.3)_70%,rgba(87,30,31,0.6)_100%)] pointer-events-none" />
            <div className="container-x relative mx-auto px-4 sm:px-6 lg:px-8 min-h-0 sm:min-h-[90vh] supports-[height:100svh]:sm:min-h-[90svh] flex flex-col justify-between py-8 sm:py-12 lg:py-20 pb-8 lg:pb-10">
                <div className="grid lg:hidden grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12 pt-6 sm:pt-8 text-center">
                    <AnimatedText delay={0} direction="up" duration={0.5}>
                        <div className="flex flex-col items-center gap-2 sm:gap-3 text-burgundy">
                            <Image src="/images/residence.png" alt="Residential buildings icon" width={40} height={40} className="w-10 h-10 sm:w-12 sm:h-12 image-hover" priority />
                            <span className="text-sm sm:text-base font-medium text-burgundy">{t("overview.pins.residences.title")}</span>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-3xl sm:text-4xl font-bold uppercase kanun text-burgundy">{t("overview.pins.residences.value")}</span>
                                <span className="text-xs sm:text-sm text-burgundy/80 kanun">{t("overview.pins.residences.unit")}</span>
                            </div>
                        </div>
                    </AnimatedText>

                    <AnimatedText delay={0.05} direction="up" duration={0.5}>
                        <div className="flex flex-col items-center gap-2 sm:gap-3 text-burgundy">
                            <Image src="/images/business.png" alt="Business tower icon" width={40} height={40} className="w-10 h-10 sm:w-12 sm:h-12 image-hover" priority />
                            <span className="text-sm sm:text-base font-medium text-burgundy">{t("overview.pins.tower.title")}</span>
                            <span className="text-xs sm:text-sm text-burgundy/80 kanun">{t("overview.pins.tower.subtitle")}</span>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-3xl sm:text-4xl font-bold uppercase kanun text-burgundy">{t("overview.pins.tower.value")}</span>
                                <span className="text-xs sm:text-sm text-burgundy/80 kanun">{t("overview.pins.tower.unit")}</span>
                            </div>
                        </div>
                    </AnimatedText>

                    <AnimatedText delay={0.1} direction="up" duration={0.5}>
                        <div className="flex flex-col items-center gap-2 sm:gap-3 text-burgundy">
                            <Image src="/images/hotel.png" alt="Hotel building icon" width={40} height={40} className="w-10 h-10 sm:w-12 sm:h-12 image-hover" priority />
                            <span className="text-sm sm:text-base font-medium text-burgundy">{t("overview.pins.hotel.title")}</span>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-3xl sm:text-4xl font-bold uppercase kanun text-burgundy">{t("overview.pins.hotel.value")}</span>
                                <span className="text-xs sm:text-sm text-burgundy/80 kanun">{t("overview.pins.hotel.unit")}</span>
                            </div>
                        </div>
                    </AnimatedText>

                    <AnimatedText delay={0.15} direction="up" duration={0.5}>
                        <div className="flex flex-col items-center gap-2 sm:gap-3 text-burgundy">
                            <Image src="/images/plaza.png" alt="Shopping plaza icon" width={40} height={40} className="w-10 h-10 sm:w-12 sm:h-12 image-hover" priority />
                            <span className="text-sm sm:text-base font-medium text-burgundy">{t("overview.pins.plaza.title")}</span>
                            <span className="text-xs sm:text-sm text-burgundy/80 kanun">{t("overview.pins.plaza.subtitle")}</span>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-3xl sm:text-4xl font-bold uppercase kanun text-burgundy">{t("overview.pins.plaza.value")}</span>
                                <span className="text-xs sm:text-sm text-burgundy/80 kanun">{t("overview.pins.plaza.unit")}</span>
                            </div>
                        </div>
                    </AnimatedText>
                </div>
                <div className="hidden lg:block relative h-[78vh]">
                    {/* Miraf Residences - Left */}
                    <div className="absolute left-[10%] top-[8%] text-center flex flex-col items-center space-y-1">
                        <div className="flex flex-col items-center space-y-1 text-burgundy">
                            <Image src="/images/residence.png" alt="Residential buildings icon" width={30} height={30} className="w-8 h-8" priority />
                            <span className="text-xl font-medium text-burgundy">{t("overview.pins.residences.title")}</span>
                            <div>
                                <span className="text-4xl font-bold uppercase kanun text-burgundy">{t("overview.pins.residences.value")}</span>
                                <span className="ms-2 text-base text-burgundy kanun">{t("overview.pins.residences.unit")}</span>
                            </div>
                        </div>
                        <div className="absolute top-full mt-2 w-[1px] h-[120px] bg-burgundy"></div>
                    </div>
                    
                    {/* The Plaza at Miraf - Center Left */}
                    <div className="absolute left-[35%] top-[8%] text-center flex flex-col items-center space-y-1">
                        <div className="flex flex-col items-center space-y-1 text-burgundy">
                            <Image src="/images/plaza.png" alt="Shopping plaza icon" width={30} height={30} className="w-8 h-8" priority />
                            <span className="text-xl font-medium text-burgundy">{t("overview.pins.plaza.title")}</span>
                            <span className="text-base text-burgundy kanun">{t("overview.pins.plaza.subtitle")}</span>
                            <div>
                                <span className="text-4xl font-bold uppercase kanun text-burgundy">{t("overview.pins.plaza.value")}</span>
                                <span className="ms-2 text-base text-burgundy kanun">{t("overview.pins.plaza.unit")}</span>
                            </div>
                        </div>
                        <div className="absolute top-full mt-2 w-[1px] h-[450px] bg-burgundy"></div>
                    </div>
                    
                    {/* Business Tower - Center Right */}
                    <div className="absolute left-[60%] top-[8%] text-center flex flex-col items-center space-y-1">
                        <div className="flex flex-col items-center space-y-1 text-burgundy">
                            <Image src="/images/business.png" alt="Business tower icon" width={30} height={30} className="w-8 h-8" priority />
                            <span className="text-xl font-medium text-burgundy">{t("overview.pins.tower.title")}</span>
                            <span className="text-base text-burgundy kanun">{t("overview.pins.tower.subtitle")}</span>
                            <div>
                                <span className="text-4xl font-bold uppercase kanun text-burgundy">{t("overview.pins.tower.value")}</span>
                                <span className="ms-2 text-base text-burgundy kanun">{t("overview.pins.tower.unit")}</span>
                            </div>
                        </div>
                        <div className="absolute top-full mt-2 w-[1px] h-[60px] bg-burgundy"></div>
                    </div>
                    
                    {/* Hotel INDIGO - Right */}
                    <div className="absolute right-[10%] top-[8%] text-center flex flex-col items-center space-y-1">
                        <div className="flex flex-col items-center space-y-1 text-burgundy">
                            <Image src="/images/hotel.png" alt="Hotel building icon" width={30} height={30} className="w-8 h-8" priority />
                            <span className="text-xl font-medium text-burgundy">{t("overview.pins.hotel.title")}</span>
                            <div>
                                <span className="text-4xl font-bold uppercase kanun text-burgundy">{t("overview.pins.hotel.value")}</span>
                                <span className="ms-2 text-base text-burgundy kanun">{t("overview.pins.hotel.unit")}</span>
                            </div>
                        </div>
                        <div className="absolute top-full mt-2 w-[1px] h-[150px] bg-burgundy"></div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between gap-6 sm:gap-8 pt-8 sm:pt-10 pb-3 mb-2">
                    <AnimatedText delay={0.2} direction="up" duration={0.5}>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-blush font-bold text-center sm:text-left">{t("nav.overview")}</h2>
                    </AnimatedText>
                    <AnimatedText delay={0.25} direction="up" duration={0.5}>
                        <a href="/documents/miraf.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/20 text-blush border-2 border-blush px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-base sm:text-lg font-medium shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition-all duration-300 kanun">{t("overview.cta")}</a>
                    </AnimatedText>
                </div>
            </div>
        </section>
    );
}
