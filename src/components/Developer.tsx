"use client";

import Image from "next/image";
import Link from "next/link";


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
        bgClass = "bg-[#F7EBDC]",
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
        <section className={`w-full ${bgClass} text-[#4B1617] pt-10 pb-0 lg:pt-32 lg:pb-32 ${className}`}>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.15fr)] gap-8 lg:gap-10 items-start">
                <div className="order-1 lg:order-none w-full flex flex-col items-center lg:items-start gap-6 px-6 sm:px-10 lg:px-16">
                    <div className="relative w-[180px] sm:w-[220px] lg:w-[140px] pt-0 lg:pt-9">
                        <Image src={logoSrc} alt={logoAlt} width={180} height={180} className="object-contain"/>
                    </div>
                    {decoSrc && (<Image src={decoSrc} alt="" width={100} height={40} className="object-contain"/>)}
                </div>
                <div className="order-2 lg:order-none w-full px-6 sm:px-10 lg:px-0 flex justify-center lg:justify-start">
                    <div className="max-w-md">
                        <h2 className="text-[2.9rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] mb-4">
                            {title}
                        </h2>
                        <p className="text-sm sm:text-base leading-6 mb-4">{bodyTop}</p>
                        {bodyBottom && (<p className="text-sm sm:text-base leading-6 mb-6">{bodyBottom}</p>)}
                        {ctaLabel && (<Link href={ctaHref} className="inline-block rounded-full border border-[#4B1617] px-4 py-2 text-sm hover:bg-[#4B1617]/10 transition">{ctaLabel}</Link>)}
                    </div>
                </div>
                <div className="order-3 lg:order-none w-full">
                    <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}