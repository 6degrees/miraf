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
        <div className="mt-8 sm:mt-10 ps-0 md:ps-14 text-burgundy">
            <h2 className="font-semibold tracking-tight text-5xl sm:text-7xl leading-tight">
                {titles.line1 ? <span className="block mt-1 sm:mt-2">{titles.line1}</span> : null}
                <span className="mt-2 flex items-center gap-4 sm:gap-8">
                    <Image
                        src={iconSrc}
                        alt={iconAlt}
                        width={96}
                        height={96}
                        className="inline-block h-14 w-14 sm:h-24 sm:w-24 object-contain"
                    />
                    {titles.line2 ? <span className="block">{titles.line2}</span> : null}
                </span>
                {titles.line3 ? <span className="block mt-1 sm:mt-2">{titles.line3}</span> : null}
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
        <div className={`w-full flex flex-col h-full justify-center ${className}`}>
            <div className="w-full max-w-[520px] sm:max-w-[900px]">
                {mediaOnTop ? (
                    <>
                        {MediaBlock}
                        <div className="mt-8 sm:mt-10 ps-6 sm:ps-10 md:ps-14">{TextBlock}</div>
                    </>
                ) : (
                    <>
                        <div className="mb-8 sm:mb-10 ps-6 sm:ps-10 md:ps-14">{TextBlock}</div>
                        {MediaBlock}
                    </>
                )}
            </div>
        </div>
    );
}