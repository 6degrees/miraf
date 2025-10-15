"use client";

import Image from "next/image";

/*
|--------------------------------------------------------------------------
| $showcase-card
|--------------------------------------------------------------------------
|
| Responsive showcase card for Miraf.
| - Supports custom image height via `imageHeightClass`
| - Supports custom rounding via `roundedClass`
|
*/
type ShowcaseCardProps = {
    layout: string;
    imageSrc: string;
    imageAlt: string;
    caption: string;
    titleLine1?: string;
    titleLine2?: string;
    iconSrc?: string;
    iconSizeClass?: string;
    titleSizeClass?: string;
    className?: string;
    imageHeightClass?: string;
    roundedClass?: string;
};

/*
|--------------------------------------------------------------------------
| $showcase-card
|--------------------------------------------------------------------------
|
| Responsive showcase card for Miraf.
| - Supports custom image height via `imageHeightClass`
| - Supports custom rounding via `roundedClass`
|
*/
export default function ShowcaseCard(
    {
        layout = '0',
        imageSrc,
        imageAlt,
        caption,
        titleLine1,
        titleLine2,
        iconSrc = "/icons/ml_Icon_16.png",
        iconSizeClass = "h-12 w-12 sm:h-14 sm:w-14 xl:h-20 xl:w-20",
        titleSizeClass = "text-[2.9rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem]",
        className = "",
        imageHeightClass = "h-[260px] md:h-[360px] lg:h-[520px] xl:h-[650px]",
        roundedClass = "rounded-2xl",
    }: ShowcaseCardProps) {

    /*
    |--------------------------------------------------------------------------
    | $section-layout
    |--------------------------------------------------------------------------
    |
    | Responsive grid layout:
    | - Mobile: vertical stack
    | - Tablet & desktop: two-column grid
    | Left column: caption + image
    | Right column: heading with icons
    |
    */
    if(layout === '0')
        return ( <div className={`flex flex-col md:flex-row w-full h-full items-center justify-center md:justify-start gap-0 md:gap-10 ${className}`}>
                {/* Left: Caption + Image */}
                <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
                    <div className="text-base sm:text-md md:text-2xl text-white mb-3 sm:mb-4 text-center md:text-left">{caption}</div>

                    <div className={`relative w-full bg-black/10 overflow-hidden ${roundedClass}`}>
                        <div className={`relative ${imageHeightClass} overflow-hidden ${roundedClass}`}>
                            <Image src={imageSrc} alt={imageAlt} fill className={`object-cover ${roundedClass}`} priority/>
                        </div>
                    </div>
                </div>

                {/* Right: Titles + Icons */}
                <div className="flex flex-col md:w-1/2">
                    <h2 className={`${titleSizeClass} leading-none tracking-tight text-[#F6E6DA]`}>
                    <span className="flex items-center justify-center md:justify-start mt-3 sm:mt-4">
                        <span className="block ">{titleLine1}</span>
                        <Image src={iconSrc} alt="" width={92} height={92} className={`${iconSizeClass} ms-8 object-contain`}
                        />
                    </span>
                        <span className="block">{titleLine2}</span>
                    </h2>
                </div>
            </div>
        )
    else if (layout === '1')
        return (
            <div className={`flex flex-col md:flex-row justify-center md:justify-between w-full h-full gap-0 md:gap-16 ${className}`}>
                <div className="relative w-full md:w-1/2  flex items-center lg:items-end">
                    <div className={`relative w-full bg-black/10 overflow-hidden ${roundedClass}`}>
                        <div className={`relative ${imageHeightClass} overflow-hidden ${roundedClass}`}>
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className={`object-cover ${roundedClass}`}
                                priority
                            />
                        </div>
                    </div>
                </div>
                <div className="relative w-full md:w-1/2 flex items-start md:items-center justify-center md:justify-start">
                    <div className="text-base sm:text-md md:text-3xl text-white mb-3 sm:mb-4 text-center max-w-[18rem]">
                        {caption}
                    </div>
                </div>
            </div>
        )
    else if (layout === '2')
        return (
            <div className={`flex flex-col md:flex-row items-center lg:items-start justify-center lg:flex-col w-full lg:w-1/2 h-full ${className}`}>
                {/* Image on top */}
                <div className="w-full">
                    <div className={`relative w-full bg-black/10 overflow-hidden ${roundedClass}`}>
                        <div className={`relative ${imageHeightClass} overflow-hidden ${roundedClass}`}>
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className={`object-cover ${roundedClass}`}
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Title under image (no caption) */}
                <div className="w-full flex flex-col items-center text-center mt-4 md:mt-6">
                    <h2 className={`${titleSizeClass} leading-none tracking-tight text-[#F6E6DA]`}>
                            <span className="flex items-center justify-center mt-1 sm:mt-2">
                              <span className="block">{titleLine1}</span>
                              <Image
                                  src={iconSrc}
                                  alt=""
                                  width={92}
                                  height={92}
                                  className={`${iconSizeClass} ms-4 sm:ms-6 object-contain`}
                              />
                            </span>
                        <span className="block">{titleLine2}</span>
                    </h2>
                </div>
            </div>
        )
}
