"use client";

import Image from "next/image";
import React from "react";

/*
|--------------------------------------------------------------------------
| DoubleShowcaseCardProps
|--------------------------------------------------------------------------
|
| Props definition for the DoubleShowcaseCard component.
|
| This component renders **two stacked showcase sections** (top & bottom):
|   1. Left-aligned image section
|   2. Right-aligned (reversed) image section
|
| Each section displays:
|   - A responsive image
|   - A title, optional description, and optional icon
|   - Adjustable heights (mobile vs desktop)
|
| Layout logic:
|   - On mobile: stacked vertically (image above text)
|   - On md+: side-by-side (50% image, 50% text)
|
*/
type DoubleShowcaseCardProps = {
    imageLeftSrc: string;               // Left section image source
    imageRightSrc: string;              // Right section image source
    imageLeftAlt: string;               // Alt text for left image
    imageRightAlt: string;              // Alt text for right image
    titleLeft: string;                  // Left section title
    titleRight: string;                 // Right section title
    descriptionLeft?: string;           // Left description (optional)
    descriptionRight?: string;          // Right description (optional)
    iconLeft?: string;                  // Left icon path (optional)
    iconRight?: string;                 // Right icon path (optional)
    className?: string;                 // Wrapper custom class
    roundedClass?: string;              // Rounded corners for sections
    bgClass?: string;                   // Background color for text area
    heightClass?: string;               // Fixed height applied from md+
    mobileImageHeightClass?: string;    // Height for image on mobile only
};

/*
|--------------------------------------------------------------------------
| SectionProps
|--------------------------------------------------------------------------
|
| Defines props for a single Section — used internally by DoubleShowcaseCard.
| A Section can be reversed (image right / text left) using the `reverse` flag.
|
*/
type SectionProps = {
    reverse?: boolean;                 // Reverse layout on desktop
    imageSrc: string;                  // Image source
    imageAlt: string;                  // Image alt text
    title: string;                     // Section title
    description?: string;              // Optional description
    icon?: string;                     // Optional icon
    bgClass: string;                   // Background class for text area
    roundedClass: string;              // Rounded corners class
    heightClass: string;               // Height class for md+ screens
    mobileImageHeightClass: string;    // Image height class for mobile
};

/*
|--------------------------------------------------------------------------
| Section Component
|--------------------------------------------------------------------------
|
| Represents a **single two-column showcase block**.
|
| Structure:
|   [ IMAGE ]  [ TEXT ]
|   or (reversed)
|   [ TEXT ]   [ IMAGE ]
|
| Responsive behavior:
|   - Mobile: stacked (image on top)
|   - Desktop: flex row (or reversed row)
|
*/
function Section(
    {
        reverse = false,
        imageSrc,
        imageAlt,
        title,
        description,
        icon,
        bgClass,
        roundedClass,
        heightClass,
        mobileImageHeightClass,
    }: SectionProps) {
    return (
        <div className={`relative w-full overflow-hidden ${roundedClass} flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}>
            {/*
            |--------------------------------------------------------------------------
            | $image-block
            |--------------------------------------------------------------------------
            |
            | - Displays the main showcase image.
            | - Uses fixed height on mobile via `mobileImageHeightClass`.
            | - Syncs height with text block on md+ via `heightClass`.
            |
            | Example visual:
            |   ┌──────────────────────┐
            |   │      [ Image ]       │  ← fills 50% of width (md+)
            |   └──────────────────────┘
            |
            */}
            <div className={`w-full md:w-[50%] ${mobileImageHeightClass} md:${heightClass} relative overflow-hidden`}>
                <Image src={imageSrc} alt={imageAlt} fill priority className="object-cover"/></div>

            {/*
            |--------------------------------------------------------------------------
            | $text-block
            |--------------------------------------------------------------------------
            |
            | - Displays title, optional description, and icon.
            | - Centered both vertically and horizontally.
            | - Auto height on mobile; fixed synced height on md+.
            |
            | Example visual:
            |   ┌──────────────────────────────┐
            |   │   [ Title ]                 │
            |   │   [ Description ] (opt)     │
            |   │   [ Icon ] (opt)            │
            |   └──────────────────────────────┘
            |
            */}
            <div className={`w-full md:w-[50%] ${bgClass} flex items-center justify-center px-6 py-8`}>
                <div className="max-w-[30rem] text-center text-blush">
                    <div className="flex flex-col items-center gap-3">
                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl leading-tight">
                            {title}
                        </h2>

                        {/* Description (optional) */}
                        {description && (<p className="text-base sm:text-lg xl:text-xl opacity-80 mt-2">{description}</p>)}

                        {/* Icon (optional) */}
                        {icon && (
                            <Image src={icon} alt="" width={80} height={80} className="h-10 w-10 md:h-10 md:w-10 lg:h-14 lg:w-14 xl:w-16 xl:h-18 object-contain mt-5"/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| DoubleShowcaseCard Component
|--------------------------------------------------------------------------
|
| Main wrapper that combines **two Section components**:
|
|   ┌────────────────────────────────────┐
|   │ Section #1 — Image Left / Text Right │
|   ├────────────────────────────────────┤
|   │ Section #2 — Image Right / Text Left │
|   └────────────────────────────────────┘
|
| Props can be customized per section (images, titles, icons, etc.).
|
| Width: extends slightly (115vw) to allow full-bleed visual layout.
|
*/
export default function DoubleShowcaseCard(
    {
        imageLeftSrc,
        imageRightSrc,
        imageLeftAlt,
        imageRightAlt,
        titleLeft,
        titleRight,
        descriptionLeft,
        descriptionRight,
        iconLeft = "/icons/ml_Icon_16.png",
        iconRight = "/icons/ml_Icon_16.png",
        className = "",
        roundedClass = "rounded-2xl",
        bgClass = "",
        heightClass = "h-[50svh] lg:h-[50svh] xl:h-[60svh]",
        mobileImageHeightClass = "h-[60svh] sm:h-[50svh]",
    }: DoubleShowcaseCardProps) {
    return (
        <div className={`w-[100vw] lg:w-[115vw] h-full flex flex-col justify-between gap-6 ${className}`}>
            {/*
            |--------------------------------------------------------------------------
            | Section #1 — Standard Layout
            |--------------------------------------------------------------------------
            | [ IMAGE (left) ] | [ TEXT (right) ]
            */}
            <Section imageSrc={imageLeftSrc} imageAlt={imageLeftAlt} title={titleLeft} description={descriptionLeft} icon={iconLeft} bgClass={bgClass} roundedClass={roundedClass} heightClass={heightClass} mobileImageHeightClass={mobileImageHeightClass}/>

            {/*
            |--------------------------------------------------------------------------
            | Section #2 — Reversed Layout
            |--------------------------------------------------------------------------
            | [ TEXT (left) ] | [ IMAGE (right) ]
            */}
            <Section reverse imageSrc={imageRightSrc} imageAlt={imageRightAlt} title={titleRight} description={descriptionRight} icon={iconRight} bgClass={bgClass} roundedClass={roundedClass} heightClass={heightClass} mobileImageHeightClass={mobileImageHeightClass}/>
        </div>
    );
}