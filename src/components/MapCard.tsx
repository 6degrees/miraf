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
        <div className="relative inset-0">
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
            <h2 className="text-6xl lg:text-7xl xl:text-8xl rtl:text-5xl rtl:lg:text-6xl rtl:xl:text-7xl font-medium leading-[0.65] text-center">
                {titles.line1 ? <span className="block -mb-2">{titles.line1}</span> : null}
                <span className="flex items-center justify-center gap-4 sm:gap-8 rtl:mr-10 rtl:md:mr-36 ltl:m;-10 ltr:md:ml-36 -mt-2">
                    <Image
                        src={iconSrc}
                        alt={iconAlt}
                        width={96}
                        height={96}
                        className="inline-block h-14 w-14 sm:h-28 sm:w-28 object-contain"
                    />
                    {titles.line2 ? <span className="block">{titles.line2}</span> : null}
                </span>
                {titles.line3 ? <span className="block -mt-2">{titles.line3}</span> : null}
            </h2>
            {body ? (
                <p className="mt-3 ltr:max-w-[45ch] rtl:max-w-[38ch] font-bold text-burgundy/80 text-base sm:text-lg leading-relaxed">
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
        <div className={`w-full h-full flex flex-col justify-center ${className} ms-0 xl:ms-10`}>
            {mediaOnTop ? (
                <>
                    {MediaBlock}
                    <div className="">{TextBlock}</div>
                </>
            ) : (
                <>
                    <div className="">{TextBlock}</div>
                    {MediaBlock}
                </>
            )}
        </div>
    );
}