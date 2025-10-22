"use client";

import Image from "next/image";

/*
||--------------------------------------------------------------------------
|| $miraf-map
||--------------------------------------------------------------------------
||
|| Static map image component using the provided map.png
|| - Replaces the interactive Leaflet map with a static image
|| - Maintains the same styling and dimensions
||
*/
export default function MapMiraf() {
    return (
        <div className="relative h-[45svh] md:h-[45svh] lg:h-[45svh] xl:h-[45svh] rounded-3xl overflow-hidden">
            <Image
                src="/images/map.png"
                alt="Miraf District Map"
                fill
                className="object-cover"
                priority
            />
        </div>
    );
}