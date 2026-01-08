"use client";

import Image from "next/image";
import React from "react";


type MapCardProps = {
    media: React.ReactNode;
    iconSrc: string;
    titles: { line1?: string; line2?: string; line3?: string };
    body?: string;
    mediaOnTop?: boolean;
    className?: string;
    iconAlt?: string;
};

/*
|--------------------------------------------------------------------------
| $map-card
|--------------------------------------------------------------------------
|
| Reusable card that mirrors DistrictCard but accepts arbitrary media (e.g., a map).
| Layout:
|   - Media block (fixed heights across breakpoints)
|   - Text block (icon + multi-line title + optional body)
| Toggle media position via `mediaOnTop`.
|
*/
export default function MapCard(
    {
        media,
        iconSrc,
        titles,
        body,
        mediaOnTop = true,
        className = "",
        iconAlt = "icon",
    }: MapCardProps) {
    /*
    |--------------------------------------------------------------------------
    | $media-block
    |--------------------------------------------------------------------------
    |
    | Fixed-height, rounded container. The inner absolute wrapper ensures the
    | media fills the area (maps usually need explicit width/height).
    |
    */
    const MediaBlock = (
        <div className="relative w-full rounded-[22px] overflow-hidden aspect-[16/10]">
            {media}
        </div>
    );

    /*
    |--------------------------------------------------------------------------
    | $text-block
    |--------------------------------------------------------------------------
    */
    const TextBlock = (
        <div className="text-burgundy">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl rtl:text-3xl rtl:sm:text-4xl rtl:md:text-5xl rtl:lg:text-6xl rtl:xl:text-7xl font-medium leading-[0.75] sm:leading-[0.7] md:leading-[0.65] text-center">
                {titles.line1 ? <span className="block -mb-1">{titles.line1}</span> : null}
                <span className="flex items-center justify-center gap-4 sm:gap-8 rtl:mr-10 rtl:md:mr-36 ltr:ml-10 ltr:md:ml-36 -mt-1">
                    <Image
                        src={iconSrc}
                        alt={iconAlt}
                        width={96}
                        height={96}
                        className="inline-block h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-28 xl:w-28 object-contain"
                    />
                    {titles.line2 ? <span className="block">{titles.line2}</span> : null}
                </span>
                {titles.line3 ? <span className="block -mt-1">{titles.line3}</span> : null}
            </h2>
            {body ? (
                <p className="mt-3 xl:mt-6 ltr:max-w-[45ch] rtl:max-w-[38ch] font-bold text-burgundy/80 text-base sm:text-lg leading-relaxed arabic-body">
                    {body}
                </p>
            ) : null}
        </div>
    );

    /*
    |--------------------------------------------------------------------------
    | $render
    |--------------------------------------------------------------------------
    */
    return (
        <div className={`flex flex-col w-full justify-start sm:justify-center ${className}`}>
            <div className="w-full md:w-[80%] sm:w-full max-w-full md:max-w-full lg:max-w-[80svh] mx-auto px-4 sm:px-6 md:px-0 py-4 sm:py-0">
                {mediaOnTop ? (
                    <>
                        {MediaBlock}
                        <div className="mt-3 sm:mt-4 md:mt-6">{TextBlock}</div>
                    </>
                ) : (
                    <>
                        <div className="mb-3 sm:mb-4 md:mb-6">{TextBlock}</div>
                        {MediaBlock}
                    </>
                )}
            </div>
        </div>
    );
}