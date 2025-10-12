"use client";

import Banner from "@/components/Banner";
import AboutDistrict from "@/components/AboutDistrict";

/*
|--------------------------------------------------------------------------
| Home Page
|--------------------------------------------------------------------------
|
| Lightweight page that renders the hero Banner component.
| Keep this file minimal; put layout/SEO in app/layout.tsx and
| encapsulate hero logic inside <Banner />.
|
*/
export default function HomePage() {
    return (
        <main>
            {/* Primary hero section */}
            <Banner/>
            <AboutDistrict/>
        </main>
    );
}
