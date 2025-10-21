"use client";

import Image from "next/image";
import Link from "next/link";

/*
|--------------------------------------------------------------------------
| $residences-section:props
|--------------------------------------------------------------------------
|
| Props definition for the ResidencesSection component.
| - Defines configurable content for the “Miraf Residences” section.
| - Includes image, title, subtitle, body text, and an optional CTA button.
| - Supports custom background and wrapper classes for theme flexibility.
|
*/
type ResidencesSectionProps = {
    imageSrc: string;
    imageAlt?: string;
    title: string;
    subtitle?: string;
    body?: string;
    ctaLabel?: string;
    ctaHref?: string;
    className?: string;
    bgClass?: string;
};

export default function ResidencesSection(
    {
        imageSrc,
        imageAlt = "",
        title,
        subtitle,
        body,
        ctaLabel,
        ctaHref = "#",
        className = "",
        bgClass = "bg-[#B79A5C]",
    }: ResidencesSectionProps) {

    /*
    |--------------------------------------------------------------------------
    | $residences-section:layout
    |--------------------------------------------------------------------------
    |
    | Main layout for the “Miraf Residences” section.
    |
    | Structure:
    | - Responsive two-column layout:
    |     → Desktop: [ Text content | Image ]
    |     → Mobile:  [ Image on top | Text content below ]
    |
    | Behavior:
    | - Text is centered on smaller screens, left-aligned on larger ones.
    | - Uses Tailwind utilities for spacing, alignment, and responsive scaling.
    | - Background and text color are adjustable via props for brand consistency.
    |
    */
    return (
        <section className={`relative w-full h-full lg:h-[100svh] max-h-[1000px] pb-10 lg:pb-0 ${bgClass} text-[#F6E6DA] ${className}`}>
            <div className="w-full h-full flex flex-col lg:flex-row lg:items-center lg:justify-center">
                {/* Right: Text Content */}
                <div className="w-full lg:w-2/3 order-2 lg:order-1 flex flex-col justify-center items-center text-center lg:items-start lg:text-start px-6 sm:px-10 lg:px-16">
                    <h2 className="text-[2.9rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-semibold mb-4">{title}</h2>
                    {subtitle && <p className="text-xl sm:text-2xl md:text-4xl mb-6">{subtitle}</p>}
                    {body && <p className="text-md max-w-md leading-relaxed mb-8">{body}</p>}
                    {ctaLabel && (
                        <Link href={ctaHref} className="inline-block rounded-full border border-[#F6E6DA] px-6 py-2 text-base text-[#F6E6DA] hover:bg-[#F6E6DA]/10 transition">
                            {ctaLabel}
                        </Link>
                    )}
                </div>

                {/* Left: Full-height Image */}
                <div className="w-full order-1 lg:order-2 lg:w-1/3">
                    <div className="relative w-full h-[60svh] lg:h-[70svh] overflow-hidden">
                        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority/>
                    </div>
                </div>
            </div>
        </section>
    );
}