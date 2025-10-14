"use client";

import Image from "next/image";
import {useTranslation} from "react-i18next";

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
        <section className="relative text-white overflow-hidden min-h-[100vh] supports-[height:100svh]:min-h-[100svh]">
            <Image src="/images/full_project.png" alt="Miraf Overview" fill priority sizes="100vw" className="object-cover object-center -z-10"/>
            <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(180deg,rgba(56,7,9,0)_0%,rgba(56,7,9,0.55)_45%,rgba(56,7,9,0.85)_100%)] pointer-events-none" />
            <div className="container-x relative mx-auto px-4 sm:px-6 lg:px-8 min-h-[100vh] flex flex-col justify-between py-12 sm:py-16 lg:py-20">
                <div className="flex lg:hidden flex-col items-center gap-6 sm:gap-8 pt-10">
                    <div className="flex flex-col items-center gap-1 text-violet-200">
                        <Image src="/icons/ml_icon-12.png" alt="" width={40} height={40} className="w-8 h-8" />
                        <span className="text-sm sm:text-base">{t("overview.pins.residences.title")}</span>
                        <div>
                            <span className="text-3xl font-semibold">{t("overview.pins.residences.value")}</span>
                            <span className="ml-2 text-xs">{t("overview.pins.residences.unit")}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-amber-300">
                        <Image src="/icons/ml_icon-11.png" alt="" width={40} height={40} className="w-8 h-8" />
                        <span className="text-sm sm:text-base">{t("overview.pins.tower.title")}</span>
                        <span className="text-xs sm:text-sm">{t("overview.pins.tower.subtitle")}</span>
                        <div>
                            <span className="text-3xl font-semibold">{t("overview.pins.tower.value")}</span>
                            <span className="ml-2 text-xs">{t("overview.pins.tower.unit")}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-burgundy">
                        <Image src="/icons/ml_icon-13.png" alt="" width={40} height={40} className="w-8 h-8" />
                        <span className="text-sm sm:text-base">{t("overview.pins.hotel.title")}</span>
                        <div>
                            <span className="text-3xl font-semibold">{t("overview.pins.hotel.value")}</span>
                            <span className="ml-2 text-xs">{t("overview.pins.hotel.unit")}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-[#de6b26]">
                        <Image src="/icons/ml_Icon-10.png" alt="" width={40} height={40} className="w-8 h-8" />
                        <span className="text-sm sm:text-base">{t("overview.pins.plaza.title")}</span>
                        <span className="text-xs sm:text-sm">{t("overview.pins.plaza.subtitle")}</span>
                        <div>
                            <span className="text-3xl font-semibold">{t("overview.pins.plaza.value")}</span>
                            <span className="ml-2 text-xs">{t("overview.pins.plaza.unit")}</span>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block relative h-[78vh]">
                    <div className="absolute left-[18%] top-[15%] text-violet-200 text-center flex flex-col items-center space-y-1">
                        <Image src="/icons/ml_icon-12.png" alt="" width={30} height={30} className="w-8 h-8" />
                        <span className="text-xl font-medium">{t("overview.pins.residences.title")}</span>
                        <div>
                            <span className="text-4xl font-semibold">{t("overview.pins.residences.value")}</span>
                            <span className="ml-2 text-base">{t("overview.pins.residences.unit")}</span>
                        </div>
                    </div>
                    <div className="absolute left-[58%] -translate-x-1/2 top-[10%] text-amber-300 text-center flex flex-col items-center space-y-1">
                        <Image src="/icons/ml_icon-11.png" alt="" width={30} height={30} className="w-8 h-8" />
                        <span className="text-xl font-medium">{t("overview.pins.tower.title")}</span>
                        <span className="text-base">{t("overview.pins.tower.subtitle")}</span>
                        <div>
                            <span className="text-4xl font-semibold">{t("overview.pins.tower.value")}</span>
                            <span className="ml-2 text-base">{t("overview.pins.tower.unit")}</span>
                        </div>
                    </div>
                    <div className="absolute right-[2%] top-[15%] text-burgundy text-center flex flex-col items-center space-y-1">
                        <Image src="/icons/ml_icon-13.png" alt="" width={30} height={30} className="w-8 h-8" />
                        <span className="text-xl font-medium">{t("overview.pins.hotel.title")}</span>
                        <div>
                            <span className="text-4xl font-semibold">{t("overview.pins.hotel.value")}</span>
                            <span className="ml-2 text-base">{t("overview.pins.hotel.unit")}</span>
                        </div>
                    </div>
                    <div className="absolute left-[50%] -translate-x-1/2 top-[48%] text-[#de6b26] text-center flex flex-col items-center space-y-1">
                        <Image src="/icons/ml_Icon-10.png" alt="" width={30} height={30} className="w-8 h-8" />
                        <span className="text-xl font-medium">{t("overview.pins.plaza.title")}</span>
                        <span className="text-base">{t("overview.pins.plaza.subtitle")}</span>
                        <div>
                            <span className="text-4xl font-semibold">{t("overview.pins.plaza.value")}</span>
                            <span className="ml-2 text-base">{t("overview.pins.plaza.unit")}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 pt-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-white/95">{t("nav.overview")}</h2>
                    <a href="#" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white px-6 py-2.5 md:px-10 md:py-3 text-sm md:text-lg font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.25)] backdrop-blur hover:bg-white/30 transition">{t("overview.cta")}</a>
                </div>
            </div>
        </section>
    );
}
