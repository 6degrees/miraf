"use client";

import Image from "next/image";

/*
|--------------------------------------------------------------------------
| $showcase-mosaic-flex
|--------------------------------------------------------------------------
|
| Overlapped two-row showcase using Flexbox (no grid):
| - Row 1: [ Image Left ] + [ Text Right ]
| - Row 2: [ Text Left ]  + [ Image Right ]
|
| Features:
| - Fully responsive via Tailwind utility classes
| - Optional decorative icons (absolute) beside/under text
| - Tunable heights/rounded corners via props
|
*/
type ShowcaseMosaicFlexProps = {
    topImageSrc: string;
    topImageAlt: string;
    bottomImageSrc: string;
    bottomImageAlt: string;
    rightTitle: string;
    rightBody?: string;
    leftTitle: string;
    leftBody?: string;
    rightBlobSrc?: string;
    leftBlobSrc?: string;

    className?: string;

    topImageHeightClass?: string;
    bottomImageHeightClass?: string;
    topRadiusClass?: string;
    bottomRadiusClass?: string;

    rowGapClass?: string;
    colGapClass?: string;

    rowOverlapClass?: string;

    rightBlobClass?: string;
    leftBlobClass?: string;
    rightBlobW?: number;
    rightBlobH?: number;
    leftBlobW?: number;
    leftBlobH?: number;

    titleSizeClass?: string;
    bodySizeClass?: string;
};

export default function ShowcaseMosaicFlex(
    {
        topImageSrc,
        topImageAlt,
        bottomImageSrc,
        bottomImageAlt,
        rightTitle,
        rightBody,
        leftTitle,
        leftBody,
        rightBlobSrc = "/icons/ml_icon_14.png",
        leftBlobSrc = "/icons/ml_Icon_17.png",
        className = "text-white",
        topImageHeightClass = "h-[240px] sm:h-[280px] md:h-[320px] lg:h-[320px]",
        bottomImageHeightClass = "h-[250px] sm:h-[300px] md:h-[360px] lg:h-[380px]",
        topRadiusClass = "rounded-b-[36px]",
        bottomRadiusClass = "rounded-t-[36px]",
        colGapClass = "gap-6 md:gap-10",
        rowOverlapClass = "md:-mt-10 lg:-mt-14",
        rightBlobClass = "absolute ltr:right-[1%] rtl:left-[1%] translate-y-[30%] h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 opacity-90 z-10 pointer-events-none select-none",
        leftBlobClass = "absolute left-40 -bottom-25 h-12 w-12 sm:h-14 sm:w-14 opacity-90 z-10 pointer-events-none select-none",
        rightBlobW = 96,
        rightBlobH = 96,
        leftBlobW = 80,
        leftBlobH = 80,
        titleSizeClass = "text-4xl lg:text-4xl xl:text-6xl",
        bodySizeClass = "text-sm md:text-base xl:text-md",
    }: ShowcaseMosaicFlexProps) {

    /*
    |--------------------------------------------------------------------------
    | $layout
    |--------------------------------------------------------------------------
    | Flex-based, stacked on mobile; split horizontally on md+.
    */
    return (
        <div className={`flex flex-col justify-between h-full ${className}`}>
            <div className={`flex flex-col md:flex-row ${colGapClass}`}>
                {/* $row-1:media-left */}
                <div className="relative w-full md:w-1/2">
                    <div className={`relative w-full overflow-hidden ${topRadiusClass}`}>
                        <div className={`relative ${topImageHeightClass}`}>
                            <Image
                                src={topImageSrc}
                                alt={topImageAlt}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* $row-1:text-right (icon absolute inside) */}
                <div className="relative w-full md:w-1/2 flex items-center">
                    <div className="relative max-w-[40ch] xl:max-w-[48ch] text-center">
                        <h3 className={`font-serif text-[#F6E6DA] ${titleSizeClass} leading-tight`}>
                            {rightTitle}
                        </h3>
                        {rightBody && (
                            <p className={`mt-2 sm:mt-3 text-white/85  text-base sm:text-md md:text-lg leading-relaxed ${bodySizeClass}`}>
                                {rightBody}
                            </p>
                        )}
                        <div className='relative'>
                            {rightBlobH && (
                                <Image
                                    src={rightBlobSrc}
                                    alt=""
                                    width={rightBlobW}
                                    height={rightBlobH}
                                    className={rightBlobClass}
                                    priority
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`flex flex-col md:flex-row ${colGapClass} ${rowOverlapClass}`}>
                {/* $row-2:text-left (icon absolute inside) */}
                <div className="relative w-full md:w-1/2 flex items-start justify-center order-2 md:order-1">
                    <div className="relative max-w-[40ch] xl:max-w-[48ch] text-center">
                        <h3 className={`font-serif text-[#F6E6DA] ${titleSizeClass} leading-tight`}>
                            {leftTitle}
                        </h3>
                        {leftBody && (
                            <p className={`mt-2 sm:mt-3 text-white/85 leading-relaxed max-w-[42ch] ${bodySizeClass}`}>
                                {leftBody}
                            </p>
                        )}
                        {leftBlobSrc && (
                            <Image
                                src={leftBlobSrc}
                                alt=""
                                width={leftBlobW}
                                height={leftBlobH}
                                className={leftBlobClass}
                                priority
                            />
                        )}
                    </div>
                </div>

                {/* $row-2:media-right */}
                <div className="relative w-full md:w-1/2 order-1 md:order-2">
                    <div className={`relative w-full overflow-hidden ${bottomRadiusClass}`}>
                        <div className={`relative ${bottomImageHeightClass}`}>
                            <Image
                                src={bottomImageSrc}
                                alt={bottomImageAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}