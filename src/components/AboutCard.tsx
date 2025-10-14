"use client";

import Image from "next/image";
import clsx from "clsx";

/*
|--------------------------------------------------------------------------
| $about-showcase-card:props
|--------------------------------------------------------------------------
| A single flexible component to cover all card designs:
| - Supports one or two images
| - Supports zero/one/two icons
| - Title split into lines with optional subtitle
| - Left/Right image layout or stacked on small screens
|
| Variants
|   layout: "image-left" | "image-right"
|   shape : "rounded" | "asym" | "outline"
*/
type AccentBlob = {
    className?: string; // e.g. "absolute right-10 top-14 w-12 h-7 rounded-full bg-[#EAD5F9]"
};

type Pic = {
    src: string;
    alt?: string;
    priority?: boolean;
    className?: string; // extra sizing/position when used as secondary
};

type Icon = {
    src: string;
    alt?: string;
    className?: string;
};

type AboutShowcaseCardProps = {
    images: [Pic] | [Pic, Pic];
    icons?: [Icon] | [Icon, Icon];
    titleLines: string[];
    subtitle?: string;
    kicker?: string;

    layout?: "image-left" | "image-right";
    shape?: "rounded" | "asym" | "outline";
    heightClass?: string; // image block height per breakpoint
    className?: string;   // wrapper

    // Optional decorative blobs
    blobs?: AccentBlob[];

    // Color system
    titleClass?: string;   // e.g. "text-[#F6E6DA]"
    bodyClass?: string;    // e.g. "text-[#F6E6DA]/80"
};

const shapeClass = (shape: NonNullable<AboutShowcaseCardProps["shape"]>) => {
    switch (shape) {
        case "asym":
            return "rounded-tl-[28px] rounded-tr-[10px] rounded-br-[28px] rounded-bl-[10px] overflow-hidden";
        case "outline":
            return "rounded-[20px] ring-1 ring-white/30 overflow-hidden";
        case "rounded":
        default:
            return "rounded-[22px] overflow-hidden";
    }
};

export default function AboutShowcaseCard(
    {
        images,
        icons,
        titleLines,
        subtitle,
        kicker,
        layout = "image-left",
        shape = "rounded",
        heightClass = "h-[260px] md:h-[320px] lg:h-[380px]",
        className = "",
        blobs = [],
        titleClass = "text-[#F6E6DA]",
        bodyClass = "text-[#F6E6DA]/85",
    }: AboutShowcaseCardProps) {
    const [primary, secondary] = images as [Pic, Pic?];
    const [iconA, iconB] = (icons || []) as [Icon?, Icon?];
    const imageBlock = (
        <div className={clsx("relative w-full", heightClass, shapeClass(shape))}>
            <Image
                src={primary.src}
                alt={primary.alt || ""}
                fill
                className="object-cover"
                priority={primary.priority}
            />
            {secondary && (
                <div className={clsx(
                    "hidden md:block absolute",
                    // default position; can be overridden via className
                    "bottom-6 right-6 w-[38%] aspect-[4/3]",
                    shapeClass(shape),
                    secondary.className
                )}>
                    <Image
                        src={secondary.src}
                        alt={secondary.alt || ""}
                        fill
                        className="object-cover"
                        priority={secondary.priority}
                    />
                </div>
            )}
        </div>
    );

    const textBlock = (
        <div className="relative">
            {kicker && (
                <p className={clsx("text-sm sm:text-base mb-3", bodyClass)}>{kicker}</p>
            )}

            <h2 className={clsx(
                "font-semibold leading-tight tracking-tight",
                "text-[40px] sm:text-[52px] lg:text-[64px] xl:text-[72px]",
                titleClass
            )}>
                {titleLines.map((ln, idx) => (
                    <span key={idx} className="block">
            {ln}
                        {idx === 0 && iconA && (
                            <Image
                                src={iconA.src}
                                alt={iconA.alt || "icon"}
                                width={32}
                                height={32}
                                className={clsx("inline-block align-middle ml-3 h-7 w-7 object-contain", iconA.className)}
                            />
                        )}
                        {idx === 1 && iconB && (
                            <Image
                                src={iconB.src}
                                alt={iconB.alt || "icon"}
                                width={36}
                                height={36}
                                className={clsx("inline-block align-middle ml-3 h-7 w-9 object-contain", iconB.className)}
                            />
                        )}
          </span>
                ))}
            </h2>

            {subtitle && (
                <p className={clsx("mt-4 max-w-[48ch] text-base sm:text-lg leading-relaxed", bodyClass)}>
                    {subtitle}
                </p>
            )}

            {blobs.map((b, i) => (
                <span key={i} aria-hidden className={clsx("hidden lg:block", b.className)}/>
            ))}
        </div>
    );

    const grid = (
        <div className={clsx(
            "grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center",
            className
        )}>
            {layout === "image-left" ? (
                <>
                    {imageBlock}
                    {textBlock}
                </>
            ) : (
                <>
                    {textBlock}
                    {imageBlock}
                </>
            )}
        </div>
    );

    return (
        <section className="relative w-full py-10 sm:py-12">
            <div className="container-x">{grid}</div>
        </section>
    );
}