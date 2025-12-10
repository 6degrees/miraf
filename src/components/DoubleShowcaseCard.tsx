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
    titleLeftLine1?: string;            // Left section title line 1 (optional)
    titleLeftLine2?: string;            // Left section title line 2 (optional)
    titleRight: string;                 // Right section title
    descriptionLeft?: string;           // Left description (optional)
    descriptionRight?: string;          // Right description (optional)
    descriptionRightLine2?: string;     // Right description line 2 (optional)
    iconLeft?: string;                  // Left icon path (optional)
    iconRight?: string;                 // Right icon path (optional)
    className?: string;                 // Wrapper custom class
    roundedClass1?: string;              // Rounded corners for sections
    roundedClass2?: string;              // Rounded corners for sections
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
    titleLine1?: string;              // Optional title line 1 (if provided, title is ignored)
    titleLine2?: string;               // Optional title line 2
    description?: string;              // Optional description
    descriptionLine2?: string;         // Optional description line 2
    icon?: string;                     // Optional icon
    bgClass: string;                   // Background class for text area
    roundedClass: string;              // Rounded corners class
    heightClass: string;               // Height class for md+ screens
    mobileImageHeightClass: string;    // Image height class for mobile
    className?: string;                // Optional additional classes
    imageWidthClass?: string;          // Optional image width class
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
        titleLine1,
        titleLine2,
        description,
        descriptionLine2,
        icon,
        bgClass,
        roundedClass,
        heightClass,
        mobileImageHeightClass,
        className = "",
        imageWidthClass = "md:w-[55%]",
    }: SectionProps) {
    return (
        <div className={`relative w-full flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} mb-0 pb-0 ${className}`}>
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
            <div className={`w-full ${imageWidthClass} ${mobileImageHeightClass} md:${heightClass} relative overflow-hidden ${roundedClass}`}>
                <Image src={imageSrc} alt={imageAlt} fill priority className={`object-cover object-bottom ${roundedClass}`}/></div>

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
            <div className={`w-full ${imageWidthClass === "md:w-[45%]" ? "md:w-[55%]" : "md:w-[55%]"} ${bgClass} flex flex-col items-center justify-center px-3 sm:px-4 pt-3 sm:pt-4 pb-0 relative`}>
                <div className="max-w-[90%] sm:max-w-[30rem] text-center text-blush flex flex-col items-center flex-1 justify-center">
                    {/* Title */}
                    <h2 className="double-showcase-title">
                        {titleLine1 && titleLine2 ? (
                            <>
                                <span className="block">{titleLine1}</span>
                                <span className="block">{titleLine2}</span>
                            </>
                        ) : (
                            title
                        )}
                    </h2>

                    {/* Description (optional) */}
                    {description && (
                        <p className="text-base sm:text-lg xl:text-xl opacity-80 mt-1 arabic-body showcase-description">
                            <span className="block">{description}</span>
                            {descriptionLine2 && <span className="block">{descriptionLine2}</span>}
                        </p>
                    )}

                    {/* Icon centered below description */}
                    {icon && (
                        <div className="mt-3 sm:mt-4 flex items-center justify-center">
                            <Image src={icon} alt="" width={80} height={80} className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-18 xl:w-18 object-contain"/>
                        </div>
                    )}
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
        titleLeftLine1,
        titleLeftLine2,
        titleRight,
        descriptionLeft,
        descriptionRight,
        descriptionRightLine2,
        iconLeft,
        iconRight = "/icons/ml_Icon_16.png",
        className = "",
        roundedClass1 = "rounded-2xl",
        roundedClass2 = "rounded-t-4xl",
        bgClass = "",
        heightClass = "h-[40svh] lg:h-[40svh] xl:h-[45svh]",
        mobileImageHeightClass = "h-[45svh] sm:h-[40svh]",
    }: DoubleShowcaseCardProps) {
    return (
        <div className={`w-[100vw] lg:w-[115vw] h-full flex flex-col justify-between gap-0 ${className}`}>
            {/*
            |--------------------------------------------------------------------------
            | Section #1 — Standard Layout
            |--------------------------------------------------------------------------
            | [ IMAGE (left) ] | [ TEXT (right) ]
            */}
            <Section imageSrc={imageLeftSrc} imageAlt={imageLeftAlt} title={titleLeft} titleLine1={titleLeftLine1} titleLine2={titleLeftLine2} description={descriptionLeft} icon={iconLeft} bgClass={bgClass} roundedClass={roundedClass1} heightClass={heightClass} mobileImageHeightClass={mobileImageHeightClass} imageWidthClass="md:w-[45%]"/>

            {/*
            |--------------------------------------------------------------------------
            | Section #2 — Reversed Layout
            |--------------------------------------------------------------------------
            | [ TEXT (left) ] | [ IMAGE (right) ]
            */}
            <Section reverse imageSrc={imageRightSrc} imageAlt={imageRightAlt} title={titleRight} description={descriptionRight} descriptionLine2={descriptionRightLine2} icon={iconRight} bgClass={bgClass} roundedClass={roundedClass2} heightClass={heightClass} mobileImageHeightClass={mobileImageHeightClass} className="-mt-16 md:-mt-20"/>
        </div>
    );
}