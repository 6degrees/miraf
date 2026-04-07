"use client";

import Image from "next/image";
import Header from "@/components/Header";
import AnimatedText from "@/components/AnimatedText";
import {useAppContext} from "@/context/AppContext";
import {getBaseUrl} from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $site-header
|--------------------------------------------------------------------------
|
| Miraf top navigation (logo, links, language toggle, mobile drawer).
|
*/
export default function Banner(
    {
        header,
        hero
    }: {
        header: any;
        hero: any;
    }) {

    /*
    |--------------------------------------------------------------------------
    | $context
    |--------------------------------------------------------------------------
    |
    | Retrieve current selected language from global context
    |
    */
    const {selectedLanguage} = useAppContext();

    /*
    |--------------------------------------------------------------------------
    | $hero-guard
    |--------------------------------------------------------------------------
    |
    | Prevent rendering errors if hero section is not available yet
    |
    */
    if (!hero) {
        return (
            <section className="relative h-[100svh] bg-black">
                <Header header={header}/>
            </section>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | $title-data
    |--------------------------------------------------------------------------
    |
    | Select localized title based on current language
    |
    */
    const titleData =
        selectedLanguage === "ar" ? hero.title_ar : hero.title_en;

    /*
    |--------------------------------------------------------------------------
    | $media-urls
    |--------------------------------------------------------------------------
    |
    | Resolve full URLs for video background and icon asset
    |
    */
    const videoUrl = `${getBaseUrl()}${hero?.background?.url}`;
    const iconUrl = `${getBaseUrl()}${titleData?.icon?.[0]?.url}`;

    /*
    |--------------------------------------------------------------------------
    | $title-splitter
    |--------------------------------------------------------------------------
    |
    | Splits title into two parts to place icon between them.
    | - Arabic: first word on top, rest below
    | - English: first 3 words, then icon, then rest
    | - Short text: fallback to first word split
    |
    */
    function splitTitle(title: string, lang: string) {
        const words = (title || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (words.length === 0) {
            return {first: "", rest: ""};
        }

        if (lang === "ar") {
            return {
                first: words[0],
                rest: words.slice(1).join(" "),
            };
        }

        const splitIndex = words.length <= 3 ? 1 : 3;

        return {
            first: words.slice(0, splitIndex).join(" "),
            rest: words.slice(splitIndex).join(" "),
        };
    }

    const {first, rest} = splitTitle(
        titleData?.title || "",
        selectedLanguage || "en"
    );

    /*
    |--------------------------------------------------------------------------
    | $hero-section-render
    |--------------------------------------------------------------------------
    |
    | Renders hero banner with:
    | - Background video
    | - Gradient overlay
    | - Header navigation
    | - Animated headline with dynamic split + icon
    |
    */
    return (
        <section className="relative h-[100svh] max-h-[1000px] text-white overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <video key={videoUrl} className="h-full w-full object-cover" src={videoUrl} autoPlay muted loop playsInline preload="metadata"/>
                <div className="absolute inset-0" style={{background: "linear-gradient(180deg, rgba(26,13,13,0) 0%, rgba(87,30,31,0.34) 46%, rgba(87,30,31,0.62) 70%, rgba(74,17,18,0.78) 85%, rgba(56,7,9,0.92) 100%)",}}/>
            </div>

            {/* NAVBAR */}
            <Header header={header}/>

            {/* HEADLINE */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="container-x">
                    <div className="pb-20 md:pb-28 lg:pb-32">
                        <h1 className="w-full md:max-w-5xl text-5xl sm:text-6xl md:text-7xl font-bold text-blush">
                            <AnimatedText delay={0.2} direction="up" duration={1}>
                                <span className="flex items-center gap-3">
                                    <span className="inline">{first}</span>
                                    {iconUrl && (<Image src={iconUrl} alt={first} height={80} width={80} className="inline-block h-12 w-12 md:h-16 md:w-16 object-contain image-hover mt-8"/>)}
                                </span>
                            </AnimatedText>
                            <AnimatedText delay={0.4} direction="up" duration={1}>
                                {rest && (<span className="block">{rest}</span>)}
                            </AnimatedText>
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}

