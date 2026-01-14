"use client";

import Image from "next/image";

/*
|--------------------------------------------------------------------------
| $image-card:props
|--------------------------------------------------------------------------
|
| Props definition for the ImageCard component.
| - Provides configuration for displaying a full-cover image card.
| - Supports optional overlay gradient, title, and subtitle text.
| - Allows responsive height and custom class overrides.
|
*/
type ImageCardProps = {
    src: string;
    alt?: string;
    title?: string;
    subtitle?: string;
    overlay?: boolean;     // optional gradient overlay
    className?: string;
};

/*
|--------------------------------------------------------------------------
| $image-card
|--------------------------------------------------------------------------
|
| Reusable image card component.
|
| Features:
| - Full-width responsive image (Next/Image with object-cover)
| - Optional gradient overlay for better text contrast
| - Optional text block (title + subtitle) positioned at bottom-left
| - Fully responsive with adjustable height via Tailwind props
|
*/
export default function ImageCard(
    {
        src,
        alt = "",
        title,
        subtitle,
        overlay = false,
        className = "",
    }: ImageCardProps) {

    /*
    |--------------------------------------------------------------------------
    | $image-card:layout
    |--------------------------------------------------------------------------
    |
    | Base layout structure:
    | - Relative container with rounded corners and overflow-hidden
    | - Background image fills container with `object-cover`
    | - Optional overlay gradient and text block anchored to bottom
    |
    */
    return (
        <section className={`relative w-full h-full text-white overflow-hidden ${className}`}>
            {/* Background Image */}
            <Image src={src} alt={alt} fill loading="lazy" sizes="100vw" className="object-cover object-center -z-10"/>

            {/* Optional overlay gradient */}
            {overlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent -z-0"/>)}

            {/* Optional text content */}
            {(title || subtitle) && (
                <div className="absolute inset-0 flex flex-col justify-end items-start p-8">
                    {title && (
                        <h2 className="text-3xl sm:text-4xl font-semibold mb-2">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-lg sm:text-xl opacity-90">{subtitle}</p>
                    )}
                </div>
            )}
        </section>
    );
}
