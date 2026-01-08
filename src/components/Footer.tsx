"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

/*
|------------------------------------------------------------------------------
| $footer:props
|------------------------------------------------------------------------------
| Component Props:
| - className   : optional wrapper class (for external layout control)
| - bgClass     : background color class (default: blush tone)
| - textClass   : text color class (default: burgundy tone)
|------------------------------------------------------------------------------
*/
type FooterProps = {
    className?: string;
    bgClass?: string;
    textClass?: string;
};

/*
|------------------------------------------------------------------------------
| $footer:component
|------------------------------------------------------------------------------
| Main Footer component for the Miraf website.
|
| Structure:
| - 3 responsive columns (stacked on mobile, horizontal on md+)
| - Left   : Navigation links (translated)
| - Center : Social icons + contact information
| - Right  : Postal & street addresses
|
| Features:
| - i18n-ready using `t()` for dynamic translation
| - Configurable via Tailwind classes (bgClass, textClass, className)
| - Accessible SVG-based social icons with hover states
|------------------------------------------------------------------------------
*/
export default function Footer(
    {
        bgClass = "bg-blush",
        textClass = "text-burgundy",
        className = "",
    }: FooterProps)
{

    /*
    |--------------------------------------------------------------------------
    | $i18n-translator
    |--------------------------------------------------------------------------
    | Retrieve localized strings from i18next.
    | The `t()` function pulls translated labels from your locale JSON files.
    |--------------------------------------------------------------------------
    */
    const { t } = useTranslation();

    /*
    |--------------------------------------------------------------------------
    | $footer-content
    |--------------------------------------------------------------------------
    | Define all static and localized footer content:
    | - nav           : navigation links (translated)
    | - email/phone   : contact info
    | - socials       : external social media URLs
    | - addressPostal : first address group (postal)
    | - addressStreet : second address group (street)
    |--------------------------------------------------------------------------
    */
    const nav = [
        { label: t("footer.nav.district"), href: "#district" },
        { label: t("footer.nav.overview"), href: "#overview" },
        { label: t("footer.nav.gallery"), href: "#gallery" },
        { label: t("footer.nav.developer"), href: "#developer" },
    ];
    const email = "info@miraf.com.sa";
    const phone = "920031839";

    const phoneNumber = "966920031839"; // Saudi Arabia country code + phone number
    const socials = {
        linkedin: "https://www.linkedin.com/company/refad-for-real-estate-investment-and-development/posts/?feedView=all",
        instagram: "https://www.instagram.com/refad_ksa/",
        x: "https://x.com/Refad_ksa",
        whatsapp: `https://wa.me/${phoneNumber}`,
    };

    const addressPostal = [
        t("footer.addresses.0.0"),
        t("footer.addresses.0.1"),
    ];

    const addressStreet = [
        t("footer.addresses.1.0"),
        t("footer.addresses.1.1"),
    ];

    /*
    |--------------------------------------------------------------------------
    | $component-render
    |--------------------------------------------------------------------------
    | Layout structure:
    | - 3-column responsive design (stacked on mobile)
    | - Left   : navigation links
    | - Center : social icons + email/phone
    | - Right  : postal & street addresses
    |--------------------------------------------------------------------------
    */
    return (
        <footer className={`${bgClass} ${textClass} ${className} font-kanun`}>
            <div className="container-x">
                {/* Divider Line */}
                <div className="border-t border-burgundy/20" />

                {/* Content Section */}
                <div className="py-8 md:py-10">
                    <div className="flex flex-col sm:flex-row justify-between gap-10 md:gap-16">

                        {/*
                        |----------------------------------------------------------
                        | Left: Navigation Links
                        |----------------------------------------------------------
                        | Displays translated nav labels defined above.
                        |----------------------------------------------------------
                        */}
                        <nav className="flex-1">
                            <ul className="space-y-3 text-xl leading-7">
                                {nav.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="relative text-burgundy hover:text-burgundy/70 transition-colors duration-300 group"
                                        >
                                            {item.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy/70 transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/*
                        |----------------------------------------------------------
                        | Center: Social Icons + Contact Info
                        |----------------------------------------------------------
                        | - Displays social media SVG icons with hover effects
                        | - Shows company email and phone below icons
                        |----------------------------------------------------------
                        */}
                        <div className="flex-1 grid grid-cols-2 gap-6 items-start sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-3">
                            {/* Social Icons */}
                            <div className="flex items-center gap-3">
                                {/* LinkedIn */}
                                {socials.linkedin && (
                                    <Link
                                        href={socials.linkedin}
                                        aria-label="Visit Miraf on LinkedIn"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div
                                            className="flex items-center justify-center w-7 h-7 rounded-md bg-[#561721]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                                fill="white"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    d="M100.28 448H7.4V149.5h92.88zm-46.44-338a53.66 53.66 0 1 1 53.66-53.66 53.67 53.67 0 0 1-53.66 53.66zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.6V448h-92.7V149.5h88.9v40.7h1.3c12.4-23.5 42.7-48.3 87.8-48.3 94 0 111.3 61.9 111.3 142.3V448z"
                                                />
                                            </svg>
                                        </div>
                                    </Link>
                                )}

                                {/* Instagram */}
                                {socials.instagram && (
                                    <Link
                                        href={socials.instagram}
                                        aria-label="Follow Miraf on Instagram"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/icons/instagram.png"
                                            alt="Instagram"
                                            width={28}
                                            height={28}
                                            className="h-7 w-7 object-contain"
                                        />
                                    </Link>
                                )}

                                {/* X (Twitter) */}
                                {socials.x && (
                                    <Link
                                        href={socials.x}
                                        aria-label="Follow Miraf on X (Twitter)"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
                                            <path d="M18.9 2H22l-6.9 7.9L23.5 22H16l-5-6.9L4 22H1l7.5-8.6L.8 2H8l4.6 6.2L18.9 2zM16.8 20h2.2L7.3 4H5.1l11.7 16z" />
                                        </svg>
                                    </Link>
                                )}

                                {/* WhatsApp */}
                                {socials.whatsapp && (
                                    <Link
                                        href={socials.whatsapp}
                                        aria-label="Contact Miraf on WhatsApp"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            fill="currentColor"
                                            className="h-7 w-7"
                                        >
                                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.1-25.2-115-69.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 339.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56 81.2 56 130.5 0 101.8-84.1 184.6-186.1 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                        </svg>
                                    </Link>
                                )}
                            </div>

                            {/* Contact Info */}
                            <div className="text-sm leading-6">
                                <div>
                                    <a href={`mailto:${email}`} className="text-burgundy hover:text-burgundy/70 transition-colors duration-300">
                                        {email}
                                    </a>
                                </div>
                                <div>
                                    <a href={`tel:${phone}`} className="text-burgundy hover:text-burgundy/70 transition-colors duration-300">
                                        {phone}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/*
                        |----------------------------------------------------------
                        | Right: Address Columns
                        |----------------------------------------------------------
                        | Displays both postal and street addresses.
                        | Each array is rendered as a vertical block of text lines.
                        |----------------------------------------------------------
                        */}
                        <div className="flex-1 leading-tight sm:leading-6 text-start sm:text-end">
                            {/* Postal Address */}
                            <div className="space-y-0 sm:space-y-1">
                                {addressPostal.map((line, i) => (
                                    <div className="inline sm:block" key={`p-${i}`}>{line}</div>
                                ))}
                            </div>

                            {/* Street Address */}
                            <div className="mt-3 sm:mt-6 space-y-0 sm:space-y-1">
                                {addressStreet.map((line, i) => (
                                    <div className="inline sm:block" key={`s-${i}`}>{line}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}