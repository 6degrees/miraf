"use client";

import Image from "next/image";

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

export default function DistrictCard({
                                         imageSrc,
                                         imageAlt,
                                         iconSrc,
                                         title,
                                         body,
                                         imageOnTop = true,
                                         priorityImage = false,
                                         className = "",
                                         bodyWidth = 'ltr:max-w-[45ch] rtl:max-w-[36ch]',
                                     }: AboutCardProps) {

    /*
    |-----------------------------------------------------------------------
    | Image Block
    |-----------------------------------------------------------------------
    | Uses aspect-ratio to maintain image proportions.
    | No fixed height in `svh`. Image shrinks naturally on small screens.
    */
    const ImageBlock = (
        <div className="relative w-full rounded-[22px] overflow-hidden aspect-[16/10]">
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
    |-----------------------------------------------------------------------
    | Text Block
    |-----------------------------------------------------------------------
    | Icon + title + body
    | Body width constrained for readability.
    */
    const TextBlock = (
        <div className="text-burgundy">
            <div className="flex items-center gap-2">
                <Image
                    src={iconSrc}
                    alt="icon"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                />
            </div>
            <h3 className="mt-2 text-5xl sm:text-6xl font-semibold">
                {title}
            </h3>
            <p className={`mt-3 xl:mt-6 text-burgundy/80 text-base sm:text-md leading-relaxed ${bodyWidth}`}>
                {body}
            </p>
        </div>
    );

    /*
    |-----------------------------------------------------------------------
    | Render
    |-----------------------------------------------------------------------
    | Flexible layout:
    | - Image and text flow naturally
    | - No fixed heights
    | - Works on very short screens
    */
    return (
        <div className={`flex flex-col w-full justify-center ${className}`}>
            <div className="w-full md:w-[80%] sm:w-full max-w-[90svh] md:max-w-full lg:max-w-[80svh] mx-auto">
                {imageOnTop ? (
                    <>
                        {ImageBlock}
                        <div className="mt-6 sm:mt-10">{TextBlock}</div>
                    </>
                ) : (
                    <>
                        <div className="mb-6 sm:mb-10">{TextBlock}</div>
                        {ImageBlock}
                    </>
                )}
            </div>
        </div>
    );
}
