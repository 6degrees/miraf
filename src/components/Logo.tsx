"use client";
import Image from "next/image";
import {useState} from "react";

// Default image path (served from /public).
const DEFAULT_SRC_LOGO = "/images/miraf_renders_10edited.png";

/*
|--------------------------------------------------------------------------
| $logo (zero-prop)
|--------------------------------------------------------------------------
| Minimal logo component rendering a fixed image via Next.js <Image>.
| - Keeps `src` in state to enable future runtime fallbacks (onError → setSrc).
| - Uses `fill` + `object-cover`, so the parent wrapper must be `relative`
|   with explicit height/width.
*/
export default function Logo() {
    // Initial source; can be swapped on runtime failure or variant changes.
    const [src, setSrc] = useState(DEFAULT_SRC_LOGO);

    /*
    |--------------------------------------------------------------------------
    | $logo-image
    |--------------------------------------------------------------------------
    | Renders the logo/hero image using Next.js <Image>.
    | - `fill` + `object-cover`: parent wrapper must be `relative` with a set size.
    | - `priority`: preloads for faster Largest Contentful Paint (LCP).
    | - `sizes="100vw"`: treat image as full viewport width for responsive loading.
    */
    return (
        <Image src={src} alt="Miraf District" fill priority sizes="100vw" className="object-cover"/>
    );
}





