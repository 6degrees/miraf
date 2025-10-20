"use client";

import Image from "next/image";

type ShowcaseCardProps = {
    layout: string;
    imageSrc: string;
    imageAlt: string;
    caption?: string;
    titleLine1?: string;
    titleLine2?: string;
    iconSrc?: string;
    iconSizeClass?: string;
    titleSizeClass?: string;
    captionSizeClass?: string;
    className?: string;
    imageHeightClass?: string;
    roundedClass?: string;
};

export default function ShowcaseCard(
    {
        layout = "0",
        imageSrc,
        imageAlt,
        caption,
        titleLine1,
        titleLine2,
        iconSrc = "/icons/ml_Icon_16.png",
        iconSizeClass = "h-12 w-12 sm:h-14 sm:w-14 xl:h-20 xl:w-20",
        titleSizeClass = "text-[2.9rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem]",
        captionSizeClass = "text-base sm:text-md md:text-2xl",
        className = "",
        imageHeightClass = "h-[40vh] md:h-[60vh] lg:h-[60vh] xl:h-[65vh]",
        roundedClass = "rounded-2xl",
    }: ShowcaseCardProps) {

    if (layout === "0")
        return (
            <div className={`w-full min-h-[inherit] flex flex-col md:flex-row items-center justify-evenly md:justify-start gap-0 md:gap-10 ${className}`}>
                <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
                    <div className={`text-blush mb-3 sm:mb-4 text-center ${captionSizeClass}`}>{caption}</div>
                    <div className={`relative w-full bg-black/10 overflow-hidden ${roundedClass}`}>
                        <div className={`relative ${imageHeightClass} overflow-hidden ${roundedClass}`}>
                            <Image src={imageSrc} alt={imageAlt} fill className={`object-cover ${roundedClass}`} priority />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:w-1/2">
                    <h2 className={`${titleSizeClass} leading-none tracking-tight text-blush`}>
                        <span className="flex items-center justify-center md:justify-start mt-3 sm:mt-4 flex-wrap gap-2">
                            <span className="inline-flex items-center gap-2">
                                <span className="block whitespace-nowrap">{titleLine1}</span>
                                <Image src={iconSrc} alt="" width={92} height={92} className={`${iconSizeClass} object-contain`} />
                            </span>
                        </span>
                        <span className="block">{titleLine2}</span>
                    </h2>
                </div>
            </div>
        );

    else if (layout === "1")
        return (
            <div
                className={`flex flex-col md:flex-row justify-between lg:justify-between w-full h-full md:h-auto lg:h-full gap-0 md:gap-5 lg:gap-16 xl:gap-28 ${className}`}>
                <div className="relative w-full md:w-1/2 flex items-start lg:items-end">
                    <div className={`relative w-full bg-black/10 overflow-hidden ${roundedClass}`}>
                        <div className={`relative ${imageHeightClass} overflow-hidden ${roundedClass}`}>
                            <Image src={imageSrc} alt={imageAlt} fill className={`object-cover ${roundedClass}`} priority/>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-full md:h-auto md:w-1/2 flex items-center md:items-center justify-center md:justify-start">
                    <div className={`text-blush mb-3 sm:mb-4 text-center md:max-w-[16rem] ${captionSizeClass}`}>{caption}</div>
                </div>
            </div>
        );

    else if (layout === "2")
        return (
            <div className={`flex flex-col md:flex-row lg:flex-col items-center md:items-end lg:items-start w-full lg:w-1/2 h-full ${className}`}>
                <div className="w-full h-full flex flex-col items-center justify-center text-center mt-4 md:mt-6 order-1 md:order-2">
                    <h2 className={`${titleSizeClass} leading-none tracking-tight text-blush`}>
                      <span className="flex items-center justify-center mt-1 sm:mt-2">
                        <span className="block">{titleLine1}</span>
                        <Image src={iconSrc} alt="" width={92} height={92} className={`${iconSizeClass} ms-4 sm:ms-6 object-contain`}/>
                      </span>
                        <span className="block">{titleLine2}</span>
                    </h2>
                </div>

                {/* Image bottom on mobile */}
                <div className="w-full order-2 md:order-1">
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
            </div>
        );

    else if (layout === "3")
        return (
            <div className={`w-full h-full md:h-auto flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-24 ${className}`}>
                <div className="relative w-full md:w-[60%]">
                    <div className="relative w-full overflow-hidden">
                        <div className={`relative ${imageHeightClass} overflow-hidden rounded-br-[36px]`}>
                            <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority/>
                        </div>
                    </div>
                </div>
                <div className="relative w-full md:w-[40%] h-full flex items-center justify-center md:justify-start">
                    <div className="max-w-[40rem] text-center">
                        <h2 className={`${titleSizeClass} leading-tight tracking-tight text-blush`}>
                            <span className="block">{titleLine1}</span>
                            <span className="block">{titleLine2}</span>
                        </h2>
                        {caption && <p className={`mt-4 md:mt-6 max-w-sm text-blush ${captionSizeClass}`}>{caption}</p>}
                    </div>
                </div>
            </div>
        );

    else if (layout === "4")
        return (
            <div className={`flex flex-col md:flex-row w-full h-full items-center md:items-end gap-0 md:gap-10 ${className}`}>
                <div className="w-full md:w-[40%] h-full md:h-auto flex items-center justify-center md:justify-start">
                    <div className="max-w-[40rem] text-center">
                        <h2 className={`${titleSizeClass} leading-tight tracking-tight text-blush`}>
                            <span className="block">{titleLine1}</span>
                            <span className="block">{titleLine2}</span>
                        </h2>
                        {caption && <p className={`mt-4 md:mt-6 max-w-sm text-blush ${captionSizeClass}`}>{caption}</p>}
                        {iconSrc && (
                            <div className="mt-6 flex justify-center">
                                <Image src={iconSrc} alt="" width={92} height={92} className={`${iconSizeClass} object-contain`} priority/>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-[60%]">
                    <div className="relative w-full overflow-hidden">
                        <div
                            className={`relative ${imageHeightClass} overflow-hidden rounded-tl-[32px] rounded-tr-[32px]`}>
                            <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority/>
                        </div>
                    </div>
                </div>
            </div>
        );
}