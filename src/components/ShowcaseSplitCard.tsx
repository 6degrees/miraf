"use client";

import Image from "next/image";

/*
|--------------------------------------------------------------------------
| $showcase-split-card
|--------------------------------------------------------------------------
|
| Two images with:
| - left image
| - centered caption BESIDE the left image
| - right image with BIG title UNDER it
|
| Fixes:
| - Adds vertical section padding so images never stick to edges
| - Centers media vertically on md+ so neither image hugs top/bottom
|
*/
type ShowcaseSplitCardProps = {
    leftImageSrc: string;
    leftImageAlt: string;
    rightImageSrc: string;
    rightImageAlt: string;
    caption: string;
    titleLine1: string;
    titleLine2?: string;
    titleLine3?: string;
    leftIconSrc?: string;
    rightIconSrc?: string;
    leftImageHeightClass?: string;
    rightImageHeightClass?: string;
    roundedClass?: string;
    titleSizeClass?: string;
    iconSizeClass?: string;
    className?: string;
    gapClass?: string;
};

export default function ShowcaseSplitCard(
    {
        leftImageSrc,
        leftImageAlt,
        rightImageSrc,
        rightImageAlt,
        caption,
        titleLine1,
        titleLine2,
        titleLine3,
        leftIconSrc = "/icons/ml_Icon_16.png",
        rightIconSrc = "/icons/ml_Icon_15.png",
        leftImageHeightClass = "h-[260px] md:h-[360px] lg:h-[450px] xl:h-[500px]",
        rightImageHeightClass = "h-[260px] md:h-[360px] lg:h-[450px] xl:h-[500px]",
        titleSizeClass = "text-4xl lg:text-4xl xl:text-6xl",
        iconSizeClass = "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14",
        className = "",
        gapClass = "gap-6 md:gap-8",
    }: ShowcaseSplitCardProps) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] w-full h-full items-stretch ${className} ${gapClass}`}>

            {/* Left image (vertically centered on md+) */}
            <div className="w-full flex md:items-end">
                <div className={`relative w-full overflow-hidden rounded-t-[18px] bg-black/10 p-0.5`}>
                    <div className={`relative ${leftImageHeightClass} overflow-hidden rounded-t-[18px]`}>
                        <Image
                            src={leftImageSrc}
                            alt={leftImageAlt}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Center caption BESIDE the left image */}
            <div className="flex items-center justify-center md:justify-start">
                <div className="text-sm md:text-base xl:text-md text-blush leading-6 md:leading-7 max-w-[16ch] md:ms-2 mt-0">
                    {caption}
                </div>
            </div>

            {/* Right image + title BELOW it (vertically centered image area) */}
            <div className="w-full flex flex-col md:items-center">
                <div className={`relative w-full overflow-hidden rounded-b-[18px] bg-black/10 p-0.5`}>
                    <div className={`relative ${rightImageHeightClass} overflow-hidden rounded-b-[18px]`}>
                        <Image
                            src={rightImageSrc}
                            alt={rightImageAlt}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Big title UNDER the right image */}
                <div className="mt-4 sm:mt-5 w-full">
                    <h2 className={`font-serif ${titleSizeClass} leading-tight tracking-tight text-[#F6E6DA]`}>
                        <span className="block">{titleLine1}</span>

                        {titleLine2 && titleLine3 && (
                            <span className="mt-2 sm:mt-3 flex items-center">
                                <span className="block">{titleLine2}</span>
                                 <Image
                                     src={leftIconSrc}
                                     alt=""
                                     width={80}
                                     height={80}
                                     className={`${iconSizeClass} ms-3 sm:me-4 object-contain`}
                                 />
                                <Image
                                    src={rightIconSrc}
                                    alt=""
                                    width={80}
                                    height={80}
                                    className={`${iconSizeClass} ms-3 sm:me-4 object-contain`}
                                />
                                <span className="block">{titleLine3}</span>
                            </span>
                        )}

                    </h2>
                </div>
            </div>
        </div>
    );
}