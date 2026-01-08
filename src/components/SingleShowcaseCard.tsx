"use client";

import Image from "next/image";
import React from "react";

/*
|--------------------------------------------------------------------------
| SingleShowcaseCardProps
|--------------------------------------------------------------------------
|
| Props for a single showcase section (one half of DoubleShowcaseCard).
| Used to display individual cards in the slider on mobile.
|
*/
type SingleShowcaseCardProps = {
    reverse?: boolean;                 // Reverse layout on desktop
    stacked?: boolean;                  // Force stacked layout (image on top, text below) on all screens
    imageSrc: string;                  // Image source
    imageAlt: string;                  // Image alt text
    title: string;                     // Section title
    titleLine1?: string;              // Optional title line 1 (if provided, title is ignored)
    titleLine2?: string;               // Optional title line 2
    description?: string;              // Optional description
    descriptionLine2?: string;         // Optional description line 2
    icon?: string;                     // Optional icon
    bgClass?: string;                   // Background class for text area
    roundedClass?: string;              // Rounded corners class
    heightClass?: string;               // Height class for md+ screens
    mobileImageHeightClass?: string;    // Image height class for mobile
    className?: string;                // Optional additional classes
    imageWidthClass?: string;          // Optional image width class
};

/*
|--------------------------------------------------------------------------
| SingleShowcaseCard Component
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
export default function SingleShowcaseCard(
    {
        reverse = false,
        stacked = false,
        imageSrc,
        imageAlt,
        title,
        titleLine1,
        titleLine2,
        description,
        descriptionLine2,
        icon,
        bgClass = "",
        roundedClass = "rounded-2xl",
        heightClass = "h-[40svh] lg:h-[40svh] xl:h-[45svh]",
        mobileImageHeightClass = "h-[45svh] sm:h-[40svh]",
        className = "",
        imageWidthClass = "md:w-[55%]",
    }: SingleShowcaseCardProps) {
    // Determine flex direction based on stacked prop
    const flexDirection = stacked 
        ? "flex-col" 
        : reverse 
            ? "flex-col md:flex-row-reverse" 
            : "flex-col md:flex-row";
    
    return (
        <div className={`relative w-full flex ${flexDirection} mb-0 pb-0 px-4 lg:px-0 ${className}`}>
            {/*
            |--------------------------------------------------------------------------
            | $image-block
            |--------------------------------------------------------------------------
            |
            | - Displays the main showcase image.
            | - Uses fixed height on mobile via `mobileImageHeightClass`.
            | - Syncs height with text block on md+ via `heightClass`.
            |
            */}
            <div className={`w-full ${stacked ? "w-full" : imageWidthClass} ${mobileImageHeightClass} ${stacked ? "" : `md:${heightClass}`} relative overflow-hidden ${roundedClass}`}>
                <Image src={imageSrc} alt={imageAlt} fill priority className={`object-cover object-bottom ${roundedClass}`}/>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | $text-block
            |--------------------------------------------------------------------------
            |
            | - Displays title, optional description, and icon.
            | - Centered both vertically and horizontally.
            | - Auto height on mobile; fixed synced height on md+.
            |
            */}
            <div className={`w-full ${stacked ? "w-full" : imageWidthClass === "md:w-[45%]" ? "md:w-[55%]" : "md:w-[55%]"} ${bgClass} flex flex-col items-center justify-center px-4 sm:px-4 pt-3 sm:pt-4 pb-0 relative mt-4 ${stacked ? "" : "md:mt-0"}`}>
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
                            <Image src={icon} alt={title ? `${title} decorative icon` : "Decorative icon"} width={80} height={80} className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-18 xl:w-18 object-contain"/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

