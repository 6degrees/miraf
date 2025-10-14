"use client";

import Image from "next/image";


/*
|--------------------------------------------------------------------------
| $props
|--------------------------------------------------------------------------
|
| titleLine1       : first headline line
| titleLine2       : second headline line
| body             : supporting paragraph
| iconSrc          : path to the inline icon
| iconAlt          : icon alt text (fallbacks to title lines)
| paddingStartClass: logical start padding utility (e.g., "ps-64")
| titleSizeClass   : responsive headline sizes (e.g., "text-4xl ...")
| gapClass         : gap between line1 and icon (e.g., "gap-4 sm:gap-6")
| iconSizeClass    : responsive icon sizes (e.g., "h-12 ...")
| className        : extra wrapper classes
|
*/
type Props = {

    titleLine1: string;
    titleLine2: string;
    body: string;
    iconSrc: string;
    iconAlt?: string;
    paddingStartClass?: string;
    titleSizeClass?: string;
    gapClass?: string;
    iconSizeClass?: string;
    className?: string;
};

/*
|--------------------------------------------------------------------------
| $about-title-block
|--------------------------------------------------------------------------
|
| Two-line headline with an inline icon between lines + supporting body text.
| Exposes sizing and spacing via utility props to keep markup stable.
|
*/
export default function AboutTitle(
    {
        titleLine1,
        titleLine2,
        body,
        iconSrc,
        iconAlt = "",
        paddingStartClass = "",
        titleSizeClass = "text-4xl sm:text-5xl lg:text-7xl xl:text-9xl",
        gapClass = "gap-4 sm:gap-6",
        iconSizeClass = "h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24",
        className = "",
    }: Props) {
    /*
    |--------------------------------------------------------------------------
    | $render
    |--------------------------------------------------------------------------
    |
    | Inline icon sits after the first line; second line breaks below.
    | Logical padding-start keeps it LTR/RTL friendly.
    | Body width is constrained for comfortable reading in both directions.
    |
    */
    return (
        <div className={`flex flex-col w-full h-full justify-center items-center lg:items-start ${paddingStartClass} ${className}`}>
            <h2 className={`leading-[0.95] tracking-tight text-burgundy ${titleSizeClass}`}>
                <span className={`flex items-center ${gapClass}`}>
                    <span>{titleLine1}</span>
                    <Image
                        src={iconSrc}
                        alt={iconAlt || titleLine2 || titleLine1}
                        width={92}
                        height={92}
                        className={`${iconSizeClass} object-contain`}
                    />
                </span>
                <span className="block mt-1 sm:mt-2">{titleLine2}</span>
            </h2>

            <p className="mt-12 ltr:max-w-[38ch] rtl:max-w-[30ch] text-burgundy/80 text-base sm:text-lg md:text-2xl leading-relaxed">{body}</p>
        </div>
    );
}






