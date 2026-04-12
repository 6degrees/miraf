"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import {useAppContext} from "@/context/AppContext";
import {getBaseUrl} from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $developer-section:props
|--------------------------------------------------------------------------
|
| Now receives full CMS section instead of manual props
|
*/
type DeveloperSectionProps = {
    section: any;
};

export default function Developer({section}: DeveloperSectionProps) {

    const {direction, selectedLanguage} = useAppContext();
    const isRTL = direction === "rtl";

    /*
    |--------------------------------------------------------------------------
    | $guard
    |--------------------------------------------------------------------------
    */
    if (!section) return null;

    /*
    |--------------------------------------------------------------------------
    | $helpers
    |--------------------------------------------------------------------------
    |
    | Resolve CMS data (WITHOUT touching layout)
    |
    */
    const title =
        selectedLanguage === "ar"
            ? section?.title_ar
            : section?.title_en;

    const bodyTop =
        selectedLanguage === "ar"
            ? section?.description_top_ar
            : section?.description_top_en;

    const bodyBottom =
        selectedLanguage === "ar"
            ? section?.description_bottom_ar
            : section?.description_bottom_en;

    // 👇 NEW (full description fallback without removing existing logic)
    const body =
        selectedLanguage === "ar"
            ? section?.description_ar
            : section?.description_en;

    const ctaLabel =
        selectedLanguage === "ar"
            ? section?.button?.title_ar
            : section?.button?.title_en;

    const ctaHref = section?.button?.url || "#";

    /*
    |--------------------------------------------------------------------------
    | $media
    |--------------------------------------------------------------------------
    */
    const logoSrc = section?.logo?.url
        ? `${getBaseUrl()}${section.logo.url}`
        : "/icons/Refad Logo.png";

    const decoSrc = section?.deco?.url
        ? `${getBaseUrl()}${section.deco.url}`
        : "/icons/ML_Icon-22.png";

    const imageSrc = section?.image?.url
        ? `${getBaseUrl()}${section.image.url}`
        : "/images/clark_van_der_beken_KvuSeA5Ep4c_unsplash.jpg";

    /*
    |--------------------------------------------------------------------------
    | $developer-section:layout
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | - No layout changes
    | - Only dynamic data
    |
    */
    return (
        <section id="developer"
                 className="w-full bg-blush text-burgundy pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-16 md:pb-16 lg:pt-32 lg:pb-32">
            <div
                className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.15fr)] gap-6 sm:gap-8 lg:gap-10 items-start">

                {/* LOGO */}
                <AnimatedText delay={0.1} direction="up" duration={0.8}>
                    <div
                        className="order-1 w-full flex flex-col items-start gap-4 sm:gap-6 px-4 sm:px-6 md:px-10 lg:px-16 pt-6 sm:pt-8 lg:pt-0">
                        <div className="relative w-[180px] sm:w-[220px] lg:w-[140px] pt-0 lg:pt-9">
                            <Image src={logoSrc} alt="logo" width={180} height={180}
                                   className="object-contain image-hover"/>
                        </div>

                        {decoSrc && (
                            <Image src={decoSrc} alt="" width={100} height={40} className="object-contain image-hover"/>
                        )}
                    </div>
                </AnimatedText>

                {/* TEXT */}
                <AnimatedText delay={0.2} direction="up" duration={0.8}>
                    <div className="order-2 w-full px-4 sm:px-6 md:px-10 lg:px-0">
                        <div className="max-w-md">

                            <h2 className="text-[2.9rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] mb-8 sm:mb-12 md:mb-16">
                                {title}
                            </h2>

                            {/* 👇 FIXED DESCRIPTION (without removing anything) */}
                            <p className="text-sm sm:text-base leading-6 mb-4 mt-4 sm:mt-6 md:mt-8 arabic-body whitespace-pre-line">
                                {body || bodyTop}
                            </p>

                            {bodyBottom && !body && (
                                <p className="text-sm sm:text-base leading-6 mb-4 sm:mb-6 arabic-body">
                                    {bodyBottom}
                                </p>
                            )}

                            {ctaLabel && (
                                <Link
                                    href={ctaHref}
                                    target="_blank"
                                    className="inline-block rounded-full border border-burgundy px-4 py-2 text-sm hover:bg-burgundy/10 transition kanun"
                                >
                                    {ctaLabel}
                                </Link>
                            )}

                        </div>
                    </div>
                </AnimatedText>

                {/* IMAGE */}
                <AnimatedText delay={0.3} direction="up" duration={0.8}>
                    <div className="order-3 w-full relative">
                        <div className="relative h-[280px] sm:h-[380px] md:h-[480px] lg:h-[620px] w-full">

                            <div
                                className={`absolute left-1/2 -ml-[50vw] w-screen md:relative md:left-auto md:ml-0 md:w-full h-full overflow-hidden ${
                                    isRTL ? "lg:rounded-r-2xl" : "lg:rounded-l-2xl"
                                }`}>

                                <Image
                                    src={imageSrc}
                                    alt={title}
                                    fill
                                    className={`object-cover image-hover ${
                                        isRTL ? "lg:rounded-r-2xl" : "lg:rounded-l-2xl"
                                    }`}
                                />

                            </div>
                        </div>
                    </div>
                </AnimatedText>

            </div>
        </section>
    );
}

