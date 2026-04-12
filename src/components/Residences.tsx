"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import {useTranslation} from "react-i18next";
import {useAppContext} from "@/context/AppContext";
import {getBaseUrl} from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $residences-section:props
|--------------------------------------------------------------------------
|
| Receives full section data from CMS
|
*/
type Props = {
    section: any;
};

export default function ResidencesSection({section}: Props) {

    /*
    |--------------------------------------------------------------------------
    | $context
    |--------------------------------------------------------------------------
    |
    | Get language + direction
    |
    */
    const {t} = useTranslation();
    const {direction, selectedLanguage} = useAppContext();
    const isRTL = direction === "rtl";

    /*
    |--------------------------------------------------------------------------
    | $guard
    |--------------------------------------------------------------------------
    |
    | Prevent render if section is missing
    |
    */
    if (!section) return null;

    /*
    |--------------------------------------------------------------------------
    | $helpers
    |--------------------------------------------------------------------------
    |
    | Resolve data from API without changing layout
    |
    */
    const title =
        selectedLanguage === "ar"
            ? section?.title_ar
            : section?.title_en;

    const subtitle =
        selectedLanguage === "ar"
            ? section?.subtitle_ar
            : section?.subtitle_en;

    const body =
        selectedLanguage === "ar"
            ? section?.description_ar
            : section?.description_en;

    /*
    |--------------------------------------------------------------------------
    | $media
    |--------------------------------------------------------------------------
    |
    | Use API values with fallback to preserve layout
    |
    */
    const imageSrc = section?.image?.url
        ? `${getBaseUrl()}${section.image.url}`
        : "/images/Cam21_Pool_05.jpg";

    const iconSrc = section?.icon?.url
        ? `${getBaseUrl()}${section.icon.url}`
        : "/Vector.svg";

    /*
    |--------------------------------------------------------------------------
    | $buttons
    |--------------------------------------------------------------------------
    |
    | Resolve button labels
    |
    */
    const primaryLabel =
        selectedLanguage === "ar"
            ? section?.primary_button?.title_ar
            : section?.primary_button?.title_en;

    const secondaryLabel =
        selectedLanguage === "ar"
            ? section?.secondary_button?.title_ar
            : section?.secondary_button?.title_en;

    /*
    |--------------------------------------------------------------------------
    | $residences-section:layout
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | - This layout is NOT modified
    | - Only dynamic data injected
    |
    */
    return (
        <section
            className={`relative w-full min-h-0 lg:h-[100svh] lg:max-h-[1000px] pb-8 sm:pb-12 md:pb-16 lg:pb-0 pt-0 sm:pt-10 md:pt-12 lg:pt-0 bg-[#B79A5C] text-[#F6E6DA] overflow-x-hidden`}>
            <div className="w-full min-h-0 lg:h-full flex flex-col lg:flex-row lg:items-center lg:justify-center">

                {/* Right: Text Content */}
                <div
                    className="w-full lg:w-2/3 order-2 lg:order-1 flex flex-col justify-center items-start text-start lg:items-start lg:text-start px-4 sm:px-6 md:px-10 lg:px-16 mt-4 sm:mt-6 lg:mt-0 pb-4 sm:pb-6 lg:pb-0">

                    <AnimatedText delay={0.1} direction="up" duration={0.8}>
                        <div className="flex flex-col items-start mt-2 sm:mt-4 md:mt-6 mb-2 sm:mb-4">

                            {/* ICON */}
                            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                                <Image
                                    src={iconSrc}
                                    alt="Residential buildings icon"
                                    width={64}
                                    height={64}
                                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                                    loading="lazy"
                                />
                            </div>

                            {/* TITLE */}
                            <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-semibold leading-tight">
                                {title}
                            </h2>
                        </div>
                    </AnimatedText>

                    {/* SUBTITLE */}
                    {subtitle && (
                        <AnimatedText delay={0.2} direction="up" duration={0.8}>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-4 sm:mb-6 mt-2 sm:mt-4 md:mt-6 leading-tight">
                                {subtitle}
                            </p>
                        </AnimatedText>
                    )}

                    {/* BODY */}
                    {body && (
                        <AnimatedText delay={0.3} direction="up" duration={0.8}>
                            <p className="text-sm sm:text-base md:text-md leading-relaxed mb-6 sm:mb-8 arabic-body max-w-full sm:max-w-[90%] md:max-w-[85%] lg:max-w-[70%] xl:max-w-[65%]">
                                {body}
                            </p>
                        </AnimatedText>
                    )}

                    {/* CTA BUTTONS */}
                    <AnimatedText delay={0.4} direction="up" duration={0.8}>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-8 w-full">

                            {primaryLabel && (
                                <Link
                                    href={section?.primary_button?.url || '#'}
                                    className="inline-block rounded-full border border-[#F6E6DA] px-6 py-2.5 text-base text-[#F6E6DA] hover:bg-[#F6E6DA]/10 transition kanun text-center whitespace-nowrap"
                                >
                                    {primaryLabel}
                                </Link>
                            )}

                            {secondaryLabel && (
                                <Link
                                    href={section?.secondary_button?.url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block rounded-full border border-[#F6E6DA] px-6 py-2.5 text-base text-[#F6E6DA] hover:bg-[#F6E6DA]/10 transition kanun text-center whitespace-nowrap"
                                >
                                    {secondaryLabel}
                                </Link>
                            )}

                        </div>
                    </AnimatedText>
                </div>

                {/* Left: Image */}
                <div className="w-full order-1 lg:order-2 lg:w-1/3 relative lg:relative">
                    <div
                        className={`relative left-1/2 -translate-x-1/2 w-screen sm:left-1/2 sm:-translate-x-1/2 sm:w-screen md:left-0 md:translate-x-0 md:w-[calc(100%+5rem)] lg:left-0 lg:translate-x-0 lg:w-full h-[50svh] min-h-[300px] max-h-[600px] sm:h-[55svh] sm:min-h-[350px] sm:max-h-[650px] md:h-[60svh] md:min-h-[400px] md:max-h-[700px] lg:h-[70svh] lg:min-h-0 lg:max-h-none overflow-hidden ${
                            isRTL
                                ? "lg:rounded-r-3xl lg:rounded-tr-3xl lg:rounded-br-3xl lg:rounded-tl-none lg:rounded-l-none lg:rounded-bl-none"
                                : "lg:rounded-l-3xl lg:rounded-tl-3xl lg:rounded-bl-3xl lg:rounded-br-none lg:rounded-r-none lg:rounded-tr-none"
                        }`}>
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className={`object-cover image-hover ${
                                isRTL
                                    ? "lg:rounded-r-3xl lg:rounded-tr-3xl lg:rounded-br-3xl lg:rounded-tl-none lg:rounded-l-none lg:rounded-bl-none"
                                    : "lg:rounded-l-3xl lg:rounded-tl-3xl lg:rounded-bl-3xl lg:rounded-br-none lg:rounded-r-none lg:rounded-tr-none"
                            }`}
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

