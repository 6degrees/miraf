"use client";

import Image from "next/image";

/*
|--------------------------------------------------------------------------
| $overview-section
|--------------------------------------------------------------------------
| Full-bleed overview hero:
| - Covers viewport height (uses `svh` when supported to avoid mobile
|   browser UI offset).
| - Background image is positioned with Next <Image fill>.
| - Subtle top-to-bottom darkening overlay via a linear-gradient.
|
| Note: Keep /images/full_project.png web-optimized (prefer WebP) to avoid
| heavy bundles and GitHub file-size limits.
*/
export default function OverviewSection() {
    return (
        <section className="relative text-white overflow-hidden min-h-[100vh] supports-[height:100svh]:min-h-[100svh]">
            {/* Background image */}
            <Image src="/images/full_project.png" alt="Miraf Overview" fill priority className="object-cover object-center -z-10" sizes="100vw"/>

            {/* Gradient overlay to improve text contrast */}
            <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(180deg,rgba(56,7,9,0)_0%,rgba(56,7,9,0.55)_45%,rgba(56,7,9,0.85)_100%)] pointer-events-none" />

            {/* Stats Container  */}
            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 min-h-inherit">
                {/* Stats Section  */}
                <div className="relative h-[70vh] sm:h-[75vh] md:h-[78vh] lg:h-[80vh]">

                    {/* First Icon */}
                    <div className="absolute left-[6%] top-[10%] sm:left-[19%] sm:top-[20%] text-violet-200 flex flex-col items-center text-center space-y-1">
                        <Image src="/icons/ml_icon-12.png" alt="" width={30} height={30} className="w-6 h-6 md:w-8 md:h-8" />
                        <span className="text-sm sm:text-base md:text-2xl">Miraf Residences</span>
                        <div>
                            <span className="text-3xl sm:text-4xl md:text-4xl font-semibold">152</span>
                            <span className="ml-2 text-xs sm:text-sm md:text-base">units</span>
                        </div>
                    </div>

                    {/* Second Icon */}
                    <div className="absolute left-[58%] -translate-x-1/2 top-[8%] sm:top-[12%] text-amber-300 text-center flex flex-col items-center space-y-2">
                        <Image src="/icons/ml_icon-11.png" alt="" width={30} height={30} className="w-6 h-6 md:w-8 md:h-8" />
                        <span className="text-sm sm:text-base md:text-2xl">Business Tower</span>
                        <span className="text-sm sm:text-base md:text-lg">Offices Area</span>
                        <div>
                            <span className="text-3xl sm:text-4xl md:text-4xl font-semibold">20,202</span>
                            <span className="ml-2 text-xs sm:text-sm md:text-base">sqm</span>
                        </div>
                    </div>

                    {/* Third Icon */}
                    <div className="absolute left-[100%] -translate-x-1/2 top-[8%] sm:top-[20%] text-burgundy text-center flex flex-col items-center space-y-2">
                        <Image src="/icons/ml_icon-13.png" alt="" width={30} height={30} className="w-6 h-6 md:w-8 md:h-8" />
                        <span className="text-sm sm:text-base md:text-2xl whitespace-nowrap">Hotel INDIGO</span>
                        <div>
                            <span className="text-3xl sm:text-4xl md:text-4xl font-semibold">240</span>
                            <span className="ml-2 text-xs sm:text-sm md:text-base">keys</span>
                        </div>
                    </div>

                    {/* Fourth Icon */}
                    <div className="absolute left-[51%] -translate-x-1/2 top-[8%] sm:top-[46%] text-[#de6b26] text-center flex flex-col items-center space-y-2">
                        <Image src="/icons/ml_Icon-10.png" alt="" width={30} height={30} className="w-6 h-6 md:w-8 md:h-8" />
                        <span className="text-sm sm:text-base md:text-2xl whitespace-nowrap">The Plaza as Miraf</span>
                        <span className="text-sm sm:text-base md:text-lg">Retall * clinic NLA</span>
                        <div>
                            <span className="text-3xl sm:text-4xl md:text-4xl font-semibold">28,992</span>
                            <span className="ml-2 text-xs sm:text-sm md:text-base">sqm</span>
                        </div>
                    </div>
                </div>

                {/* Action Button  */}
                <div className="pt-10">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 pb-6 sm:pb-10 md:pb-14 lg:pb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-white/95">Overview</h2>

                        <a href="#" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 text-white px-5 py-2.5 md:px-10 md:py-3 text-sm md:text-lg font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.25)] backdrop-blur hover:bg-white/25 hover:border-white/50 transition">
                            Download Brochure
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
