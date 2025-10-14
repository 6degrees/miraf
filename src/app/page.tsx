"use client";

import Banner from "@/components/Banner";
import About from "@/components/About";
import OverviewSection from "@/components/OverviewSection";
import District from "@/components/District";

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
            <District/>
            <OverviewSection/>
            <About/>
        </main>
    );
}
