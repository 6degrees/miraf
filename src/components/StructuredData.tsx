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
        "@type": ["RealEstateProject", "LocalBusiness"],
        "name": "Miraf District",
        "description": t("about.0.cards.0.body"),
        "url": "https://miraf.refad.com.sa",
        "image": [
            "https://miraf.refad.com.sa/images/miraf_renders_10edited.png",
            "https://miraf.refad.com.sa/images/full_project.png",
            "https://miraf.refad.com.sa/images/02_Cam1_Road_Front_Building_06.jpg"
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "King Faisal Bin Abd Al Aziz, Al Yarmouk",
            "addressLocality": "Al Khobar",
            "addressRegion": "Eastern Province",
            "postalCode": "34422",
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
            "url": "https://refad.com.sa",
            "description": t("developer.bodyTop"),
            "logo": "https://miraf.refad.com.sa/icons/Refad%20Logo.png"
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
            "telephone": "+966920031839",
            "email": "info@miraf.com.sa",
            "contactType": "sales",
            "areaServed": "SA",
            "availableLanguage": ["English", "Arabic"]
        },
        "sameAs": [
            "https://www.instagram.com/refad_ksa/",
            "https://www.linkedin.com/company/refad-for-real-estate-investment-and-development/posts/?feedView=all",
            "https://x.com/Refad_ksa"
        ],
        "openingHours": "Mo-Su 00:00-23:59"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
