import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://mirafdistrict.refad.com.sa/",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
            alternates: {
                languages: {
                    en: "https://mirafdistrict.refad.com.sa/?lang=en",
                    ar: "https://mirafdistrict.refad.com.sa/?lang=ar",
                },
            },
        },
    ];
}
