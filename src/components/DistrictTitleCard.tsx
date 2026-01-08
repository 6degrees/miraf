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
    titleLine3: string;
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
export default function DistrictTitleCard(
    {
        titleLine1,
        titleLine2,
        titleLine3,
        body,
        iconSrc,
        iconAlt = "",
        paddingStartClass = "",
        titleSizeClass = "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
        gapClass = "gap-4 sm:gap-6",
        iconSizeClass = "h-12 w-12 md:h-16 md:w-16",
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
        <div className={`flex flex-col w-full h-full justify-center min-h-[inherit] px-4 sm:px-6 md:px-0 py-4 sm:py-0 ${paddingStartClass} ${className}`}>
            <h2 className={`leading-[0.75] sm:leading-[0.7] md:leading-[0.65] tracking-tight text-burgundy ${titleSizeClass}`}>
                <span className={`${gapClass}`}>
                    <span className="inline">{titleLine1}&nbsp;</span>
                    <span className="inline font-bold">{titleLine2}&nbsp;</span>
                    <Image
                        src={iconSrc}
                        alt={iconAlt || titleLine2 || titleLine1}
                        width={92}
                        height={92}
                        className={`${iconSizeClass} inline align-middle object-contain shrink-0`}
                    />
                </span>
                <span className="block font-bold -mt-2">{titleLine3}</span>
            </h2>

            <p className="mt-6 sm:mt-8 md:mt-10 max-w-[50ch] lg:ltr:max-w-[38ch] md:rtl:max-w-[30ch] text-burgundy/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                {body}
            </p>
        </div>
    );
}






