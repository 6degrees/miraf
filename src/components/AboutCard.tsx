"use client";

import Image from "next/image";

/*
|--------------------------------------------------------------------------
| $props
|--------------------------------------------------------------------------
|
| imageSrc      : main image path
| imageAlt      : alt text for main image
| iconSrc       : small icon above the title
| title         : card heading
| body          : card description
| imageOnTop    : if true, image appears above text (default: true)
| priorityImage : pass through to Next/Image for LCP optimization
| className     : optional wrapper classes
|
*/
type AboutCardProps = {
    imageSrc: string;
    imageAlt: string;
    iconSrc: string;
    title: string;
    body: string;
    imageOnTop?: boolean;
    priorityImage?: boolean;
    className?: string;
    bodyWidth?: string;
};

/*
|--------------------------------------------------------------------------
| $about-card
|--------------------------------------------------------------------------
|
| Reusable card for the About section.
| Allows toggling the image position (top/bottom) via `imageOnTop`.
| Layout:
|   - Image block (fixed heights across breakpoints)
|   - Text block (icon, title, body)
|
*/

export default function AboutCard(
    {
        imageSrc,
        imageAlt,
        iconSrc,
        title,
        body,
        imageOnTop = true,
        priorityImage = false,
        className = "",
        bodyWidth = 'ltr:max-w-[45ch] rtl:max-w-[36ch]',
    }: AboutCardProps
) {
    /*
    |--------------------------------------------------------------------------
    | $image-block
    |--------------------------------------------------------------------------
    |
    | Fixed-height, rounded container that preserves aspect via explicit heights.
    | Uses `fill` for responsive coverage, with `object-cover` to avoid distortion.
    |
    */
    const ImageBlock = (
        <div className="relative h-[480px] md:h-[540px] xl:h-[415px] rounded-[22px] overflow-hidden">
            <Image
                src={imageSrc}
                alt={imageAlt || title}
                fill
                className="object-cover"
                priority={priorityImage}
            />
        </div>
    );

    /*
    |--------------------------------------------------------------------------
    | $text-block
    |--------------------------------------------------------------------------
    |
    | Icon + title + body.
    | Body width is constrained differently for LTR/RTL to keep ~optimal line length.
    |
    */
    const TextBlock = (
        <div className="text-burgundy">
            <div className="flex items-center gap-2">
                <Image
                    src={iconSrc}
                    alt="icon"
                    width={20}
                    height={20}
                    className="h-8 md:w-8 object-contain"
                />
            </div>
            <h3 className="mt-2 text-5xl sm:text-7xl leading-tight">
                {title}
            </h3>
            <p className={`mt-3 text-burgundy/80 text-base sm:text-md leading-relaxed ${bodyWidth}`}>
                {body}
            </p>
        </div>
    );

    /*
    |--------------------------------------------------------------------------
    | $render
    |--------------------------------------------------------------------------
    |
    | Centers the card and switches order based on `imageOnTop`.
    | The inner wrapper clamps max width to match the design.
    |
    */
    return (
        <div className={`flex flex-col w-full h-full justify-center ${className}`}>
            <div className="w-full max-w-[520px] md:max-w-full lg:max-w-[800px]">
                {imageOnTop ? (
                    <>
                        {ImageBlock}
                        <div className="mt-8 sm:mt-14">{TextBlock}</div>
                    </>
                ) : (
                    <>
                        <div className="mb-8 sm:mb-14">{TextBlock}</div>
                        {ImageBlock}
                    </>
                )}
            </div>
        </div>
    );
}