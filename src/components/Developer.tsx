"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";


/*
|--------------------------------------------------------------------------
| $developer-section:props
|--------------------------------------------------------------------------
|
| Props definition for the Developer component.
| - Provides all configurable fields used to render the “About the Developer” section.
| - Includes logo, decorative icon, image, title, description paragraphs, and CTA.
| - Also supports optional Tailwind utility overrides for background and wrapper classes.
|
*/
type DeveloperSectionProps = {
    logoSrc: string;
    logoAlt?: string;
    decoSrc?: string; // optional decorative icon under the logo
    imageSrc: string;
    imageAlt?: string;
    title: string;
    bodyTop: string;
    bodyBottom?: string;
    ctaLabel?: string;
    ctaHref?: string;
    className?: string;
    bgClass?: string;
};

/*
|--------------------------------------------------------------------------
| $developer-section
|--------------------------------------------------------------------------
|
| Two-column (desktop) / stacked (mobile) section for “About the Developer”.
| - Left column: Logo stack (logo + optional decorative mark)
| - Middle column: Title, copy, CTA
| - Right column: Tall image
|
| Responsive behavior:
| - < lg: stacked order → logo stack (1) → content (2) → image (3)
| - >= lg: grid with 3 columns → [220px] [flexible text] [wider image]
|
| The image always fills its panel height (object-cover) with fixed, responsive
| heights across breakpoints to preserve look & feel.
|
*/
export default function Developer(
    {
        logoSrc,
        logoAlt = "Logo",
        decoSrc,
        imageSrc,
        imageAlt = "",
        title,
        bodyTop,
        bodyBottom,
        ctaLabel,
        ctaHref = "#",
        className = "",
        bgClass = "bg-blush",
    }: DeveloperSectionProps) {

    /*
    |--------------------------------------------------------------------------
    | $developer-section:layout
    |--------------------------------------------------------------------------
    |
    | Layout structure for the Developer section.
    | - Uses a responsive grid:
    |     → Mobile / tablet: stacked (logo → text → image)
    |     → Desktop: three columns (logo | text | image)
    | - Each part (logo stack, content, image) adapts seamlessly across breakpoints.
    | - Keeps proportions and spacing consistent with Miraf’s design system.
    |
    */
    return (
        <section id="developer" className={`w-full ${bgClass} text-burgundy pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-16 md:pb-16 lg:pt-32 lg:pb-32 ${className}`}>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.15fr)] gap-6 sm:gap-8 lg:gap-10 items-start">
                <AnimatedText delay={0.1} direction="up" duration={0.8}>
                    <div className="order-1 lg:order-none w-full flex flex-col items-start lg:items-start gap-4 sm:gap-6 px-4 sm:px-6 md:px-10 lg:px-16 pt-6 sm:pt-8 lg:pt-0">
                        <div className="relative w-[180px] sm:w-[220px] lg:w-[140px] pt-0 lg:pt-9">
                            <Image src={logoSrc} alt={logoAlt} width={180} height={180} className="object-contain image-hover"/>
                        </div>
                        {decoSrc && (<Image src={decoSrc} alt="Decorative element" width={100} height={40} className="object-contain image-hover" loading="lazy"/>)}
                    </div>
                </AnimatedText>
                <AnimatedText delay={0.2} direction="up" duration={0.8}>
                    <div className="order-2 lg:order-none w-full px-4 sm:px-6 md:px-10 lg:px-0 flex justify-start text-start lg:justify-start lg:text-start">
                        <div className="max-w-md">
                            <h2 className="text-[2.9rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] mb-8 sm:mb-12 md:mb-16" style={{ lineHeight: '0.95' }}>
                                {title}
                            </h2>
                            <p className="text-sm sm:text-base leading-6 mb-4 mt-4 sm:mt-6 md:mt-8 arabic-body">{bodyTop}</p>
                            {bodyBottom && (<p className="text-sm sm:text-base leading-6 mb-4 sm:mb-6 arabic-body">{bodyBottom}</p>)}
                            {ctaLabel && (<Link href={ctaHref} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-burgundy px-4 py-2 text-sm hover:bg-burgundy/10 transition kanun mb-6 sm:mb-8 lg:mb-0">{ctaLabel}</Link>)}
                        </div>
                    </div>
                </AnimatedText>
                <AnimatedText delay={0.3} direction="up" duration={0.8}>
                    <div className="order-3 lg:order-none w-full px-0 sm:px-6 md:px-0 relative">
                        <div className="relative h-[280px] sm:h-[380px] md:h-[480px] lg:h-[620px] w-full sm:w-full md:w-full lg:w-full">
                            <div className="absolute left-1/2 -ml-[50vw] w-screen sm:absolute sm:left-auto sm:ml-0 sm:w-full md:relative md:left-auto md:ml-0 md:w-full lg:relative lg:left-auto lg:ml-0 lg:w-full h-full overflow-hidden lg:rounded-l-2xl">
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover image-hover lg:rounded-l-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </AnimatedText>
            </div>
        </section>
    );
}