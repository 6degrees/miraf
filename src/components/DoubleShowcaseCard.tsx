"use client";

import Image from "next/image";
import React from "react";

type DoubleShowcaseCardProps = {
    imageLeftSrc: string;
    imageRightSrc: string;
    imageLeftAlt: string;
    imageRightAlt: string;
    titleLeft: string;
    titleRight: string;
    descriptionLeft?: string;
    descriptionRight?: string;
    iconLeft?: string;
    iconRight?: string;
    className?: string;
    roundedClass?: string;
    bgClass?: string;
    heightClass?: string;            // applied from md+
    mobileImageHeightClass?: string; // applied on mobile to the image only
};

type SectionProps = {
    reverse?: boolean;
    imageSrc: string;
    imageAlt: string;
    title: string;
    description?: string;
    icon?: string;
    bgClass: string;
    roundedClass: string;
    heightClass: string;
    mobileImageHeightClass: string;
};

function Section({
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
            {/* image: fixed height on mobile, synced height from md+ */}
            <div className={`w-full md:w-[60%] ${mobileImageHeightClass} md:${heightClass} relative overflow-hidden`}>
                <Image src={imageSrc} alt={imageAlt} fill priority className="object-cover" />
            </div>

            {/* text: auto height on mobile, synced height from md+ */}
            <div className={`w-full md:w-[40%] ${bgClass} h-auto md:${heightClass} flex items-center justify-center px-6 py-8`}>
                <div className="max-w-[30rem] text-center text-blush">
                    <div className="flex flex-col items-center gap-3">
                        {icon && (
                            <Image
                                src={icon}
                                alt=""
                                width={80}
                                height={80}
                                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                            />
                        )}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">{title}</h2>
                        {description && <p className="text-base sm:text-lg opacity-80 mt-2">{description}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DoubleShowcaseCard({
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
                                               bgClass = "bg-[#4e1d1d]",
                                               heightClass = "h-[300px] lg:h-[340px] xl:h-[380px]",
                                               mobileImageHeightClass = "h-[220px] sm:h-[260px]",
                                           }: DoubleShowcaseCardProps) {
    return (
        <div className={`flex flex-col gap-6 ${className}`}>
            <Section
                imageSrc={imageLeftSrc}
                imageAlt={imageLeftAlt}
                title={titleLeft}
                description={descriptionLeft}
                icon={iconLeft}
                bgClass={bgClass}
                roundedClass={roundedClass}
                heightClass={heightClass}
                mobileImageHeightClass={mobileImageHeightClass}
            />
            <Section
                reverse
                imageSrc={imageRightSrc}
                imageAlt={imageRightAlt}
                title={titleRight}
                description={descriptionRight}
                icon={iconRight}
                bgClass={bgClass}
                roundedClass={roundedClass}
                heightClass={heightClass}
                mobileImageHeightClass={mobileImageHeightClass}
            />
        </div>
    );
}
