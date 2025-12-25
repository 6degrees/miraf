"use client";

import { useTranslation } from "react-i18next";

/*
||--------------------------------------------------------------------------
|| $structured-data
||--------------------------------------------------------------------------
||
|| JSON-LD structured data for SEO optimization.
|| Provides search engines with detailed information about the real estate project.
||
*/
export default function StructuredData() {
    const { t } = useTranslation();

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateProject",
        "name": "Miraf District",
        "description": t("about.0.cards.0.body"),
        "image": [
            "https://miraf-district.com/images/miraf_renders_10edited.png",
            "https://miraf-district.com/images/full_project.png",
            "https://miraf-district.com/images/02_Cam1_Road_Front_Building_06.jpg"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Al Khobar",
            "addressRegion": "Eastern Province",
            "addressCountry": "SA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "26.2959",
            "longitude": "50.215"
        },
        "developer": {
            "@type": "Organization",
            "name": "Refad Development",
            "url": "https://refad.com",
            "description": t("developer.bodyTop")
        },
        "amenities": [
            "Residential Towers",
            "Business Offices", 
            "Retail Spaces",
            "Hotel INDIGO",
            "Shopping Plaza",
            "Swimming Pool",
            "Fitness Center",
            "Green Spaces"
        ],
        "numberOfUnits": 152,
        "totalArea": "49,194 sqm",
        "completionDate": "2025",
        "priceRange": {
            "@type": "PriceSpecification",
            "priceCurrency": "SAR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966-13-XXX-XXXX",
            "contactType": "sales",
            "areaServed": "SA",
            "availableLanguage": ["English", "Arabic"]
        },
        "sameAs": [
            "https://www.instagram.com/refad_ksa/",
            "https://www.linkedin.com/company/refad-for-real-estate-investment-and-development/posts/?feedView=all"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
