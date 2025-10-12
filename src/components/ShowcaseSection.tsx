"use client";

import Image from "next/image";
import clsx from "clsx";

type Variant = | "about" | "imageLeft" | "imageRight" | "darkImageLeft" | "darkImageRight" | "mapHeadline";

type ShowcaseSectionProps = {
    variant: Variant;
    // Content
    heading?: string;
    headingLine2?: string;
    subheading?: string;
    body?: string;

    // Media
    imageSrc?: string;
    imageAlt?: string;
    iconSrc?: string;
    mapSrc?: string;

    // Appearance
    /**
     * Background color override (CSS color string).
     * Example: "#F3E6D6", "rgb(20 20 20)", "hsl(350 60% 20%)"
     */
    bgColor?: string;
    /** Text color override (CSS color string). */
    textColor?: string;
    /** Image corner radius */
    radius?: "xl" | "2xl" | "3xl";

    className?: string;
};

export default function ShowcaseSection(
    {
        variant,
        heading,
        headingLine2,
        subheading,
        body,
        imageSrc,
        imageAlt = "",
        iconSrc,
        mapSrc,
        bgColor,
        textColor,
        radius = "3xl",
        className,
    }: ShowcaseSectionProps
) {
    // Default tones per variant (can be overridden via bgColor/textColor)
    const defaultIsDark = ["darkImageLeft", "darkImageRight", "mapHeadline"].includes(variant);

    const baseBg = defaultIsDark ? "bg-burgundy" : "bg-[#F3E6D6]";
    const baseText = defaultIsDark ? "text-white" : "text-burgundy";

    const sectionClass = clsx("relative w-full", baseBg, baseText, className);
    const inlineStyle =
        bgColor || textColor
            ? {
                ...(bgColor ? { backgroundColor: bgColor } : {}),
                ...(textColor ? { color: textColor } : {}),
            }
            : undefined;

    const title = (
        <div>
            <h2
                className={clsx(
                    "font-semibold leading-tight tracking-tight",
                    defaultIsDark
                        ? "text-[32px] sm:text-[44px] md:text-[54px] lg:text-[64px]"
                        : "text-[36px] sm:text-[48px] md:text-[64px] lg:text-[72px]"
                )}
            >
        <span className="flex items-center gap-4 sm:gap-6">
          {heading && <span className="block">{heading}</span>}
            {iconSrc && (
                <Image
                    src={iconSrc}
                    alt=""
                    width={96}
                    height={96}
                    className="h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 object-contain"
                />
            )}
        </span>
                {headingLine2 && <span className="block mt-1 sm:mt-2">{headingLine2}</span>}
            </h2>

            {subheading && (
                <p
                    className={clsx(
                        "mt-4 max-w-md leading-relaxed",
                        defaultIsDark ? "text-white/90" : "text-burgundy/90",
                        "text-base sm:text-lg md:text-xl"
                    )}
                >
                    {subheading}
                </p>
            )}
        </div>
    );

    const imageCard = imageSrc && (
        <div className="w-full">
            <div
                className={clsx(
                    "relative aspect-[16/10] overflow-hidden shadow-xl",
                    radius === "2xl" ? "rounded-2xl" : radius === "xl" ? "rounded-xl" : "rounded-3xl"
                )}
            >
                <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
            </div>

            {(body || (!headingLine2 && heading) || iconSrc) && (
                <div className="mt-6">
                    {iconSrc && (
                        <Image src={iconSrc} alt="" width={28} height={28} className="h-6 w-6 md:h-7 md:w-7 object-contain" />
                    )}

                    {/* Optional inline title for single-line headings */}
                    {heading && !headingLine2 && (
                        <h3 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">{heading}</h3>
                    )}

                    {body && (
                        <p
                            className={clsx(
                                "mt-3 md:mt-4 max-w-md text-sm sm:text-base md:text-lg leading-relaxed",
                                defaultIsDark ? "text-white/90" : "text-burgundy/90"
                            )}
                        >
                            {body}
                        </p>
                    )}
                </div>
            )}
        </div>
    );

    const mapBlock = (
        <div
            className={clsx(
                "relative aspect-[16/9] overflow-hidden",
                radius === "2xl" ? "rounded-2xl" : radius === "xl" ? "rounded-xl" : "rounded-3xl"
            )}
        >
            <Image src={mapSrc || "/images/map.png"} alt="Map" fill className="object-cover" />
        </div>
    );

    // Layouts by variant
    const Grid = ({ left, right, itemsStart = false }: { left: React.ReactNode; right: React.ReactNode; itemsStart?: boolean }) => (
        <div className="container">
            <div
                className={clsx(
                    "grid lg:grid-cols-2 gap-12 xl:gap-20",
                    itemsStart ? "items-start" : "items-center",
                    "py-14 md:py-20 lg:py-24"
                )}
            >
                {left}
                {right}
            </div>
        </div>
    );

    return (
        <section className={sectionClass} style={inlineStyle}>
            {variant === "about" && <Grid left={<div className="order-2 lg:order-1">{title}</div>} right={<div className="order-1 lg:order-2">{imageCard}</div>} itemsStart />}
            {variant === "imageLeft" && <Grid left={<div>{imageCard}</div>} right={<div>{title}</div>} />}
            {variant === "imageRight" && <Grid left={<div className="order-2 lg:order-1">{title}</div>} right={<div className="order-1 lg:order-2">{imageCard}</div>} />}
            {variant === "darkImageLeft" && <Grid left={<div>{imageCard}</div>} right={<div>{title}</div>} />}
            {variant === "darkImageRight" && <Grid left={<div className="order-2 lg:order-1">{title}</div>} right={<div className="order-1 lg:order-2">{imageCard}</div>} />}
            {variant === "mapHeadline" && <Grid left={<div className="order-2 lg:order-1">{title}</div>} right={<div className="order-1 lg:order-2">{mapBlock}</div>} />}
        </section>
    );
}