"use client";

import Image from "next/image";
import React, { JSX } from "react";

type ShowcaseLayout = "0" | "1" | "2";

export type ShowcaseCardProps = {
    layout?: ShowcaseLayout;
    imageSrc: string;
    imageAlt: string;
    caption?: string;
    titleLine1?: string;
    titleLine2?: string;
    titleLine3?: string;
    iconSrc1?: string;
    iconSrc2?: string;
    iconSizeClass1?: string;
    iconSizeClass2?: string;
    titleSizeClass?: string;
    captionSizeClass?: string;
    className?: string;
    imageHeightClass?: string;
    roundedClass?: string;
    dir?: "ltr" | "rtl";
};

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
         imageHeightClass = "h-[60svh] xl:h-[70svh]",
         roundedClass = "rounded-2xl",
    }: ShowcaseCardProps) {
    const textColorClass = "text-blush";
    const iconWrap = "inline-flex items-center gap-2";
    const iconRow = "flex items-center flex-wrap mt-3 sm:mt-4 gap-2";

    const Icon = (src?: string, cls?: string) =>
        src ? (
            <Image src={src} alt="" width={92} height={92} className={`${cls} object-contain`} priority />
        ) : null;

    const Caption = (
        <div className={`${textColorClass} mb-3 sm:mb-4 ${captionSizeClass}`}>{caption}</div>
    );

    const ImageBlock = (
        <div className={`relative w-full overflow-hidden ${roundedClass}`}>
            <div className={`relative overflow-hidden ${imageHeightClass} ${roundedClass}`}>
                <Image src={imageSrc} alt={imageAlt} fill className={`object-cover ${roundedClass}`} priority />
            </div>
        </div>
    );

    const Title = (
        <h2 className={`${titleSizeClass} leading-tight tracking-tight ${textColorClass}`}>
            <span className="block">{titleLine1}</span>
            <div className="ms-12">
        <span className={iconRow}>
          <span className={iconWrap}>
            {Icon(iconSrc1, iconSizeClass1)}
              <span className="block">{titleLine2}</span>
          </span>
        </span>
                <span className={iconRow}>
          <span className={iconWrap}>
            <span className="block">{titleLine3}</span>
              {Icon(iconSrc2, iconSizeClass2)}
          </span>
        </span>
            </div>
        </h2>
    );

    const layouts: Record<ShowcaseLayout, JSX.Element> = {
        "0": (
            <div className={`w-full h-full flex flex-col md:flex-row items-center justify-between gap-8 ${className}`}>
                <div className="flex flex-col w-[50%] items-start">
                    {Caption}
                    {ImageBlock}
                </div>
                <div className="flex flex-col md:w-[50%] items-start justify-center">
                    {Title}
                </div>
            </div>
        ),

        "1": (
            <div className="flex flex-col h-full justify-end">
                <div className={`flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12 mt-auto ${className}`}>
                    <div className="w-[50%] flex flex-col items-center">{ImageBlock}</div>
                    <div className="w-[50%] flex flex-col items-start justify-center">
                        <h3 className={`${captionSizeClass} leading-tight tracking-tight ${textColorClass}`}>
                            <span className="block">{titleLine1}</span>
                            <span className="block">{titleLine2}</span>
                        </h3>
                    </div>
                </div>
            </div>
        ),

        "2": (
            <div className={`flex flex-col ${className}`}>
                <div className="w-[50%]">{ImageBlock}</div>
                <div className="w-[50%] flex justify-center">
                    <h2 className={`${titleSizeClass} leading-tight tracking-tight ${textColorClass}`}>
                        <span className="block">{titleLine1}</span>
                        <span className={iconRow}>
                            <span className={iconWrap}>
                                <span className="block">{titleLine2}</span>
                                  {Icon(iconSrc1, iconSizeClass1)}
                                  {Icon(iconSrc2, iconSizeClass2)}
                                  <span className="block">{titleLine3}</span>
                            </span>
                        </span>
                    </h2>
                </div>
            </div>
        )
    };

    return layouts[layout];
}
