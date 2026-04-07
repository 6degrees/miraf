"use client";

import Image from "next/image";
import {useTranslation} from "react-i18next";
import AnimatedText from "@/components/AnimatedText";
import {getBaseUrl, useAppContext} from "@/context/AppContext";

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
/*
|--------------------------------------------------------------------------
| $overview-section
|--------------------------------------------------------------------------
|
| Same UI — stable + safe dynamic data from API
|
*/
export default function OverviewSection({ section }: { section: any }) {
    if (!section) return null;

    const { selectedLanguage } = useAppContext();

    const stats = section?.stats || [];

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
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | $helpers
    |--------------------------------------------------------------------------
    */
    const getTitle = (item: any) =>
        selectedLanguage === "ar" ? item?.title_ar : item?.title_en;

    const getSubtitle = (item: any) =>
        selectedLanguage === "ar" ? item?.subtitle_ar : item?.subtitle_en;

    const getUnit = (item: any) =>
        selectedLanguage === "ar" ? item?.suffix_ar : item?.suffix_en;

    const getIcon = (item: any) => {
        const url = item?.icon?.url;
        return url ? `${getBaseUrl()}${url}` : null;
    };

    /*
    |--------------------------------------------------------------------------
    | $safe-mapping (IMPORTANT)
    |--------------------------------------------------------------------------
    |
    | Do NOT rely on index
    | Find items safely based on title
    |
    */
    const residences = stats.find((s: any) =>
        s?.key?.toLowerCase().includes("residence")
    );

    const plaza = stats.find((s: any) =>
        s?.key?.toLowerCase().includes("plaza")
    );

    const tower = stats.find((s: any) =>
        s?.key?.toLowerCase().includes("tower")
    );

    const hotel = stats.find((s: any) =>
        s?.key?.toLowerCase().includes("hotel")
    );

    /*
    |--------------------------------------------------------------------------
    | $clean-arrays (REMOVE undefined)
    |--------------------------------------------------------------------------
    */
    const items = [residences, plaza, tower, hotel].filter(Boolean);

    /*
    |--------------------------------------------------------------------------
    | $clean-arrays (REMOVE undefined)
    |--------------------------------------------------------------------------
    */
    const positions = ["left-[10%]", "left-[35%]", "left-[60%]", "right-[10%]"];

    /*
    |--------------------------------------------------------------------------
    | $clean-arrays (REMOVE undefined)
    |--------------------------------------------------------------------------
    */
    const height = ["h-[120px]", "h-[450px]", "h-[60px]", "h-[150px]"];

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
            {/* Background */}
            {section?.background?.url && (<Image src={`${getBaseUrl()}${section.background.url}`} alt="Aerial view of Miraf development showing modern buildings, green spaces, and urban landscape" fill priority sizes="100vw" className="object-cover object-[center_80%] -z-10"/>)}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(87,30,31,0)_0%,rgba(87,30,31,0)_40%,rgba(87,30,31,0.3)_70%,rgba(87,30,31,0.6)_100%)] pointer-events-none" />
            <div className="container-x relative mx-auto px-4 sm:px-6 lg:px-8 min-h-0 sm:min-h-[90vh] supports-[height:100svh]:sm:min-h-[90svh] flex flex-col justify-between py-8 sm:py-12 lg:py-20 pb-8 lg:pb-10">
                <div className="grid lg:hidden grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12 pt-6 sm:pt-8 text-center">
                    {items.map((item: any, i) => (
                        <AnimatedText key={'mobile-overview' + i} delay={i * 0.05} direction="up" duration={0.5}>
                            <div className="flex flex-col items-center gap-2 sm:gap-3 text-burgundy">
                                {getIcon(item) && (<Image src={getIcon(item)!} alt="Residential buildings icon" width={40} height={40} className="w-10 h-10 sm:w-12 sm:h-12 image-hover" priority />)}
                                <span className="text-sm sm:text-base font-medium text-burgundy">{getTitle(item)}</span>
                                <span className="text-xs sm:text-sm text-burgundy/80 kanun">{getSubtitle(item)}</span>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-3xl sm:text-4xl font-bold uppercase kanun text-burgundy">{item?.value}</span>
                                    <span className="text-xs sm:text-sm text-burgundy/80 kanun">{getUnit(item)}</span>
                                </div>
                            </div>
                        </AnimatedText>
                    ))}
                </div>
                <div className="hidden lg:block relative h-[78vh]">
                    {/* Miraf Residences - Left */}
                    {items.map((item: any, i) => (
                        <AnimatedText key={'mobile-overview' + i} delay={i * 0.05} direction="up" duration={0.6}>
                            <div className={`absolute ${positions[i]} top-[8%] text-center flex flex-col items-center space-y-1`}>
                                <div className="flex flex-col items-center space-y-1 text-burgundy">
                                    {getIcon(item) && (<Image src={getIcon(item)!} alt="Residential buildings icon" width={30} height={30} className="w-8 h-8" priority />)}
                                    <span className="text-xl font-medium text-burgundy">{getTitle(item)}</span>
                                    <span className="text-base text-burgundy kanun">{getSubtitle(item)}</span>
                                    <div>
                                        <span className="text-4xl font-bold uppercase kanun text-burgundy">{item?.value}</span>
                                        <span className="ms-2 text-base text-burgundy kanun">{getUnit(item)}</span>
                                    </div>
                                </div>
                                <div className={`absolute top-full mt-2 w-[1px] ${height[i]} bg-burgundy`}></div>
                            </div>
                        </AnimatedText>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between gap-6 sm:gap-8 pt-8 sm:pt-10 pb-3 mb-2">
                    <AnimatedText delay={0.2} direction="up" duration={0.5}>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-blush font-bold text-center sm:text-left">{selectedLanguage === "ar" ? section?.title_ar : section?.title_en}</h2>
                    </AnimatedText>
                    <AnimatedText delay={0.25} direction="up" duration={0.5}>
                        <a href={section.button?.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/20 text-blush border-2 border-blush px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-base sm:text-lg font-medium shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition-all duration-300 kanun">{selectedLanguage === "ar" ? section?.button?.title_ar : section?.button?.title_en}</a>
                    </AnimatedText>
                </div>
            </div>
        </section>
    );
}
