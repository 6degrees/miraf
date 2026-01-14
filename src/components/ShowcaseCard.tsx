"use client";

import Image from "next/image";
import React, { JSX } from "react";

/*
|--------------------------------------------------------------------------
| ShowcaseCardProps
|--------------------------------------------------------------------------
|
| This component renders different responsive showcase layouts
| used in Miraf or similar projects. It supports:
| - Three layout modes ("0", "1", "2")
| - Optional icons and captions
| - Direction (LTR / RTL) and responsive text/image sizes
|
*/

type ShowcaseLayout = "0" | "1" | "2" | "3" | "4";

export type ShowcaseCardProps = {
    layout?: ShowcaseLayout; // Layout type (0, 1, or 2)
    imageSrc: string;        // Image path (required)
    imageAlt: string;        // Alt text for accessibility
    caption?: string;        // Optional caption text
    titleLine1?: string;     // First title line
    titleLine2?: string;     // Second title line
    titleLine3?: string;     // Third title line
    iconSrc1?: string;       // Left icon source
    iconSrc2?: string;       // Right icon source
    iconSizeClass1?: string; // Tailwind size classes for icon 1
    iconSizeClass2?: string; // Tailwind size classes for icon 2
    titleSizeClass?: string; // Title font size classes
    captionSizeClass?: string; // Caption font size classes
    className?: string;      // Extra class for parent wrapper
    imageHeightClass?: string; // Image height responsive class
    roundedClass?: string;   // Rounded corners class
    dir?: "ltr" | "rtl";     // Optional text direction
};

/*
|--------------------------------------------------------------------------
| ShowcaseCard Component
|--------------------------------------------------------------------------
|
| Renders a responsive visual card with:
| - Image block
| - Title with icons
| - Caption (optional)
|
| Each layout ("0", "1", "2") defines a different flex/grid arrangement.
|
*/

export default function ShowcaseCard(
    {
        layout = "0",
        imageSrc,
        imageAlt,
        caption,
        titleLine1,
        titleLine2,
        titleLine3,
        iconSrc1 = "/icons/ml_Icon_16.png",
        iconSrc2 = "/icons/ml_Icon_16.png",
        iconSizeClass1 = "h-12 w-12 sm:h-10 sm:w-10 xl:h-12 xl:w-12",
        iconSizeClass2 = "h-12 w-12 sm:h-10 sm:w-10 xl:h-12 xl:w-12",
        titleSizeClass = "text-[2.3rem] md:text-[3rem] lg:text-[2.5rem] xl:text-[3.5rem]",
        captionSizeClass = "text-base sm:text-md md:text-2xl lg:text-lg",
        className = "",
        imageHeightClass = "h-[50svh] sm:h-[60svh] xl:h-[70svh]",
        roundedClass = "rounded-none sm:rounded-2xl",
    }: ShowcaseCardProps) {
    /*
    |--------------------------------------------------------------------------
    | $constants
    |--------------------------------------------------------------------------
    |
    | Predefined Tailwind utility classes and helper variables
    | for consistent style across all layouts.
    |
    */
    const textColorClass = "text-blush";
    const iconWrap = "inline-flex items-center gap-2";
    const iconRow = "flex items-center flex-wrap mt-3 sm:mt-4 gap-2";

    /*
    |--------------------------------------------------------------------------
    | $icon-component
    |--------------------------------------------------------------------------
    |
    | Helper function to render icons dynamically.
    | Accepts optional source and size classes.
    |
    */
    const Icon = (src?: string, cls?: string) =>
        src ? (
            <Image src={src} alt="" width={92} height={92} className={`${cls} object-contain`} loading="lazy"/>
        ) : null;

    /*
    |--------------------------------------------------------------------------
    | $caption-block
    |--------------------------------------------------------------------------
    |
    | Renders the optional caption above the title or image.
    | Text color and spacing are consistent with Miraf design.
    |
    */
    const Caption = (
        <div className={`${textColorClass} mt-6 sm:mt-0 mb-3 sm:mb-4 ${captionSizeClass} showcase-caption`}>
            {caption}
        </div>
    );

    /*
    |--------------------------------------------------------------------------
    | $image-block
    |--------------------------------------------------------------------------
    |
    | The main image wrapper with rounded corners and overflow hidden.
    | Uses Next.js Image component with full coverage and responsive height.
    |
    */
    const ImageBlock = (
        <div className={`relative w-full overflow-hidden ${roundedClass} mb-0 pb-0 leading-none block`} style={{ marginBottom: 0, paddingBottom: 0 }}>
            <div className={`relative overflow-hidden ${imageHeightClass} ${roundedClass} mb-0 pb-0 leading-none block`} style={{ marginBottom: 0, paddingBottom: 0 }}>
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className={`object-cover ${roundedClass} leading-none`}
                    loading="lazy"
                    sizes="100vw"
                    style={{ display: 'block' }}
                />
            </div>
        </div>
    );

    /*
    |--------------------------------------------------------------------------
    | $title-block
    |--------------------------------------------------------------------------
    |
    | Handles multi-line titles and icon placement.
    | Includes 3 lines with icons dynamically positioned.
    |
    */
    const Title = (
        <h2 className={`${titleSizeClass} leading-[0.65] tracking-tight ${textColorClass} showcase-title`}>
            <div className="ms-0 sm:ms-1 md:ms-4 lg:ms-12 px-2 sm:px-0">
                <span className="block">{titleLine1}</span>

                {titleLine2 && (
                    <span className={`${iconRow} -mt-2`}>
                        <span className={iconWrap}>
                            {Icon(iconSrc1, iconSizeClass1)}
                            <span className="block">{titleLine2}</span>
                        </span>
                    </span>
                )}

                {titleLine3 && (
                    <span className={`${iconRow} -mt-2`}>
                        <span className={iconWrap}>
                            <span className="block">{titleLine3}</span>
                            {Icon(iconSrc2, iconSizeClass2)}
                        </span>
                    </span>
                )}
            </div>
        </h2>
    );

    /*
    |--------------------------------------------------------------------------
    | $layouts
    |--------------------------------------------------------------------------
    |
    | Each layout defines a different flex/grid structure:
    | - "0": Image left, title right
    | - "1": Image right, compact layout
    | - "2": Stacked image over title
    |
    */
    const layouts: Record<ShowcaseLayout, JSX.Element> = {
        "0": (
            <div className={`w-[100vw] h-full flex flex-col sm:flex-row items-center justify-start sm:justify-between gap-8 pt-8 sm:pt-0 px-4 sm:px-0 ${className}`}>
                <div className="flex flex-col w-full sm:w-[50%] items-start sm:justify-start">
                    {Caption}
                    {ImageBlock}
                </div>
                <div className="flex flex-col w-full sm:w-[50%] items-center sm:items-start sm:justify-start justify-center">
                    {Title}
                </div>
            </div>
        ),

        "1": (
            <div className={`w-[100vw] h-full flex flex-col sm:flex-row items-center justify-between gap-0 px-4 sm:px-0 ${className}`}>
                <div className="w-full sm:w-[50%] flex flex-col items-center justify-end self-end">{ImageBlock}</div>
                <div className="w-full sm:w-[50%] flex flex-col items-center justify-center flex-1">
                    <h3 className={`${captionSizeClass} leading-tight tracking-tight ${textColorClass} text-center showcase-title-layout1`}>
                        {titleLine1 && <span className="block">{titleLine1}</span>}
                        {titleLine2 && <span className="block">{titleLine2}</span>}
                    </h3>
                </div>
            </div>
        ),

        "2": (
            <div className={`w-[100vw] h-full flex flex-col items-center sm:items-start gap-4 sm:gap-6 px-4 sm:px-0 ${className}`}>
                <div className="w-full sm:w-[50%] mb-0 pb-0 leading-none block">{ImageBlock}</div>
                <div className="w-full sm:w-[50%] flex justify-center mt-4 sm:mt-6 pt-0 leading-none">
                    <h2 className={`${titleSizeClass} leading-[0.65] tracking-tight ${textColorClass} showcase-title-layout2 flex flex-col items-center`}>
                        <span className="block">{titleLine1}</span>
                        {titleLine2 && (
                            <span className={`flex items-center gap-3 -mt-2`}>
                                <span className="block">{titleLine2}</span>
                                {Icon(iconSrc1, iconSizeClass1)}
                                {Icon(iconSrc2, iconSizeClass2)}
                                {titleLine3 && <span className="block">{titleLine3}</span>}
                            </span>
                        )}
                    </h2>
                </div>
            </div>
        ),
        "3": (
            <div className={`w-[100vw] flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-24 ${className}`}>
                <div className="w-full md:w-[60%]">{ImageBlock}</div>
                <div className="w-full md:w-[40%] flex items-center justify-center">
                    <div className="max-w-[40rem] text-center">{Title}</div>
                </div>
            </div>
        ),
        "4": (
            <div className={`w-[100vw] h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 ${className}`}>
                <div className="w-full md:w-[40%] text-center">{Title}</div>
                <div className="w-full md:w-[60%]">{ImageBlock}</div>
            </div>
        ),
    };

    /*
    |--------------------------------------------------------------------------
    | $return
    |--------------------------------------------------------------------------
    |
    | Renders the chosen layout dynamically.
    |
    */
    return layouts[layout];
}
